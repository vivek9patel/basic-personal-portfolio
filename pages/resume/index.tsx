import type { NextPage } from "next";
import { Button } from "../../components/CustomHtml";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const Resume: NextPage = () => {
  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: "pageview", page: "/resume", title: "Resume" });
  }, []);

  return (
    <div className="my-10">
      {/* download resume button */}
      <div className="flex justify-evenly items-center">
        <Button
          id="full-page-resume-button"
          onClick={() => {
            ReactGA.event({
              category: "Button.Click",
              action: "Full Screen Resume",
            });
            window.open("/vivek_patel_resume.pdf", "_blank");
          }}
        >
          <span data-cursor="full-page-resume-button" className="mr-2">
            View Full Page
          </span>
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
        </Button>
        <a
          href="/vivek_patel_resume.pdf"
          onClick={() => {
            ReactGA.event({
              category: "Button.Click",
              action: "Download Resume",
            });
          }}
          download
        >
          <button
            data-cursor={true}
            className="bg-v9-yellow text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition ease-linear duration-1000"
          >
            Download
          </button>
        </a>
      </div>

      <div className="flex justify-center mt-10">
        <iframe
          src="/vivek_patel_resume.pdf"
          width="100%"
          height="1000px"
        ></iframe>
      </div>
    </div>
  );
};

export default Resume;
