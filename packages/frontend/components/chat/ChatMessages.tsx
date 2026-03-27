'use client';

import ChatBubble from './ChatBubble';
import LoadingIndicator from '@/components/shared/LoadingIndicator';
import BalanceCard from '@/components/shared/BalanceCard';
import SignTxButton from '@/components/shared/SignTxButton';
import SystemEventMessage from './SystemEventMessage';
import type { ChatTimelineItem } from '@/lib/chat-timeline';

interface ChatMessagesProps {
  items: ChatTimelineItem[];
  isLoading: boolean;
}

export default function ChatMessages({ items, isLoading }: ChatMessagesProps) {
  return (
    <>
      {items.map((item) => {
        if (item.kind === 'bubble') {
          return (
            <ChatBubble
              key={item.id}
              role={item.role}
              content={item.content}
            />
          );
        }

        if (item.kind === 'balance-card') {
          return (
            <ChatBubble key={item.id} role="ai" content={item.content}>
              <div className="mt-3">
                <BalanceCard
                  {...item.balance}
                  variant="inline"
                  phase="loaded"
                />
              </div>
            </ChatBubble>
          );
        }

        if (item.kind === 'claim-action') {
          return (
            <ChatBubble key={item.id} role="ai" content={item.content}>
              <SignTxButton
                xdr={item.xdr}
                label={`Retirar ${item.amount.toLocaleString('es-AR')} dolares`}
                onSuccess={() => undefined}
                onError={() => undefined}
              />
            </ChatBubble>
          );
        }

        return (
          <SystemEventMessage
            key={item.id}
            kind={item.event.kind}
            title={item.event.title}
            body={item.event.body}
            timestamp={item.event.timestamp}
            pushDelivered={item.event.pushDelivered}
          />
        );
      })}
      {isLoading && (
        <div className="max-w-[85%]">
          <LoadingIndicator text="" />
        </div>
      )}
    </>
  );
}
