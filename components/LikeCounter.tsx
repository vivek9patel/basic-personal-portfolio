import { useEffect, useState } from "react";
import { fetchLikes, incrementLikesTo, formatNumber } from "../helpers/helpers";
import heartImage from "../images/heart.svg";
import { useSession, signIn, signOut } from "next-auth/react";
import ReactGA from "react-ga4";

export default function LikeCounter() {
  const { status } = useSession();
  const [likeCount, setLikeCount] = useState(0);
  const [likeIncrements, setLikeIncrements] = useState(0);
  const [oldLikeIncrements, setOldLikeIncrements] = useState(0);
  const [updateIncrementTimeout, setUpdateIncrementTimeout] =
    useState<any>(null);
  const [authInterval, setAuthInterval] = useState<any>(null);
  const [showEmojiTimeout, setShowEmojiTimeout] = useState<any>(null);
  const [emojiVisible, setEmojiVisible] = useState(false);

  useEffect(() => {
    startAuthInterval();
    getLikes();
    window.addEventListener("beforeunload", () => {
      signOut();
    });
  }, []);

  useEffect(() => {
    clearTimeout(updateIncrementTimeout);
    if (likeIncrements - oldLikeIncrements === 0) {
      return;
    }
    updateLikesInDB();
  }, [likeIncrements]);

  const updateLikesInDB = () => {
    setUpdateIncrementTimeout(
      setTimeout(() => {
        incrementLikesTo(likeIncrements - oldLikeIncrements).then((res) => {
          if (res.status === 401) {
            startAuthInterval();
          }
        });
      }, 3000)
    );
  };

  useEffect(() => {
    if (status === "authenticated") {
      clearInterval(authInterval);
      return;
    }
  }, [status]);

  const startAuthInterval = () => {
    setAuthInterval(
      setInterval(() => {
        signIn("credentials", { redirect: false });
      }, 3000)
    );
  };

  const getIncrementsFromLocalStorage = () => {
    let likeIncrements = parseInt(
      localStorage.getItem("likeIncrements") || "0"
    );
    if (likeIncrements < 0 || likeIncrements > 9) {
      likeIncrements = 0;
    }
    setOldLikeIncrements(likeIncrements);
    return likeIncrements;
  };

  const getLikes = () => {
    fetchLikes().then((res) => {
      if (res && res.likes) {
        const previousIncrement = getIncrementsFromLocalStorage();
        changeLikeIncrements(previousIncrement);
        setLikeCount(res.likes + previousIncrement);
      }
    });
  };

  const changeLikeIncrements = (increment: number) => {
    localStorage.setItem("likeIncrements", increment.toString());
    setLikeIncrements(increment);
  };

  const resetLikes = () => {
    setLikeCount(likeCount - likeIncrements);
    changeLikeIncrements(0);
  };

  const updateLikes = () => {
    toggleEmoji();
    if (likeIncrements >= 9) {
      resetLikes();
      return;
    }
    changeLikeIncrements(likeIncrements + 1);
    setLikeCount(likeCount + 1);
    ReactGA.event({
      category: "Button.Click",
      action: "Like Counter",
    });
  };

  const toggleEmoji = () => {
    clearTimeout(showEmojiTimeout);
    setEmojiVisible(true);
    setShowEmojiTimeout(
      setTimeout(() => {
        setEmojiVisible(false);
      }, 3000)
    );
  };

  const getEmojiBasedOnIncrements = () => {
    switch (likeIncrements) {
      case 0:
        return `😢`;
      case 1:
        return `😐`;
      case 2:
        return `🙂`;
      case 3:
        return `😊`;
      case 4:
        return `😄`;
      case 5:
        return `😁`;
      case 6:
        return `😍`;
      case 7:
        return `🥰`;
      case 8:
        return `🤩`;
      case 9:
        return `🤯`;
    }
  };

  if (likeCount && status === "authenticated") {
    return (
      <div className=" select-none z-30 absolute flex flex-col transition-all ease-linear duration-75 items-center -bottom-32 right-4 md:right-14 ">
        <div
          className={`absolute top-5 -right-8 -translate-y-1/2 transition-transform duration-300 text-white ${
            emojiVisible ? "-translate-x-[100px] md:translate-x-[0px]" : "-translate-x-[50px]"
          }`}
        >
          {getEmojiBasedOnIncrements()}
        </div>
        <div
          className={` bg-white group relative rounded-full shadow-md shadow-gray-700 h-10 w-10 flex justify-center items-center overflow-hidden group-hover:shadow `}
          onClick={updateLikes}
          id="like-counter-button"
          data-cursor={true}
        >
          <div
            className={` bg-slate-300 rounded-full flex justify-center items-center h-9 w-9`}
          >
            <img
              data-cursor="like-counter-button"
              src={heartImage.src}
              className="w-full h-full z-50 rounded-full"
            />
          </div>
          <div
            className={`absolute w-10 bottom-0 z-40  border-2 rounded-full ${
              likeIncrements === 9
                ? "border-v9-yellow bg-v9-pink"
                : "border-transparent bg-v9-pink"
            }`}
            style={{
              height: `${
                ((likeIncrements === 0 ? 0 : likeIncrements + 1) / 10) * 100
              }%`,
            }}
          ></div>
        </div>
        <div
          className={`font-light text-sm mt-1 group-hover:text-v9-yellow ${
            likeIncrements === 9 ? "text-v9-yellow" : "text-v9-light-grey "
          }`}
        >
          {formatNumber(likeCount)}
        </div>
      </div>
    );
  }

  return null;
}
