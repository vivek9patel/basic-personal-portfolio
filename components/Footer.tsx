import { Anchor } from "./CustomHtml";
import twitterLogo from "../images/twitter-logo.svg";
import githubLogo from "../images/github-logo.svg";
import linkedinLogo from "../images/linkedin-logo.svg";

function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-6 border-t">
      <div className="flex items-center justify-center my-4">
        <Anchor
          id="github_logo_footer"
          data-cursor={true}
          href="https://github.com/vivek9patel"
          className="w-8 h-8 mx-4 flex justify-center items-center"
        >
          <img
            data-cursor="github_logo_footer"
            className="w-6 h-6"
            src={githubLogo.src}
            alt="github logo"
          />
        </Anchor>
        <Anchor
          id="linkedin_logo_footer"
          data-cursor={true}
          href="https://linkedin.com/in/vivek9patel"
          className="w-8 h-8 mx-4 flex justify-center items-center"
        >
          <img
            className="w-6 h-6"
            data-cursor="linkedin_logo_footer"
            src={linkedinLogo.src}
            alt="linkedin logo"
          />
        </Anchor>
        <Anchor
          id="twitter_logo_footer"
          data-cursor={true}
          href="https://twitter.com/vivek9patel"
          className="w-8 h-8 mx-4 flex justify-center items-center"
        >
          <img
            className="w-6 h-6"
            data-cursor="twitter_logo_footer"
            src={twitterLogo.src}
            alt="twitter logo"
          />
        </Anchor>
      </div>

      <div className="flex items-center justify-center">
        made with <span className="text-red-500 mx-1">❤</span> by
        <Anchor className="ml-1" href="https://github.com/vivek9patel">
          vivek9patel
        </Anchor>
      </div>
    </footer>
  );
}

export default Footer;
