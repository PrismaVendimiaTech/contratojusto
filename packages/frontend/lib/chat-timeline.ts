import type { Message } from 'ai';
import type { SystemEvent } from './system-events';

export type ChatTimelineItem =
  | {
      id: string;
      kind: 'bubble';
      role: 'ai' | 'user';
      content: string;
    }
  | {
      id: string;
      kind: 'balance-card';
      content: string;
      balance: {
        savings: number;
        severance: number;
        total: number;
        depositCount: number;
      };
    }
  | {
      id: string;
      kind: 'claim-action';
      content: string;
      xdr: string;
      amount: number;
    }
  | {
      id: string;
      kind: 'system-event';
      event: SystemEvent;
    };

interface ToolInvocationLike {
  toolCallId?: string;
  toolName?: string;
  state?: string;
  result?: Record<string, unknown>;
}

function getMessageText(message: Message): string {
  if (typeof message.content === 'string') return message.content;
  if (Array.isArray(message.content)) {
    const parts = message.content as Array<string | { text?: unknown }>;
    return parts
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object' && 'text' in part) {
          return String(part.text ?? '');
        }
        return '';
      })
      .join('\n')
      .trim();
  }

  return '';
}

function mapToolResults(message: Message): ChatTimelineItem[] {
  const toolInvocations = (
    message as Message & { toolInvocations?: ToolInvocationLike[] }
  ).toolInvocations as ToolInvocationLike[] | undefined;

  if (!Array.isArray(toolInvocations)) return [];

  return toolInvocations.flatMap<ChatTimelineItem>((invocation, index) => {
    if (!invocation.toolName || !invocation.result) return [];
    if (invocation.state && invocation.state !== 'result') return [];

    switch (invocation.toolName) {
      case 'consultarBalance': {
        const savings = Number(invocation.result.ahorro ?? 0);
        const severance = Number(invocation.result.indemnizacion ?? 0);
        const total = Number(invocation.result.total ?? 0);
        const depositCount = Number(invocation.result.depositos ?? 0);
        return [
          {
            id: `${message.id}-balance-${index}`,
            kind: 'balance-card',
            content: 'Tu ahorro esta protegido.',
            balance: {
              savings: Math.round(savings * 10_000_000),
              severance: Math.round(severance * 10_000_000),
              total: Math.round(total * 10_000_000),
              depositCount,
            },
          },
        ];
      }
      case 'prepararReclamo': {
        if (invocation.result.error) {
          return [
            {
              id: `${message.id}-claim-error-${index}`,
              kind: 'bubble',
              role: 'ai',
              content: String(invocation.result.mensaje || 'No hay ahorro disponible.'),
            },
          ];
        }

        if (!invocation.result.xdr) return [];

        return [
          {
            id: `${message.id}-claim-${index}`,
            kind: 'claim-action',
            content: String(
              invocation.result.resumen ||
                'Preparé el retiro de tu ahorro. Revisalo y firmalo.'
            ),
            xdr: String(invocation.result.xdr),
            amount: Number(invocation.result.monto || 0),
          },
        ];
      }
      default:
        return [];
    }
  });
}

function mapMessages(messages: Message[]): ChatTimelineItem[] {
  return messages.flatMap((message) => {
    const items: ChatTimelineItem[] = [];
    const text = getMessageText(message);

    if (message.role === 'assistant' && text) {
      items.push({
        id: message.id,
        kind: 'bubble',
        role: 'ai',
        content: text,
      });
    }

    if (message.role === 'user' && text) {
      items.push({
        id: message.id,
        kind: 'bubble',
        role: 'user',
        content: text,
      });
    }

    items.push(...mapToolResults(message));
    return items;
  });
}

export function buildChatTimeline(
  messages: Message[],
  systemEvents: SystemEvent[]
): ChatTimelineItem[] {
  const timeline = mapMessages(messages);
  const eventItems = systemEvents.map(
    (event): ChatTimelineItem => ({
      id: event.id,
      kind: 'system-event',
      event,
    })
  );

  return [...timeline, ...eventItems];
}
