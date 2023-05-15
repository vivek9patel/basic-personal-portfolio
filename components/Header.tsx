import React, { useEffect, useState } from "react";
import Link from "next/link";

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
      <div className="margin-wrapper py-4 flex justify-between">
        <Link href="/">
          <div
            className={`font-semibold text-xl no-underline text-center w-32 transition ease-linear duration-1000 ${
              false ? "animateFullWidth" : "animateNormalWidth"
            }`}
          >
            <a className="cursor-pointer font-thin">@vivek9patel</a>
          </div>
        </Link>
        <div className="flex items-center">
          <div
            className={`transition-none ${false ? "w-0 h-0 invisible" : ""}`}
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
            <Link href="https://meet.vivek9patel.dev/schedule">
              <a
                target={"_blank"}
                className="mx-2 hover:underline hover:underline-offset-2"
              >
                Let's chat
              </a>
            </Link>
          </div>
          <input
            onChange={toggleThemeMode}
            checked={themeMode === "dark"}
            className="themeToggle mx-2"
            type="checkbox"
          ></input>
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
