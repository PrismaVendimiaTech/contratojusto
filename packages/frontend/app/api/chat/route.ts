import { generateText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { createChatTools } from '@/lib/ai-tools';

const provider = createOpenAICompatible({
  baseURL: process.env.AI_PROXY_URL?.replace('/chat/completions', '') || 'https://proxy.gestionturismo.xyz/v1',
  apiKey: process.env.AI_PROXY_KEY || '',
  name: 'micro-proxy',
});

const SYSTEM_PROMPT = `Sos el asesor de ContratoJusto, un servicio de ahorro laboral para trabajadores.

PERSONALIDAD:
- Sos calido y profesional, como un asesor financiero que genuinamente se preocupa.
- Hablas en castellano argentino (usa "vos", "tenes", "queres").
- Sos directo y claro. No usas jerga tecnica.

REGLAS ESTRICTAS:
- NUNCA digas "USDC", "Soroban", "blockchain", "smart contract", "Stellar", "token", "wallet", "XDR", "hash".
- Siempre decis "dolares" en lugar de "USDC".
- NUNCA uses emojis.
- NUNCA seas condescendiente.
- Si el usuario pregunta algo tecnico, responde en terminos simples: "tu ahorro esta guardado de forma segura".

HERRAMIENTAS:
- Usa consultarBalance cuando el usuario pregunta por su dinero, ahorro, o cuanto tiene.
- Usa consultarEstado cuando pregunta por el estado de su contrato.
- Usa prepararReclamo cuando quiere sacar su ahorro.
- Usa prepararDeposito cuando el empleador quiere depositar.

FORMATO:
- Respuestas cortas (maximo 3 oraciones).
- Cuando prepares una transaccion, explica cuanto dinero se mueve y pedi confirmacion.
- Siempre tranquiliza: "Tus fondos estan protegidos" cuando haya duda.`;

export async function POST(req: Request) {
  if (!process.env.AI_PROXY_KEY) {
    return new Response(
      JSON.stringify({ error: 'AI_PROXY_KEY no configurada. Consulta el README para setup.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const {
    messages,
    actorAddress,
    contractId = process.env.NEXT_PUBLIC_CONTRACT_ID || '',
  } = await req.json();
  const tools = createChatTools({ contractId, actorAddress });

  const { text, steps } = await generateText({
    model: provider(process.env.AI_MODEL || 'kimi'),
    system: SYSTEM_PROMPT,
    messages,
    tools,
    maxSteps: 3,
  });

  // Build Vercel AI SDK data stream protocol v1 response
  const parts: string[] = [];
  const msgId = () => 'msg-' + Math.random().toString(36).slice(2, 14);

  for (const step of steps) {
    parts.push(`f:${JSON.stringify({ messageId: msgId() })}\n`);

    if (step.toolCalls && step.toolCalls.length > 0) {
      for (const tc of step.toolCalls) {
        parts.push(`9:${JSON.stringify({ toolCallId: tc.toolCallId, toolName: tc.toolName, args: tc.args })}\n`);
      }
      if (step.toolResults) {
        for (const tr of step.toolResults) {
          parts.push(`a:${JSON.stringify({ toolCallId: tr.toolCallId, result: tr.result })}\n`);
        }
      }
      parts.push(`e:${JSON.stringify({ finishReason: 'tool-calls', usage: { promptTokens: null, completionTokens: null }, isContinued: true })}\n`);
    } else if (step.text) {
      parts.push(`0:${JSON.stringify(step.text)}\n`);
      parts.push(`e:${JSON.stringify({ finishReason: 'stop', usage: { promptTokens: null, completionTokens: null }, isContinued: false })}\n`);
    }
  }

  // If no steps produced text, add the final text
  if (text && !steps.some(s => s.text && !s.toolCalls?.length)) {
    parts.push(`f:${JSON.stringify({ messageId: msgId() })}\n`);
    parts.push(`0:${JSON.stringify(text)}\n`);
    parts.push(`e:${JSON.stringify({ finishReason: 'stop', usage: { promptTokens: null, completionTokens: null }, isContinued: false })}\n`);
  }

  parts.push(`d:${JSON.stringify({ finishReason: 'stop', usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 } })}\n`);

  return new Response(parts.join(''), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Connection': 'close',
      'X-Vercel-AI-Data-Stream': 'v1',
    },
  });
}
