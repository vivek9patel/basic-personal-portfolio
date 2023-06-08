import React, { useEffect, useState } from "react";
import Link from "next/link";
import LikeCounter from "./LikeCounter";

const Header = ({ currentLink = "", loading = false }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [isHmMenuBtnClicked, setIsHmMenuBtnClicked] = useState(false);

  useEffect(() => {
    const oldThemeMode = localStorage.getItem("themeMode");
    if (oldThemeMode) setThemeMode(oldThemeMode as "light" | "dark");
    else {
      const html = document.querySelector("html");
      if (html) {
        setThemeMode(html.classList.contains("dark") ? "dark" : "light");
      }
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      if (themeMode === "dark") html.classList.add("dark");
      else html.classList.remove("dark");
    }
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`sticky z-50 top-0 left-0 transition-none transform dark:text-slate-300  ${
        themeMode === "dark" ? " bg-v9-primary-black" : "bg-white"
      }`}
    >
      <div className="flex justify-center">
        <div className=" w-full px-10 sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] py-4 flex justify-between relative">
          <div
            onClick={() => {
              window.open("https://www.linkedin.com/in/vivek9patel/");
            }}
            className={`font-semibold text-xl no-underline text-center w-32 transition ease-linear duration-1000 ${
              false ? "animateFullWidth" : "animateNormalWidth"
            }`}
          >
            <a className=" hover:underline underline-offset-2 hover:text-white font-thin">
              @vivek9patel
            </a>
          </div>
          <div
            className=" w-8 sm:hidden"
            onClick={() => {
              setIsHmMenuBtnClicked(!isHmMenuBtnClicked);
            }}
          >
            <svg
              className="w-full cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              stroke="#eee"
              strokeWidth=".6"
              fill="rgba(0,0,0,0)"
              strokeLinecap="round"
            >
              <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                  fill="freeze"
                  begin="start.begin"
                />
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                  fill="freeze"
                  begin="reverse.begin"
                />
              </path>
              <rect width="10" height="10" stroke="none">
                <animate
                  dur="2s"
                  id="reverse"
                  attributeName="width"
                  begin="click"
                />
              </rect>
              <rect width="10" height="10" stroke="none">
                <animate
                  dur="0.001s"
                  id="start"
                  attributeName="width"
                  values="10;0"
                  fill="freeze"
                  begin="click"
                />
                <animate
                  dur="0.001s"
                  attributeName="width"
                  values="0;10"
                  fill="freeze"
                  begin="reverse.begin"
                />
              </rect>
            </svg>
          </div>
          <div
            className={` ${
              isHmMenuBtnClicked ? "flex" : "hidden"
            } sm:flex absolute text-right right-0 top-full bg-v9-secondary-black border border-v9-light-grey border-opacity-40 rounded p-2 sm:p-0 sm:border-none sm:bg-transparent sm:top-0 sm:right mr-10 sm:m-0 flex-col sm:relative sm:flex-row items-center transition-none `}
          >
            <Link href="/">
              <a
                className={`mx-2 w-full sm:w-auto ${
                  currentLink === "" ? "text-v9-yellow" : "hover:text-white"
                }  underline-offset-2`}
              >
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a
                className={`mx-2 w-full sm:w-auto ${
                  currentLink === "projects"
                    ? "text-v9-yellow"
                    : "hover:text-white"
                }  underline-offset-2`}
              >
                Projects
              </a>
            </Link>
            <Link href="/resume">
              <a
                className={`mx-2 w-full sm:w-auto ${
                  currentLink === "resume"
                    ? "text-v9-yellow"
                    : "hover:text-white"
                }  underline-offset-2`}
              >
                Resume
              </a>
            </Link>
            <div
              onClick={() => {
                window.open("https://meet.vivek9patel.com/schedule");
              }}
              className={`mx-2 w-full sm:w-auto hover:underline-offset-2 hover:text-white`}
            >
              <a className="">Let's chat</a>
            </div>
            <div
              onClick={() => {
                window.open("https://github.com/vivek9patel");
              }}
              className={`mx-2 w-full sm:w-auto hover:underline-offset-2`}
            >
              <a className=" flex  w-full sm:w-auto items-center justify-center hover:text-white">
                <span className="flex-1">Github</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={"14px"}
                  height={"14px"}
                  fill={"currentcolor"}
                >
                  <g data-name="Layer 2">
                    <g data-name="external-link">
                      <rect width="24" height="24" opacity="0"></rect>
                      <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z"></path>
                      <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"></path>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
            {/* <input
            onChange={toggleThemeMode}
            checked={themeMode === "dark"}
            className="themeToggle mx-2"
            type="checkbox"
          ></input> */}
          </div>
        </div>
      </div>
      <div className="w-full dark:bg-gray-200 bg-black h-1">
        <div
          className={`bg-v9-pink w-0 h-1 ${
            loading ? "triggerLoader" : "trigeerLoaderDone"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Header;
