import Link from "next/link";
import { unixToDate } from "../helpers/helpers";
import type FrontMatter from "../interfaces/FrontMatter";
import { Anchor } from "./CustomHtml";

function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-24 border-t">
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
