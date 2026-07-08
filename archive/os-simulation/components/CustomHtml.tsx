import { AnchorHTMLAttributes } from 'react';

const Anchor = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      data-cursor={true} // This is for custom cursor
      target="_blank"
      className={` decoration-primary text-primary transition-colors duration-150 hover:text-accent hover:no-underline whitespace-nowrap underline underline-offset-2 p-1 ${
        props.className ? props.className : ''
      }`}
    ></a>
  );
};

export { Anchor };
