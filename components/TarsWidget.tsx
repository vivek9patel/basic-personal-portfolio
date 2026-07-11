import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import TarsChatPanel from '@/components/tars/TarsChatPanel';
import tarsIcon from '@/images/tars.svg';
import { trackEvent } from '@/lib/analytics';
import { trackTarsOpen } from '@/lib/tars-analytics';

const UBUNTU_URL = 'https://ubuntu.vivek9patel.com';

export default function TarsWidget() {
  const [open, setOpen] = useState(false);

  const handleUbuntuClick = () => {
    trackEvent('ubuntu_boot_click', { location: 'widget' });
    window.open(UBUNTU_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border border-border bg-card hover:bg-accent active:scale-95"
              aria-label="Boot Ubuntu"
              onClick={handleUbuntuClick}
            >
              <img
                src="/images/ubuntu.svg"
                alt=""
                aria-hidden
                className="h-6 w-6"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Boot Ubuntu</TooltipContent>
        </Tooltip>

        <Sheet open={open} onOpenChange={setOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border border-border bg-card hover:bg-accent active:scale-95"
                  aria-label="Open Tars chat"
                  onClick={() => trackTarsOpen('widget')}
                >
                  <div
                    className="h-6 w-6"
                    style={{
                      maskImage: `url(${tarsIcon.src})`,
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      maskSize: 'contain',
                      backgroundColor: 'currentColor',
                    }}
                  />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent side="left">Ask Tars about Vivek</TooltipContent>
          </Tooltip>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md bg-card border border-border p-0 shadow-none flex flex-col"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>TARS</SheetTitle>
            </SheetHeader>
            <TarsChatPanel className="flex-1" location="widget" />
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}
