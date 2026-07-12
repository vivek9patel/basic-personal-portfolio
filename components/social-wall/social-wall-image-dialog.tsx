import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { SocialWallImageItem } from '@/interfaces/social-wall.interface';

interface SocialWallImageDialogProps {
  item: SocialWallImageItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SocialWallImageDialog({
  item,
  open,
  onOpenChange,
}: SocialWallImageDialogProps) {
  if (!item) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{item.alt}</DialogTitle>
          {item.caption ? (
            <DialogDescription className="text-sm text-foreground">
              {item.caption}
            </DialogDescription>
          ) : (
            <DialogDescription className="sr-only">
              {item.alt}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
