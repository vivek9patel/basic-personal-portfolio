import Avatar from "./Avatar";
import tarsImage from "../images/tars.svg"
import deleteImage from "../images/delete.svg"
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

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
        deleteChatSession();
        clientRouter.reload();
    }

    if(currentLink === "tars"){
        return (
            <div
                className="select-none z-30 opacity-60 hover:opacity-100 absolute hidden md:flex flex-col transition-all ease-linear duration-75 items-center -bottom-52 right-[54px]"
                onClick={handleClearTarsHistory}
            >
                <div className="w-10 h-10 border-1 relative rounded-full border-gray-100 transition-colors duration-300 border">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Avatar border={false} title="Delete Tars History" url={deleteImage.src} width="w-6" height="h-6" />
                    </div>
                </div>
                <div className="mt-2 text-center text-sm transition-colors duration-300">
                    Clear
                </div>
            </div>
        )
    }

    return (
        <div
            className="select-none group z-30 absolute flex flex-col transition-all ease-linear duration-75 items-center -bottom-52 right-2 md:right-[48px]"
            onClick={() => {
                ReactGA.event({
                    category: "Button.Click",
                    action: "Ask Tars Page Button",
                });
                clientRouter.push("/tars");
            }}
        >
            <div className="w-10 h-10 border-2 rounded-full bg-v9-primary-black group-hover:border-v9-yellow transition-colors duration-300">
                <Avatar title="Ask Tars" url={tarsImage.src} width="w-full" height="h-full" />
            </div>
            <div className="mt-2 text-center text-sm group-hover:underline group-hover:text-white transition-colors duration-300">
                Ask Tars
            </div>
        </div>
    )
}