import React, { useEffect, useState } from "react";
import Link from "next/link";
import LikeCounter from "./LikeCounter";
import ReactGA from "react-ga4";
import AskTarsButton from "./AskTarsButton";
import { useTheme } from "next-themes"
import { Button } from "./ui/button";

const Header = ({ currentLink = "", loading = false }) => {
  const { theme, setTheme } = useTheme();

  const [isHmMenuBtnClicked, setIsHmMenuBtnClicked] = useState(false);

  const toggleThemeMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`sticky bg-background z-50 top-0 left-0 transition-none transform `}
    >
      <LikeCounter />
      <AskTarsButton currentLink={currentLink} />
      <div className="flex justify-center">
        <div className=" w-full px-10 sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] py-4 flex justify-between relative">
          <Button
          variant="link"
            onClick={() => {
              window.open("https://www.linkedin.com/in/vivek9patel/");
              ReactGA.event({
                category: "Button.Click",
                action: "@vivek9patel linkedin",
              });
            }}
            className={`font-thin sm:hidden md:block text-xl no-underline text-center w-32 transition ease-linear duration-1000 text-muted-foreground ${
              false ? "animateFullWidth" : "animateNormalWidth"
            }`}
          >
              @vivek9patel
          </Button>
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
            } sm:flex absolute z-50 text-right right-0 top-full bg-card border border-border border-opacity-40 rounded p-2 sm:p-0 sm:border-none sm:bg-transparent sm:top-0 sm:right mr-10 sm:m-0 flex-col sm:relative sm:flex-row items-center transition-none `}
          >
            <Link href="/">
              <Button
              variant="link"
                className={`${
                  currentLink === "" ? "text-primary" : "text-muted-foreground"
                } `}
              >
                Home
              </Button>
            </Link>
            <Link href="/projects">
              <Button
              variant="link"
                className={`${
                  currentLink === "projects"
                    ? "text-primary"
                    : "text-muted-foreground"
                }  underline-offset-2`}
              >
                Projects
              </Button>
            </Link>
            <Link href="/resume">
              <Button
              variant="link"
                className={`${
                  currentLink === "resume"
                    ? "text-primary"
                    : "text-muted-foreground"
                }  `}
              >
                Resume
              </Button>
            </Link>
            <Button
              variant="link"
              onClick={() => {
                ReactGA.send({
                  hitType: "pageview",
                  page: "meet.vivek9patel.com",
                  title: "V9 Meet",
                });
                window.open("https://meet.vivek9patel.com/");
              }}
              className={`text-muted-foreground`}
            >
              Let's chat
            </Button>
            <Button
            variant="link"
              onClick={() => {
                ReactGA.event({
                  category: "Button.Click",
                  action: "Github Link",
                });
                window.open("https://github.com/vivek9patel");
              }}
              className={`text-muted-foreground`}
            >Github
            </Button>
            <Button
            variant="link"
              onClick={() => {
                ReactGA.event({
                  category: "Button.Click",
                  action: "Linkedin Link",
                });
                window.open("https://www.linkedin.com/in/vivek9patel/");
              }}
              className={`text-muted-foreground`}
            >
              LinkedIn

            </Button>
            {/* <div
              onClick={() => {
                ReactGA.event({
                  category: "Button.Click",
                  action: "Hire Me",
                });
                window.open("mailto:vivek.p9737@gmail.com");
              }}
              data-cursor={true}
              className="mb-2 sm:mb-0 whitespace-nowrap text-center text-secondary border border-secondary rounded  w-full sm:w-auto px-1 text-sm hover:text-primary"
            >
              Hire me!
            </div> */}
            <input
            onChange={toggleThemeMode}
            checked={theme === "dark"}
            className="themeToggle mx-2"
            type="checkbox"
          ></input>
          </div>
        </div>
      </div>
      <div className="w-full border-y border-border border-gray-400 h-1">
        <div
          className={`bg-accent w-0 h-1 ${
            loading ? "triggerLoader" : "trigeerLoaderDone"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Header;
