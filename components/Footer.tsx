import { Anchor } from "./CustomHtml";
import twitterLogo from "../images/twitter-logo.svg";
import githubLogo from "../images/github-logo.svg";
import linkedinLogo from "../images/linkedin-logo.svg";

function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-6 border-t">
      <div className="flex items-center justify-center my-4">
        <Anchor href="https://github.com/vivek9patel">
          <img
            className="w-6 h-6 mx-4"
            src={githubLogo.src}
            alt="github logo"
          />
        </Anchor>
        <Anchor href="https://linkedin.com/in/vivek9patel">
          <img
            className="w-6 h-6 mx-4"
            src={linkedinLogo.src}
            alt="linkedin logo"
          />
        </Anchor>
        <Anchor href="https://twitter.com/vivek9patel">
          <img
            className="w-6 h-6 mx-4"
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
