import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { ArrowLeft } from 'lucide-react';
import {
  useAgent,
  useAgentContext,
  useCopilotKit,
  UseAgentUpdate,
} from '@copilotkit/react-core/v2';
import { randomUUID } from '@copilotkit/shared';
import type { AssistantMessage, Message } from '@ag-ui/core';
import { ASK_SUGGESTIONS } from '@/lib/ask/agent-prompt';
import { EXPERIENCE } from '@/data/experience';
import { PROJECTS } from '@/data/projects';
import { TESTIMONIALS } from '@/data/testimonials';
import { useAskGenerativeComponents } from '@/components/ask/useAskGenerativeComponents';
import { AskToolCall } from '@/components/ask/AskToolCall';
import { AskComposer } from '@/components/ask/AskComposer';

function getMessageText(message: Message): string {
  if (typeof message.content === 'string') return message.content;
  return '';
}

function isAssistantMessage(message: Message): message is AssistantMessage {
  return message.role === 'assistant';
}

export default function AskEngine() {
  const { agent } = useAgent({
    updates: [
      UseAgentUpdate.OnMessagesChanged,
      UseAgentUpdate.OnRunStatusChanged,
    ],
  });
  const { copilotkit } = useCopilotKit();
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useAskGenerativeComponents();

  useAgentContext({
    description: 'Valid experience ids and companies for UI components',
    value: EXPERIENCE.map(e => ({
      id: e.id,
      company: e.company,
      role: e.role,
      stack: e.stack ?? [],
    })),
  });

  useAgentContext({
    description: 'Valid project ids for UI components',
    value: PROJECTS.map(p => ({
      id: p.id,
      title: p.title,
      metric: p.metric.label,
    })),
  });

  useAgentContext({
    description: 'Valid testimonial ids for quote cards',
    value: TESTIMONIALS.map(t => ({
      id: t.id,
      author: t.author,
      company: t.company ?? null,
    })),
  });

  const visibleMessages = useMemo(
    () => agent.messages.filter(message => message.role !== 'tool'),
    [agent.messages]
  );

  const hasMessages = visibleMessages.length > 0;

  useEffect(() => {
    if (!hasMessages) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [visibleMessages, agent.isRunning, hasMessages]);

  const sendMessage = useCallback(
    async (raw: string) => {
      const content = raw.trim();
      if (!content || agent.isRunning) return;

      setError(null);
      setInput('');

      agent.addMessage({
        id: randomUUID(),
        role: 'user',
        content,
      });

      try {
        await copilotkit.runAgent({ agent });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong.';
        setError(message);
      }
    },
    [agent, copilotkit]
  );

  const stopAgent = useCallback(() => {
    copilotkit.stopAgent({ agent });
  }, [agent, copilotkit]);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-10 md:py-16">
        <header className="mb-8 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            data-cursor="true"
          >
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </Link>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Ask TARS
          </p>
        </header>

        {!hasMessages ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-xl space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  What would you like to know about Vivek?
                </h1>
                <p className="mt-3 text-base text-muted-foreground">
                  A generative UI based answer engine. Ask about experience,
                  projects, or role fit, and get interactive UI in the response.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {ASK_SUGGESTIONS.map(suggestion => (
                  <button
                    key={suggestion.title}
                    type="button"
                    data-cursor="true"
                    onClick={() => sendMessage(suggestion.message)}
                    className="border border-border bg-card px-3 py-2 text-left text-sm text-foreground shadow-[3px_3px_0px_0px_var(--border)] transition-colors hover:bg-accent"
                  >
                    {suggestion.title}
                  </button>
                ))}
              </div>

              <AskComposer
                value={input}
                onChange={setInput}
                onSubmit={sendMessage}
                onStop={stopAgent}
                isRunning={agent.isRunning}
                inputRef={inputRef}
                autoFocus
              />

              {error && (
                <p className="border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-8 pb-28">
              {visibleMessages.map(message => {
                const text = getMessageText(message);
                const isUser = message.role === 'user';

                return (
                  <article key={message.id} className="space-y-3">
                    {isUser ? (
                      <div className="flex justify-end">
                        <div className="max-w-[90%] border border-border bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-[3px_3px_0px_0px_var(--border)]">
                          {text}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {text ? (
                          <div className="prose prose-sm max-w-none text-foreground dark:prose-invert prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                            <Markdown>{text}</Markdown>
                          </div>
                        ) : null}

                        {isAssistantMessage(message) &&
                          message.toolCalls?.map(toolCall => (
                            <AskToolCall
                              key={toolCall.id}
                              toolCall={toolCall}
                            />
                          ))}
                      </div>
                    )}
                  </article>
                );
              })}

              {agent.isRunning && (
                <p className="text-sm text-muted-foreground animate-pulse">
                  Thinking…
                </p>
              )}

              {error && (
                <p className="border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background">
              <div className="mx-auto max-w-3xl px-6 py-4">
                <AskComposer
                  value={input}
                  onChange={setInput}
                  onSubmit={sendMessage}
                  onStop={stopAgent}
                  isRunning={agent.isRunning}
                  inputRef={inputRef}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
