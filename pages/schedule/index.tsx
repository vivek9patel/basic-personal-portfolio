import { useEffect } from "react";

const Schedule = () => {
  useEffect(() => {
    const head = document.querySelector("head");
    if (head === null) return;
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head.appendChild(script);
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div
        className="calendly-inline-widget px-4 w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] h-full"
        data-url="https://calendly.com/vivek9patel?hide_gdpr_banner=1&primary_color=fd3a69"
      ></div>
    </div>
  );
};

export default Schedule;
