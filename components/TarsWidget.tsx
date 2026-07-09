import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import TarsChatPanel from '@/components/tars/TarsChatPanel';
import { trackTarsOpen } from '@/lib/tars-analytics';

export default function TarsWidget() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-40 border border-border bg-card hover:bg-accent active:scale-95"
          aria-label="Open Tars chat"
          onClick={() => trackTarsOpen('widget')}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </SheetTrigger>
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
  );
}
