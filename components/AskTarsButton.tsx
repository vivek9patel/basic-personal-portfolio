import Avatar from "./Avatar";
import tarsImage from "../images/tars.svg"
import deleteImage from "../images/delete.svg"
import { useRouter } from "next/router";
import ReactGA from "react-ga4";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

export default function AskTarsButton({currentLink}: {currentLink: string}){
    const clientRouter = useRouter();

    const deleteChatSession = async () => {
        const sessionId = localStorage.getItem("session-id-tars") || "";
        const res = await fetch(`/api/deleteTarsSession?sessionId=${sessionId}`);
        return res.status === 200;
    }

    const handleClearTarsHistory = async () => {
        ReactGA.event({
            category: "Button.Click",
            action: "Delete Tars Session Button",
        });
        localStorage.setItem("tars-history", "[]");
        
        // Dispatch custom event for TARS page to listen to BEFORE the API call
        if (currentLink === "tars") {
            window.dispatchEvent(new CustomEvent('clearTarsHistory'));
        } else {
            clientRouter.reload();
        }
        
        // Try to delete the chat session, but don't let it block the UI update
        try {
            await deleteChatSession();
        } catch (error) {
            console.error("Error in deleteChatSession:", error);
        }
    }

    if(currentLink === "tars"){
        return (
            <TooltipProvider>
                <div className="select-none z-30 absolute hidden md:flex flex-col items-center -bottom-52 right-[54px]">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleClearTarsHistory}
                                variant="outline"
                                size="icon"
                                className={cn(
                                    "w-10 h-10 rounded-full border-border bg-background hover:bg-accent",
                                    "opacity-60 hover:opacity-100 transition-all duration-300",
                                    "text-foreground hover:text-foreground"
                                )}
                            >
                                <div 
                                    className="w-6 h-6 flex items-center justify-center"
                                    style={{
                                        maskImage: `url(${deleteImage.src})`,
                                        maskRepeat: 'no-repeat',
                                        maskPosition: 'center',
                                        maskSize: 'contain',
                                        backgroundColor: 'currentColor'
                                    }}
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Clear Tars History</p>
                        </TooltipContent>
                    </Tooltip>
                    <Badge 
                        variant="secondary"
                        className="mt-2 text-sm border-0 bg-transparent text-foreground hover:text-accent-foreground"
                    >
                        Clear
                    </Badge>
                </div>
            </TooltipProvider>
        )
    }

    return (
        <TooltipProvider>
            <div className="select-none z-30 absolute flex flex-col items-center -bottom-52 right-2 md:right-[48px]">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => {
                                ReactGA.event({
                                    category: "Button.Click",
                                    action: "Ask Tars Page Button",
                                });
                                clientRouter.push("/tars");
                            }}
                            variant="outline"
                            size="icon"
                                                         className={cn(
                                 "w-10 h-10 rounded-full border border-border bg-background hover:border-primary",
                                 "group transition-colors duration-300",
                                 "shadow-xs text-foreground hover:text-foreground"
                             )}
                        >
                            <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{
                                    maskImage: `url(${tarsImage.src})`,
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    maskSize: 'contain',
                                    backgroundColor: 'currentColor'
                                }}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ask Tars about Vivek</p>
                    </TooltipContent>
                </Tooltip>
                <Badge 
                    variant="secondary"
                    className={cn(
                        "mt-2 text-sm font-light border-0 bg-transparent text-foreground",
                        "group-hover:underline transition-all duration-300"
                    )}
                >
                    Tars AI
                </Badge>
            </div>
        </TooltipProvider>
    )
}