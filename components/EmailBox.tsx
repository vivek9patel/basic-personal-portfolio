import { createRef, useEffect, useState } from "react";
import { Button } from "./CustomHtml";
import emailjs from "@emailjs/browser";

export default function EmailBox() {
  const [loading, setLoading] = useState(false);

  const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const subjectRef = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    // @ts-ignore
    emailjs.init(process.env.NEXT_PUBLIC_USER_ID);
  }, []);

  function sendEmail() {
    const message = subjectRef.current?.value;
    if (message === undefined || message === "") return;
    setLoading(true);
    const templateParams = {
      from_name: "vivek9patel.com",
      to_name: "Vivek Patel",
      subject: "Message from personal-site",
      message: message,
    };
    emailjs
      // @ts-ignore
      .send(serviceID, templateID, templateParams)
      .then(() => {
        if (subjectRef.current) subjectRef.current.value = "";
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  return (
    <div className="grid grid-cols-1 gap-y-2">
      <textarea
        id="contact-form"
        data-cursor-focusable="true"
        ref={subjectRef}
        className="border border-v9-light-grey custom-scroll-bar-x border-opacity-50 bg-v9-primary-black p-4 rounded flex-1 focus:border-v9-yellow active:border-v9-yellow outline-none"
        rows={5}
        placeholder="Hey Vivek, This is an awesome website!"
      ></textarea>
      <Button disabled={loading} onClick={sendEmail}>
        Send me an email!
      </Button>
    </div>
  );
}
