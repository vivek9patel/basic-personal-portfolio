import { useEffect } from 'react'

const Schedule = () => {

    useEffect(() => {
        const head = document.querySelector('head');
        if(head === null) return;
        const script = document.createElement('script');
        script.setAttribute(
        'src',
        'https://assets.calendly.com/assets/external/widget.js'
        );
        head.appendChild(script);
    },[])

  return (
    <>
        <div className="calendly-inline-widget " data-url="https://calendly.com/vivek9patel?hide_gdpr_banner=1&primary_color=fd3a69" style={{minWidth: "320px", height: "630px"}}></div>
    </>
  )
}

export default Schedule
