import React, { useEffect, useState } from "react";
import Link from "next/link";
import LikeCounter from "./LikeCounter";

const Header = ({ currentLink = "", loading = false }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

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
      className={`sticky z-50 top-0 left-0 transition-none transform dark:text-white ${
        themeMode === "dark" ? " bg-v9-primary-black" : "bg-white"
      }`}
    >
      <LikeCounter />
      <div className="margin-wrapper py-4 flex justify-between">
        <div
          onClick={() => {
            window.open("https://www.linkedin.com/in/vivek9patel/");
          }}
          className={`font-semibold text-xl no-underline text-center w-32 transition ease-linear duration-1000 ${
            false ? "animateFullWidth" : "animateNormalWidth"
          }`}
        >
          <a className=" font-thin">@vivek9patel</a>
        </div>
        <div
          className={`flex items-center transition-none ${
            false ? "w-0 h-0 invisible" : ""
          }`}
        >
          <Link href="/">
            <a
              className={`mx-2 ${
                currentLink === "" ? "text-v9-yellow" : ""
              } hover:underline underline-offset-2`}
            >
              Home
            </a>
          </Link>
          <Link href="/projects">
            <a
              className={`mx-2 ${
                currentLink === "projects" ? "text-v9-yellow" : ""
              } hover:underline underline-offset-2`}
            >
              Projects
            </a>
          </Link>
          <Link href="/resume">
            <a
              className={`mx-2 ${
                currentLink === "resume" ? "text-v9-yellow" : ""
              } hover:underline underline-offset-2`}
            >
              Resume
            </a>
          </Link>
          <div
            onClick={() => {
              window.open("https://meet.vivek9patel.com/schedule");
            }}
            className={`mx-2 hover:underline hover:underline-offset-2`}
          >
            <a className="">Let's chat</a>
          </div>
          <div
            onClick={() => {
              window.open("https://github.com/vivek9patel");
            }}
            className={`mx-2 hover:underline hover:underline-offset-2`}
          >
            <a className=" flex items-center justify-center">
              <span>Github</span>
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
