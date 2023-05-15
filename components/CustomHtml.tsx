import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const Anchor = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a className=" text-v9-pink underline underline-offset-2" {...props}></a>
  );
};

const Hr = () => {
  return (
    <div style={{ height: "1px" }} className="my-6 bg-gray-600 w-full"></div>
  );
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="text-sm 2xl:text-lg font-light bg-v9-secondary-black hover:border-v9-pink px-3 py-1 border-2 rounded-md border-opacity-5 hover:border-opacity-30 transition-colors"
    />
  );
};

export { Anchor, Hr, Button };
