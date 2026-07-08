import { useEffect, useState } from 'react';
import { fetchLikes, incrementLikesTo, formatNumber } from '@/helpers/helpers';
import { useSession, signIn, signOut } from 'next-auth/react';
import ReactGA from 'react-ga4';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function LikeCounter() {
  const { status } = useSession();
  const [likeCount, setLikeCount] = useState(0);
  const [likeIncrements, setLikeIncrements] = useState(0);
  const [oldLikeIncrements, setOldLikeIncrements] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [updateIncrementTimeout, setUpdateIncrementTimeout] =
    useState<ReturnType<typeof setTimeout> | null>(null);
  const [authInterval, setAuthInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [showEmojiTimeout, setShowEmojiTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [emojiVisible, setEmojiVisible] = useState(false);

  useEffect(() => {
    startAuthInterval();
    getLikes();
    window.addEventListener('beforeunload', () => {
      signOut();
    });
  }, []);

  useEffect(() => {
    if (updateIncrementTimeout) clearTimeout(updateIncrementTimeout);
    if (likeIncrements - oldLikeIncrements === 0) {
      return;
    }
    updateLikesInDB();
  }, [likeIncrements]);

  const updateLikesInDB = () => {
    setUpdateIncrementTimeout(
      setTimeout(() => {
        incrementLikesTo(likeIncrements - oldLikeIncrements).then(res => {
          if (res.status === 401) {
            startAuthInterval();
            return;
          }
          if (res.status === 200) {
            setOldLikeIncrements(likeIncrements);
          }
        });
      }, 3000)
    );
  };

  useEffect(() => {
    if (status === 'authenticated' && authInterval) {
      clearInterval(authInterval);
    }
  }, [status]);

  const startAuthInterval = () => {
    setAuthInterval(
      setInterval(() => {
        signIn('credentials', { redirect: false });
      }, 3000)
    );
  };

  const getIncrementsFromLocalStorage = () => {
    let increments = parseInt(
      localStorage.getItem('likeIncrements') || '0',
      10
    );
    if (increments < 0 || increments > 9) {
      increments = 0;
    }
    setOldLikeIncrements(increments);
    return increments;
  };

  const getLikes = () => {
    fetchLikes()
      .then(res => {
        const baseLikes =
          res && typeof res.likes === 'number' && !Number.isNaN(res.likes)
            ? res.likes
            : 0;
        const previousIncrement = getIncrementsFromLocalStorage();
        changeLikeIncrements(previousIncrement);
        setLikeCount(baseLikes + previousIncrement);
      })
      .catch(() => {
        const previousIncrement = getIncrementsFromLocalStorage();
        changeLikeIncrements(previousIncrement);
        setLikeCount(previousIncrement);
      })
      .finally(() => setIsReady(true));
  };

  const changeLikeIncrements = (increment: number) => {
    localStorage.setItem('likeIncrements', increment.toString());
    setLikeIncrements(increment);
  };

  const resetLikes = () => {
    setLikeCount(likeCount - likeIncrements);
    changeLikeIncrements(0);
    setOldLikeIncrements(0);
  };

  const toggleEmoji = () => {
    if (showEmojiTimeout) clearTimeout(showEmojiTimeout);
    setEmojiVisible(true);
    setShowEmojiTimeout(
      setTimeout(() => {
        setEmojiVisible(false);
      }, 2000)
    );
  };

  const updateLikes = () => {
    if (status !== 'authenticated') return;

    toggleEmoji();
    if (likeIncrements >= 9) {
      resetLikes();
      return;
    }
    changeLikeIncrements(likeIncrements + 1);
    setLikeCount(likeCount + 1);
    ReactGA.event({
      category: 'Button.Click',
      action: 'Like Counter',
    });
  };

  const getEmojiBasedOnIncrements = () => {
    switch (likeIncrements) {
      case 0:
        return '😢';
      case 1:
        return '😐';
      case 2:
        return '🙂';
      case 3:
        return '😊';
      case 4:
        return '😄';
      case 5:
        return '😁';
      case 6:
        return '😍';
      case 7:
        return '🥰';
      case 8:
        return '🤩';
      case 9:
        return '🤯';
      default:
        return '😢';
    }
  };

  if (!isReady) {
    return (
      <div
        className="h-9 w-20 animate-pulse rounded-full bg-muted"
        aria-hidden
      />
    );
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-3">
        <Tooltip open={emojiVisible}>
          <TooltipTrigger asChild>
            <Button
              onClick={updateLikes}
              id="like-counter-button"
              data-cursor={true}
              size="icon"
              variant="ghost"
              disabled={status !== 'authenticated'}
              className={cn(
                'relative h-9 w-9 rounded-full bg-background border border-border',
                'overflow-hidden transition-all duration-75 active:scale-95',
                status !== 'authenticated' && 'opacity-60'
              )}
              aria-label="Like this site"
            >
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 z-10 transition-all duration-300',
                  likeIncrements === 9 ? 'bg-primary' : 'bg-primary/80'
                )}
                style={{
                  height: `${
                    ((likeIncrements === 0 ? 0 : likeIncrements + 1) / 10) * 100
                  }%`,
                }}
              />
              <div className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full bg-muted/30">
                <img
                  data-cursor="like-counter-button"
                  src="/images/heart.svg"
                  className="h-5 w-5"
                  alt=""
                />
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="border-0 bg-transparent text-lg shadow-none"
          >
            {getEmojiBasedOnIncrements()}
          </TooltipContent>
        </Tooltip>
        <span
          className={cn(
            'text-sm tabular-nums',
            likeIncrements >= 9 ? 'text-primary font-medium' : 'text-foreground'
          )}
        >
          {formatNumber(likeCount)}
        </span>
      </div>
    </TooltipProvider>
  );
}
