import { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import Avatar from '@/components/Avatar';
import Markdown from 'markdown-to-jsx';
import { RefreshCw, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { v4 as uuidv4 } from 'uuid';

import v9Icon from '@/images/v9.png';
import tarsIcon from '@/images/tars.svg';

export const LOCAL_HISTORY_KEY = 'tars-history';
export const LOCAL_SESSION_KEY = 'session-id-tars';

type History = {
  from: 'user' | 'tars';
  message: string;
  timestamp?: number;
};

const SAMPLE_QUESTIONS = [
  'Can you share a recommendation from someone who has worked with Vivek?',
  "What is Vivek's education background?",
  'What are some examples of problems Vivek has solved in past roles?',
  'Can you list some projects and frameworks Vivek has worked on?',
  "What's Vivek's biggest professional achievement?",
  'How does Vivek approach problem-solving in his projects?',
  'What programming languages and technologies is Vivek most passionate about?',
  "Can you tell me about Vivek's leadership style and team collaboration?",
  'What unique skills or expertise does Vivek bring to a team?',
  'How does Vivek stay updated with the latest technology trends?',
  "What's the most challenging project Vivek has worked on?",
  "Can you describe Vivek's work philosophy and values?",
  'What industries or domains has Vivek gained experience in?',
  'How does Vivek balance technical excellence with business requirements?',
];

const RATE_LIMIT_MS = 3000;

interface TarsChatPanelProps {
  className?: string;
}

export default function TarsChatPanel({ className = '' }: TarsChatPanelProps) {
  const [isServerUp, setIsServerUp] = useState(false);
  const [queryProcessing, setQueryProcessing] = useState(false);
  const [query, setQuery] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<History[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const historyRef = useRef<HTMLDivElement>(null);

  const getRandomQuestions = () => {
    const shuffled = [...SAMPLE_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const clearChatHistory = () => {
    setHistory([]);
    setSelectedQuestions(getRandomQuestions());
  };

  const canMakeRequest = () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    return timeSinceLastRequest >= RATE_LIMIT_MS;
  };

  useEffect(() => {
    if (lastRequestTime === 0) return;

    const updateCooldown = () => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      const remaining = Math.max(0, RATE_LIMIT_MS - timeSinceLastRequest);
      setCooldownRemaining(remaining);

      if (remaining > 0) {
        setTimeout(updateCooldown, 100);
      }
    };

    updateCooldown();
  }, [lastRequestTime]);

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
        }
      })
      .catch(error => {
        console.error(error);
        setIsServerUp(false);
      });

    setSelectedQuestions(getRandomQuestions());
  }, []);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const fetchResponse = async (newQuery: string) => {
    return await fetch('/api/tars/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: newQuery,
        session_id: sessionId,
      }),
    })
      .then(response => {
        if (response.status !== 200) return '';
        return response.json();
      })
      .then(response => {
        return response.response;
      })
      .catch(error => {
        console.error(error);
        return '';
      });
  };

  const pushQueryToHistory = (from: 'user' | 'tars', newQuery: string) => {
    setHistory(oldHistory => [
      ...oldHistory,
      {
        from,
        message: newQuery,
        timestamp: Date.now(),
      },
    ]);
  };

  const submitQuery = async (newQuery: string) => {
    if (queryProcessing || !isServerUp) return;

    if (!canMakeRequest()) {
      const remainingSeconds = Math.ceil(cooldownRemaining / 1000);
      toast.warning(
        `Please wait ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} before sending another message`
      );
      return;
    }

    setLastRequestTime(Date.now());
    pushQueryToHistory('user', newQuery);
    setQueryProcessing(true);
    ReactGA.event({
      category: 'Button.Click',
      action: 'Tars Query submit',
      label: newQuery,
    });
    const response: string = await fetchResponse(newQuery);
    setQueryProcessing(false);
    pushQueryToHistory(
      'tars',
      !response
        ? 'Sorry, I am not feeling well today, please come back later.'
        : response
    );
    setSelectedQuestions(getRandomQuestions());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query !== '') {
      submitQuery(query);
      setQuery('');
    }
  };

  const handleAskBtnSubmit = () => {
    submitQuery(query);
    setQuery('');
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
                  <TarsMessage key={index} message={message.message} />
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
              onClick={() => setSelectedQuestions(getRandomQuestions())}
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
}: {
  message: string;
  isTyping?: boolean;
}) {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-full sm:max-w-xs md:max-w-sm">
        <Avatar title="tars" url={tarsIcon.src} width="w-8" height="h-8" />
        <div className="bg-muted rounded-lg px-4 py-2">
          {isTyping ? (
            <p className="text-sm text-muted-foreground">Thinking...</p>
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
  callBackFun: (question: string) => void;
}) {
  return (
    <Badge
      variant="outline"
      className="cursor-pointer text-xs py-1 px-2 whitespace-nowrap hover:bg-accent"
      onClick={() => callBackFun(question)}
    >
      {question}
    </Badge>
  );
}
