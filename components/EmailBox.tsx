import { createRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import ReactGA from "react-ga4";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";

export default function EmailBox() {
  const [loading, setLoading] = useState(false);

  const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const subjectRef = createRef<HTMLTextAreaElement>();
  const senderNameRef = createRef<HTMLInputElement>();
  const socialIdRef = createRef<HTMLInputElement>();

  useEffect(() => {
    // @ts-ignore
    emailjs.init(process.env.NEXT_PUBLIC_USER_ID);
  }, []);

  function canSendEmail(): boolean {
    const emailTimestamps = localStorage.getItem('emailTimestamps');
    if (!emailTimestamps) return true;
    
    const timestamps = JSON.parse(emailTimestamps);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Filter out timestamps older than 24 hours
    const recentTimestamps = timestamps.filter((timestamp: number) => {
      return now - timestamp < twentyFourHours;
    });
    
    // Allow up to 2 emails per 24 hours
    return recentTimestamps.length < 2;
  }

  function getRemainingTime(): string {
    const emailTimestamps = localStorage.getItem('emailTimestamps');
    if (!emailTimestamps) return '';
    
    const timestamps = JSON.parse(emailTimestamps);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    // Filter out timestamps older than 24 hours
    const recentTimestamps = timestamps.filter((timestamp: number) => {
      return now - timestamp < twentyFourHours;
    });
    
    if (recentTimestamps.length === 0) return '';
    
    // Find the oldest timestamp in the recent list
    const oldestTimestamp = Math.min(...recentTimestamps);
    const timeDiff = now - oldestTimestamp;
    const remainingTime = twentyFourHours - timeDiff;
    
    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    
    return `${hours}h ${minutes}m`;
  }

  function getEmailCount(): number {
    const emailTimestamps = localStorage.getItem('emailTimestamps');
    if (!emailTimestamps) return 0;
    
    const timestamps = JSON.parse(emailTimestamps);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    // Filter out timestamps older than 24 hours
    const recentTimestamps = timestamps.filter((timestamp: number) => {
      return now - timestamp < twentyFourHours;
    });
    
    return recentTimestamps.length;
  }

  function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    // Check if user can send email
    if (!canSendEmail()) {
      const remainingTime = getRemainingTime();
      const emailCount = getEmailCount();
      toast.warning("Rate limit exceeded", {
        description: `You've sent ${emailCount}/2 emails in the last 24 hours. Next email available in ${remainingTime}.`,
      });
      return;
    }
    
    const message = subjectRef.current?.value;
    if (message === undefined || message === "") return;
    const senderName = senderNameRef.current?.value;
    const socialId = socialIdRef.current?.value;
    setLoading(true);
    const templateParams = {
      from_name: "vivek9patel.com",
      to_name: "Vivek Patel",
      subject: `${senderName ? senderName : "personal-site"}`,
      message: `${message}${socialId ? `\n\nSocial ID: ${socialId}` : ""}`,
    };
    emailjs
      // @ts-ignore
      .send(serviceID, templateID, templateParams)
      .then(() => {
        ReactGA.event({
          category: "Button.Click",
          action: "Emailjs Trigger",
        });
        if (subjectRef.current) subjectRef.current.value = "";
        if (socialIdRef.current) socialIdRef.current.value = "";
        
        // Store the current timestamp in array
        const emailTimestamps = localStorage.getItem('emailTimestamps');
        const timestamps = emailTimestamps ? JSON.parse(emailTimestamps) : [];
        timestamps.push(Date.now());
        localStorage.setItem('emailTimestamps', JSON.stringify(timestamps));
        
        const newEmailCount = getEmailCount();
        const remainingEmails = 2 - newEmailCount;
        
        toast.success("Email sent successfully!", {
          description: `Thanks for reaching out! I'll get back to you soon :)`,
        });
        
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to send email", {
          description: "Something went wrong. Please try again later.",
        });
        setLoading(false);
      });
  }

  return (
    <form className="grid grid-cols-1 gap-y-4" onSubmit={sendEmail}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form-sender-name">Email Address</Label>
        <Input
          id="contact-form-sender-name"
          type="email"
          ref={senderNameRef}
          data-cursor-focusable="true"
          placeholder="xyz@v9.com"
          required
        ></Input>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form-social-id">Social Media (Optional)</Label>
        <Input
          id="contact-form-social-id"
          type="text"
          ref={socialIdRef}
          data-cursor-focusable="true"
          placeholder="@yourhandle or linkedin.com/in/yourprofile"
        ></Input>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form">Message</Label>
        <Textarea
          id="contact-form"
          data-cursor-focusable="true"
          ref={subjectRef}
          rows={5}
          placeholder="Hey Vivek, This is an awesome website!"
          required
        ></Textarea>
      </div>
      <Button disabled={loading} type="submit">
        Send me an email!
      </Button>
    </form>
  );
}
