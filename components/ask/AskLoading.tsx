import tarsIcon from '@/images/tars.svg';

export default function AskLoading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        <div
          className="relative flex h-16 w-16 items-center justify-center border border-border bg-card shadow-[4px_4px_0px_0px_var(--border)]"
          aria-hidden
        >
          <div
            className="h-8 w-8 text-foreground"
            style={{
              maskImage: `url(${tarsIcon.src})`,
              WebkitMaskImage: `url(${tarsIcon.src})`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              backgroundColor: 'currentColor',
            }}
          />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary animate-pulse" />
          <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-primary/60" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-tight text-foreground">
            Booting TARS
          </p>
          <p className="text-xs text-muted-foreground">
            Loading generative UI answer engine…
          </p>
        </div>
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/70 animate-pulse [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
