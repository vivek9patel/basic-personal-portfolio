import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/Avatar';
import Markdown from 'markdown-to-jsx';
import { RefreshCw, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { v4 as uuidv4 } from 'uuid';
import {
  TARS_SAMPLE_QUESTIONS,
  trackTarsHistoryCleared,
  trackTarsMessageSent,
  trackTarsRateLimited,
  trackTarsResponseReceived,
  trackTarsSampleQuestionsRefresh,
  trackTarsSessionStart,
  type TarsInputMethod,
  type TarsLocation,
} from '@/lib/tars-analytics';
import { type ChatApiResult, isChatErrorResponse } from '@/lib/tars-types';

import v9Icon from '@/images/v9.png';
import tarsIcon from '@/images/tars.svg';

export const LOCAL_HISTORY_KEY = 'tars-history';
export const LOCAL_SESSION_KEY = 'session-id-tars';

type History = {
  from: 'user' | 'tars';
  message: string;
  timestamp?: number;
  isError?: boolean;
};

const RATE_LIMIT_MS = 3000;

interface TarsChatPanelProps {
  className?: string;
  location?: TarsLocation;
}

export default function TarsChatPanel({
  className = '',
  location = 'widget',
}: TarsChatPanelProps) {
  const [isServerUp, setIsServerUp] = useState(false);
  const [queryProcessing, setQueryProcessing] = useState(false);
  const [query, setQuery] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<History[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [cooldownDurationMs, setCooldownDurationMs] = useState(RATE_LIMIT_MS);
  const historyRef = useRef<HTMLDivElement>(null);
  const sessionTrackedRef = useRef(false);

  const getRandomQuestions = () => {
    const shuffled = [...TARS_SAMPLE_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const getUserMessageCount = (messages: History[] = history) =>
    messages.filter(message => message.from === 'user').length;

  const clearChatHistory = () => {
    if (history.length > 0) {
      trackTarsHistoryCleared(location);
    }
    setHistory([]);
    setSelectedQuestions(getRandomQuestions());
  };

  const canMakeRequest = () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    return timeSinceLastRequest >= cooldownDurationMs;
  };

  const applyCooldown = (durationMs: number) => {
    setCooldownDurationMs(durationMs);
    setLastRequestTime(Date.now());
  };

  useEffect(() => {
    if (lastRequestTime === 0) return;

    const updateCooldown = () => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      const remaining = Math.max(0, cooldownDurationMs - timeSinceLastRequest);
      setCooldownRemaining(remaining);

      if (remaining > 0) {
        setTimeout(updateCooldown, 100);
      }
    };

    updateCooldown();
  }, [lastRequestTime, cooldownDurationMs]);

  useEffect(() => {
    const handleClearHistory = () => {
      clearChatHistory();
    };

    window.addEventListener('clearTarsHistory', handleClearHistory);

    return () => {
      window.removeEventListener('clearTarsHistory', handleClearHistory);
    };
  }, []);

  useEffect(() => {
    fetch('/api/tars/health')
      .then(response => response.json())
      .then(data => {
        const online = data?.online === true;
        setIsServerUp(online);
        if (online) {
          const oldHistory: History[] = JSON.parse(
            localStorage.getItem(LOCAL_HISTORY_KEY) || '[]'
          );
          setHistory(oldHistory);

          const oldSessionId =
            localStorage.getItem(LOCAL_SESSION_KEY) || uuidv4();
          localStorage.setItem(LOCAL_SESSION_KEY, oldSessionId);
          setSessionId(oldSessionId);

          if (!sessionTrackedRef.current) {
            trackTarsSessionStart(
              location,
              online,
              getUserMessageCount(oldHistory)
            );
            sessionTrackedRef.current = true;
          }
        } else if (!sessionTrackedRef.current) {
          trackTarsSessionStart(location, false, 0);
          sessionTrackedRef.current = true;
        }
      })
      .catch(error => {
        console.error(error);
        setIsServerUp(false);
        if (!sessionTrackedRef.current) {
          trackTarsSessionStart(location, false, 0);
          sessionTrackedRef.current = true;
        }
      });

    setSelectedQuestions(getRandomQuestions());
  }, [location]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const fetchResponse = async (newQuery: string): Promise<ChatApiResult> => {
    try {
      const response = await fetch('/api/tars/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: newQuery,
          session_id: sessionId,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.response) {
        return { ok: true, response: data.response };
      }

      if (isChatErrorResponse(data)) {
        return {
          ok: false,
          error: data.error,
          code: data.code,
          retryAfter: data.retry_after,
        };
      }

      return { ok: false, fallback: true };
    } catch (error) {
      console.error(error);
      return { ok: false, fallback: true };
    }
  };

  const pushQueryToHistory = (
    from: 'user' | 'tars',
    newQuery: string,
    isError = false
  ) => {
    setHistory(oldHistory => [
      ...oldHistory,
      {
        from,
        message: newQuery,
        timestamp: Date.now(),
        isError,
      },
    ]);
  };

  const submitQuery = async (
    newQuery: string,
    inputMethod: TarsInputMethod = 'typed_send_button'
  ) => {
    if (queryProcessing || !isServerUp) return;

    if (!canMakeRequest()) {
      trackTarsRateLimited(location);
      const remainingSeconds = Math.ceil(cooldownRemaining / 1000);
      toast.warning(
        `Please wait ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} before sending another message`
      );
      return;
    }

    const messageIndex = getUserMessageCount() + 1;

    applyCooldown(RATE_LIMIT_MS);
    pushQueryToHistory('user', newQuery);
    setQueryProcessing(true);

    trackTarsMessageSent({
      location,
      inputMethod,
      message: newQuery,
      messageIndex,
    });

    const requestStartedAt = Date.now();
    const result = await fetchResponse(newQuery);
    const latencyMs = Date.now() - requestStartedAt;

    let responseText: string;
    let success: boolean;
    let isError = false;

    if (result.ok) {
      responseText = result.response;
      success = true;
    } else if ('error' in result) {
      responseText = result.error;
      success = false;
      isError = true;

      if (
        result.code === 'RATE_LIMITED' ||
        result.code === 'TEMPORARILY_BLOCKED'
      ) {
        trackTarsRateLimited(location);
        if (result.retryAfter) {
          applyCooldown(result.retryAfter * 1000);
        }
      }
    } else {
      responseText =
        'Sorry, I am not feeling well today, please come back later.';
      success = false;
    }

    trackTarsResponseReceived({
      location,
      success,
      responseLength: responseText.length,
      latencyMs,
      messageIndex,
    });

    setQueryProcessing(false);
    pushQueryToHistory('tars', responseText, isError);
    setSelectedQuestions(getRandomQuestions());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query !== '') {
      submitQuery(query, 'typed_enter_key');
      setQuery('');
    }
  };

  const handleAskBtnSubmit = () => {
    submitQuery(query, 'typed_send_button');
    setQuery('');
  };

  const handleRefreshSampleQuestions = () => {
    trackTarsSampleQuestionsRefresh(location);
    setSelectedQuestions(getRandomQuestions());
  };

  return (
    <div className={`flex flex-col h-full min-h-0 ${className}`}>
      <div className="border-b border-border p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar title="tars" url={tarsIcon.src} width="w-8" height="h-8" />
          <div>
            <p className="font-semibold text-foreground">TARS</p>
            <p
              className={`text-sm font-medium ${
                isServerUp ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {isServerUp ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div ref={historyRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length > 0 ? (
            <>
              {history.map((message, index) =>
                message.from === 'user' ? (
                  <UserMessage key={index} message={message.message} />
                ) : (
                  <TarsMessage
                    key={index}
                    message={message.message}
                    isError={message.isError}
                  />
                )
              )}
              {queryProcessing && (
                <TarsMessage message="Thinking..." isTyping={true} />
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md">
                {isServerUp ? (
                  <>
                    <p className="text-lg font-semibold text-foreground">
                      Hey I&apos;m TARS!
                    </p>
                    <p className="text-muted-foreground">
                      I&apos;m here to help you get to know Vivek better. Ask me
                      anything about his work, projects, or experience!
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    Sorry, server is down. Please come back later.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {selectedQuestions.length > 0 && (
          <div className="flex justify-between gap-2 mb-1 px-4">
            <div className="flex flex-nowrap gap-2 overflow-x-auto">
              {selectedQuestions.map((question, index) => (
                <SampleQuery
                  key={index}
                  question={question}
                  callBackFun={submitQuery}
                />
              ))}
            </div>
            <Button
              onClick={handleRefreshSampleQuestions}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              aria-label="Refresh sample questions"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        )}

        <div className="py-2 px-4 flex-shrink-0">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              placeholder="Ask me anything about Vivek..."
              disabled={queryProcessing || !isServerUp || cooldownRemaining > 0}
            />
            <Button
              onClick={handleAskBtnSubmit}
              disabled={
                query === '' ||
                queryProcessing ||
                !isServerUp ||
                cooldownRemaining > 0
              }
              size="icon"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-3 max-w-full sm:max-w-xs md:max-w-sm">
        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2">
          <p className="text-sm">{message}</p>
        </div>
        <Avatar title="user" url={v9Icon.src} width="w-8" height="h-8" />
      </div>
    </div>
  );
}

function TarsMessage({
  message,
  isTyping = false,
  isError = false,
}: {
  message: string;
  isTyping?: boolean;
  isError?: boolean;
}) {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-full sm:max-w-xs md:max-w-sm">
        <Avatar title="tars" url={tarsIcon.src} width="w-8" height="h-8" />
        <div
          className={`rounded-lg px-4 py-2 ${
            isError
              ? 'bg-destructive/10 border border-destructive/20'
              : 'bg-muted'
          }`}
        >
          {isTyping ? (
            <p className="text-sm text-muted-foreground">Thinking...</p>
          ) : isError ? (
            <p className="text-sm text-destructive">{message}</p>
          ) : (
            <div className="text-sm custom-markdown text-foreground">
              <Markdown
                options={{
                  overrides: {
                    a: {
                      props: {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      },
                    },
                  },
                }}
              >
                {message}
              </Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SampleQuery({
  question,
  callBackFun,
}: {
  question: string;
  callBackFun: (question: string, inputMethod: TarsInputMethod) => void;
}) {
  return (
    <Badge
      variant="outline"
      className="cursor-pointer text-xs py-1 px-2 whitespace-nowrap hover:bg-accent"
      onClick={() => callBackFun(question, 'sample_question')}
    >
      {question}
    </Badge>
  );
}
