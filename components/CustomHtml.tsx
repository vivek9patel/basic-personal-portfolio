import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const Anchor = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      target="_blank"
      className={`text-v9-pink underline hover:text-v9-yellow hover:underline underline-offset-2 ${
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
      {...props}
      className={`font-light flex justify-center items-center bg-v9-secondary-black px-3 py-1 border-2 rounded-md border-opacity-5 transition-colors ${
        props.disabled
          ? "opacity-50"
          : "hover:border-v9-pink hover:border-opacity-30 "
      } `}
    />
  );
};

export { Anchor, Hr, Button };
