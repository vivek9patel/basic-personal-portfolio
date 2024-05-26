import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const Anchor = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      data-cursor={true} // This is for custom cursor
      target="_blank"
      className={`text-v9-pink whitespace-nowrap underline underline-offset-2 hover:text-v9-yellow p-1 hover:no-underline ${
        props.className ? props.className : ""
      }`}
    ></a>
  );
};

const Hr = ({ width = "100%" }) => {
  return (
    <div className="flex justify-center">
      <div
        style={{ height: "1px", width }}
        className="my-6 bg-gray-600 w-full"
      ></div>
    </div>
  );
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      data-cursor={true} // This is for custom cursor
      {...props}
      className={`font-light whitespace-nowrap flex justify-center items-center bg-v9-secondary-black px-3 py-1 border-2 rounded-md border-opacity-5 transition-colors ${
        props.disabled
          ? "opacity-50"
          : "hover:border-v9-pink hover:border-opacity-30 "
      } ${props.className ? props.className : ""}`}
    />
  );
};

export { Anchor, Hr, Button };
