import { AnchorHTMLAttributes } from "react";

const Anchor = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return <a className=" text-v9-pink underline" {...props}></a>;
};

const Hr = () => {
  return (
    <div style={{ height: "1px" }} className="my-20 bg-gray-600 w-full"></div>
  );
};

export { Anchor, Hr };
