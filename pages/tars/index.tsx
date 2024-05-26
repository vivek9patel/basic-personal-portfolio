import type { NextPage } from "next";
import { Button } from "../../components/CustomHtml";
import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import Avatar from "../../components/Avatar";
import Markdown from 'markdown-to-jsx'

import v9Icon from "../../images/v9.png"
import tarsIcon from "../../images/tars.svg"

const LOCAL_HISTORY_KEY = "tars-history";

type History = {
  from: "user" | "tars",
  message: string
};

const Gpt: NextPage = () => {
  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: "pageview", page: "/tars", title: "Tars" });
  }, []);

  const [isServerUp, setIsServerUp] = useState(true);
  const [queryProcessing, setQueryProcessing] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<History[]>([]);
  const historyRef = useRef(null);

  useEffect(() => {
    fetch("https://vivek9patel-v9gpt-flask.hf.space/", {
        method: "GET",
      })
        .then((response) => response.status)
        .then((code) => {
            setIsServerUp(code === 200);
        })
        .catch((error) => {
            console.error(error);
            setIsServerUp(false);
        });
    
    if(isServerUp){
      const oldHistory: History[] = JSON.parse(localStorage.getItem(LOCAL_HISTORY_KEY) || "[]");
      console.log("setting from old history")
      setHistory(oldHistory);
    }
  },[]);

  useEffect(() => {
    // @ts-ignore
    historyRef.current?.lastElementChild?.scrollIntoView();
  },[history]);

  const fetchResponse = async (newQuery: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    return await fetch("https://vivek9patel-v9gpt-flask.hf.space/api", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        "query": newQuery
      }),
    })
      .then((response) => {
        if(response.status !== 200) return "";
        return response.json();
      })
      .then((response) => {
        return response.response;
      })
      .catch((error) => {
        console.error(error);
        return "";
      });
  }

  const pushQueryToHistory = (from: "user" | "tars", newQuery: string) => {
    setHistory(oldHistory => [...oldHistory, {
      from,
      message: newQuery
    }]);
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
  }

  const submitQuery = async (newQuery: string) => {
    pushQueryToHistory("user", newQuery);
    setQueryProcessing(true);
    ReactGA.event({
        category: "Button.Click",
        action: "Tars Query submit",
        label: newQuery
    });
    const response: string = await fetchResponse(newQuery);
    setQueryProcessing(false);
    pushQueryToHistory("tars", !response ? "Sorry, I am not feeling well today, please come back later." : response);
  }

  const handleKeyDown = (e: any) => {
    if(queryProcessing || !isServerUp) return;
    if(e.key === "Enter" && query !== ""){
        submitQuery(query);
        setQuery("");
    }
  } 

  const handleAskBtnSubmit = () => {
    if(queryProcessing || !isServerUp) return;
    submitQuery(query);
    setQuery("");
  }

  return (
    <div className="my-10 safe-full-screen flex flex-col">
        <div className="flex-1 overflow-y-scroll mb-6">
            {
                history.length > 0 ?
                <div className="flex flex-col justify-end" ref={historyRef}>
                  {
                    history.map((message, index) => {
                      if(message.from === "user"){
                        return <UserMessage key={index} message={message.message} />
                      }
                      else{
                        return <TarsMessage key={index} message={message.message} />
                      }
                    })
                  }
                  {
                    queryProcessing && (
                      <TarsMessage message="Tars is typing..." />
                    )
                  }
                </div>
                :
                <div className="text-center h-full content-center">
                    {
                        isServerUp ?
                        <span className="Arialic_Hollow text-4xl text-gray-400">Hey I'm Tars!</span>
                        :
                        <span className=" text-gray-300">Sorry, server is down, please come back later : &#40;</span>
                    }
                </div>
            }
        </div>
      <div className="w-full flex flex-col sm:flex-row items-center justify-evenly">
        <input
            type="text"
            data-cursor-focusable="true"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="border w-full sm:w-auto mr-2 border-v9-light-grey custom-scroll-bar-x border-opacity-50 bg-v9-primary-black px-4 py-2 rounded flex-1 focus:border-v9-yellow active:border-v9-yellow outline-none"
            placeholder="Ask me anything about Vivek..."
        ></input>
        <Button 
            onClick={handleAskBtnSubmit}
            className="w-full mt-2 sm:w-auto sm:mt-0 sm:h-full sm:ml-2"
            disabled={query==="" || queryProcessing || !isServerUp}
        >
            Ask
        </Button>
      </div>
    </div>
  );
};

export default Gpt;

function UserMessage({message}: {message: string}){
  return (
    <div className="flex items-center justify-start my-1 text-gray-300">
      <Avatar title="user" url={v9Icon.src} />
      <div className="ml-2 flex-1">{message}</div>
    </div>
  )
}

function TarsMessage({message}: {message: string}){
  return (
    <div className="flex items-start justify-start my-2">
      <Avatar title="tars" url={tarsIcon.src} />
      <div className="ml-2 flex-1 custom-markdown">
        <Markdown>{message}</Markdown>
      </div>
    </div>
  )
}