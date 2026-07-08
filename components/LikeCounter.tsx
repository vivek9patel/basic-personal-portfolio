import { useEffect, useRef, useState } from 'react';
import { fetchLikes, incrementLikesTo, formatNumber } from '@/helpers/helpers';
import { getSession, signIn, useSession } from 'next-auth/react';
import ReactGA from 'react-ga4';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const VISITOR_CREDENTIALS = {
  username: 'visitor',
  password: 'visitor',
};

async function ensureSession(): Promise<boolean> {
  if (await getSession()) {
    return true;
  }

  const result = await signIn('credentials', {
    ...VISITOR_CREDENTIALS,
    redirect: false,
  });

  if (!result?.ok) {
    return false;
  }

  return !!(await getSession());
}

export default function LikeCounter() {
  const { status } = useSession();
  const [likeCount, setLikeCount] = useState(0);
  const [likeIncrements, setLikeIncrements] = useState(0);
  const [oldLikeIncrements, setOldLikeIncrements] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const updateIncrementTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const showEmojiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const likeIncrementsRef = useRef(likeIncrements);
  const oldLikeIncrementsRef = useRef(oldLikeIncrements);

  useEffect(() => {
    likeIncrementsRef.current = likeIncrements;
  }, [likeIncrements]);

  useEffect(() => {
    oldLikeIncrementsRef.current = oldLikeIncrements;
  }, [oldLikeIncrements]);

  const persistIncrements = async (delta: number) => {
    if (delta <= 0) {
      return false;
    }

    const authed = await ensureSession();
    if (!authed) {
      return false;
    }

    let res = await incrementLikesTo(delta);

    if (res.status === 401) {
      const reauthed = await ensureSession();
      if (!reauthed) {
        return false;
      }
      res = await incrementLikesTo(delta);
    }

    if (res.status === 200) {
      setOldLikeIncrements(likeIncrementsRef.current);
      return true;
    }

    return false;
  };

  useEffect(() => {
    const init = async () => {
      await ensureSession();
      getLikes();
    };

    init();

    return () => {
      if (updateIncrementTimeoutRef.current) {
        clearTimeout(updateIncrementTimeoutRef.current);
      }
      if (showEmojiTimeoutRef.current) {
        clearTimeout(showEmojiTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (updateIncrementTimeoutRef.current) {
      clearTimeout(updateIncrementTimeoutRef.current);
    }

    const delta = likeIncrements - oldLikeIncrements;
    if (delta === 0) {
      return;
    }

    updateIncrementTimeoutRef.current = setTimeout(() => {
      persistIncrements(delta);
    }, 3000);
  }, [likeIncrements, oldLikeIncrements]);

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
    if (showEmojiTimeoutRef.current) {
      clearTimeout(showEmojiTimeoutRef.current);
    }
    setEmojiVisible(true);
    showEmojiTimeoutRef.current = setTimeout(() => {
      setEmojiVisible(false);
    }, 2000);
  };

  const updateLikes = async () => {
    const authed = await ensureSession();
    if (!authed) {
      return;
    }

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
      <Tooltip open={emojiVisible ? true : undefined}>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-3" data-cursor={true}>
            <Button
              onClick={updateLikes}
              id="like-counter-button"
              data-cursor={true}
              size="icon"
              variant="ghost"
              disabled={status === 'loading'}
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
            <span
              className={cn(
                'text-sm tabular-nums',
                likeIncrements >= 9
                  ? 'text-primary font-medium'
                  : 'text-foreground'
              )}
            >
              {formatNumber(likeCount)}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className={
            emojiVisible
              ? 'border-0 bg-transparent text-lg shadow-none'
              : 'max-w-xs text-center'
          }
        >
          {emojiVisible
            ? getEmojiBasedOnIncrements()
            : 'Like this if you enjoyed the site. It means a lot.'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
