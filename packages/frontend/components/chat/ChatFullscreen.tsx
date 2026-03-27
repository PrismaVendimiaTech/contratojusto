'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import { buildChatTimeline } from '@/lib/chat-timeline';
import { useContract } from '@/providers/ContractProvider';
import { useWallet } from '@/providers/WalletProvider';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant' as const,
  content: 'Bienvenido. Soy tu asesor de ContratoJusto. Preguntame lo que necesites.',
};

export default function ChatFullscreen() {
  const { contractId, systemEvents } = useContract();
  const { address } = useWallet();
  const reloadRef = useRef<(() => void) | null>(null);
  const retryRef = useRef(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, append, reload } = useChat({
    api: '/api/chat',
    initialMessages: [WELCOME_MESSAGE],
    body: {
      actorAddress: address,
      contractId,
    },
    onError: () => {
      if (!retryRef.current && reloadRef.current) {
        retryRef.current = true;
        setTimeout(() => {
          reloadRef.current?.();
          retryRef.current = false;
        }, 800);
      }
    },
  });
  reloadRef.current = reload;
  const timeline = buildChatTimeline(messages, systemEvents);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hasUserMessages = messages.some((m) => m.role === 'user');

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleChipSelect = (text: string) => {
    append({ role: 'user', content: text });
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 64px)' }}>
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 chat-scroll space-y-4 bg-slate-50">
        <ChatMessages items={timeline} isLoading={isLoading} />
        {!hasUserMessages && (
          <SuggestionChips
            suggestions={['¿Cuanto tengo?', '¿Mi patron deposito?', '¿Que es esto?']}
            onSelect={handleChipSelect}
          />
        )}
      </div>

      {/* Input bar */}
      <ChatInput
        input={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </div>
  );
}
