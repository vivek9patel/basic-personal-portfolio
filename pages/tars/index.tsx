import type { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import Avatar from "../../components/Avatar";
import Markdown from "markdown-to-jsx";
import { RefreshCw, Send } from "lucide-react";

import v9Icon from "../../images/v9.png";
import tarsIcon from "../../images/tars.svg";
import { v4 as uuidv4 } from "uuid";

export const LOCAL_HISTORY_KEY = "tars-history";
export const LOCAL_SESSION_KEY = "session-id-tars";

type History = {
  from: "user" | "tars";
  message: string;
  timestamp?: number;
};

// Array of sample questions for random selection
const SAMPLE_QUESTIONS = [
  "Can you share a recommendation from someone who has worked with Vivek?",
  "What is Vivek's education background?",
  "What are some examples of problems Vivek has solved in past roles?",
  "Can you list some projects and frameworks Vivek has worked on?",
  "What's Vivek's biggest professional achievement?",
  "How does Vivek approach problem-solving in his projects?",
  "What programming languages and technologies is Vivek most passionate about?",
  "Can you tell me about Vivek's leadership style and team collaboration?",
  "What unique skills or expertise does Vivek bring to a team?",
  "How does Vivek stay updated with the latest technology trends?",
  "What's the most challenging project Vivek has worked on?",
  "Can you describe Vivek's work philosophy and values?",
  "What industries or domains has Vivek gained experience in?",
  "How does Vivek balance technical excellence with business requirements?",
];

const Gpt: NextPage = () => {
  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: "pageview", page: "/tars", title: "Tars" });
  }, []);

  const [isServerUp, setIsServerUp] = useState(false);
  const [queryProcessing, setQueryProcessing] = useState(false);
  const [query, setQuery] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<History[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const historyRef = useRef<HTMLDivElement>(null);

  // Function to randomly select 3 questions
  const getRandomQuestions = () => {
    const shuffled = [...SAMPLE_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Function to clear chat history
  const clearChatHistory = () => {
    setHistory([]);
    setSelectedQuestions(getRandomQuestions());
  };

  useEffect(() => {
    // Listen for custom clear history event
    const handleClearHistory = () => {
      clearChatHistory();
    };

    window.addEventListener("clearTarsHistory", handleClearHistory);

    return () => {
      window.removeEventListener("clearTarsHistory", handleClearHistory);
    };
  }, []);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_TARS_ENDPOINT || "", {
      method: "GET",
    })
      .then((response) => response.status)
      .then((code) => {
        setIsServerUp(code === 200);
        if (code === 200) {
          const oldHistory: History[] = JSON.parse(
            localStorage.getItem(LOCAL_HISTORY_KEY) || "[]"
          );
          setHistory(oldHistory);

          let oldSessionId =
            localStorage.getItem(LOCAL_SESSION_KEY) || uuidv4();
          localStorage.setItem(LOCAL_SESSION_KEY, oldSessionId);
          setSessionId(oldSessionId);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsServerUp(false);
      });

    // Set random questions on component mount
    setSelectedQuestions(getRandomQuestions());
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const fetchResponse = async (newQuery: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return await fetch(`${process.env.NEXT_PUBLIC_TARS_ENDPOINT}/api`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        query: newQuery,
        session_id: sessionId,
      }),
    })
      .then((response) => {
        if (response.status !== 200) return "";
        return response.json();
      })
      .then((response) => {
        return response.response;
      })
      .catch((error) => {
        console.error(error);
        return "";
      });
  };

  const pushQueryToHistory = (from: "user" | "tars", newQuery: string) => {
    setHistory((oldHistory) => [
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
    pushQueryToHistory("user", newQuery);
    setQueryProcessing(true);
    ReactGA.event({
      category: "Button.Click",
      action: "Tars Query submit",
      label: newQuery,
    });
    const response: string = await fetchResponse(newQuery);
    setQueryProcessing(false);
    pushQueryToHistory(
      "tars",
      !response
        ? "Sorry, I am not feeling well today, please come back later."
        : response
    );
    // Refresh questions after each response
    setSelectedQuestions(getRandomQuestions());
  };

  const handleKeyDown = (e: any) => {
    if (queryProcessing || !isServerUp) return;
    if (e.key === "Enter" && query !== "") {
      submitQuery(query);
      setQuery("");
    }
  };

  const handleAskBtnSubmit = () => {
    if (queryProcessing || !isServerUp) return;
    submitQuery(query);
    setQuery("");
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      {/* Header */}
      <div className="border-b border-border p-2 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar title="tars" url={tarsIcon.src} width="w-8" height="h-8" />
          <div>
            <h1 className="font-semibold text-foreground">TARS</h1>
            <p
              className={`text-sm font-medium ${
                isServerUp ? "text-green-500" : "text-red-500"
              }`}
            >
              {isServerUp ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div ref={historyRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length > 0 ? (
            <>
              {history.map((message, index) =>
                message.from === "user" ? (
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
                    <div className="Arialic_Hollow text-3xl text-foreground">
                      Hey I'm TARS!
                    </div>
                    <p className="text-muted-foreground">
                      I'm here to help you get to know Vivek better. Ask me
                      anything about his work, projects, or experience!
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">
                    Sorry, server is down. Please come back later 😔
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {selectedQuestions.length > 0 && (
          <div className="flex justify-between gap-2 mb-1">
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
              title="Refresh questions"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Input Area */}
        <div className="py-2 flex-shrink-0">
          <div className="flex gap-2">
            <Input
              data-cursor-focusable="true"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              placeholder="Ask me anything about Vivek..."
              disabled={queryProcessing || !isServerUp}
            />
            <Button
              onClick={handleAskBtnSubmit}
              disabled={query === "" || queryProcessing || !isServerUp}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gpt;

function UserMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-3 max-w-[80%]">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2">
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
      <div className="flex items-start gap-3 max-w-[80%]">
        <Avatar title="tars" url={tarsIcon.src} width="w-8" height="h-8" />
        <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2">
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="text-sm custom-markdown text-foreground">
              <Markdown>{message}</Markdown>
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
  callBackFun: any;
}) {
  return (
    <Badge
      variant="outline"
      className="cursor-pointer duration-300 transition-colors text-xs py-1 px-2 opacity-60 hover:opacity-100 whitespace-nowrap"
      onClick={() => callBackFun(question)}
    >
      {question}
    </Badge>
  );
}
