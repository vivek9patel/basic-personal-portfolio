import Image from 'next/image';

interface MediaProps {
  src: string;
  alt: string;
  caption?: string;
  type?: 'image' | 'video';
}

export function Media({ src, alt, caption, type = 'image' }: MediaProps) {
  return (
    <figure className="space-y-2">
      {type === 'video' ? (
        <video
          src={src}
          controls
          className="w-full rounded-lg border border-border"
        />
      ) : (
        <div className="relative w-full overflow-hidden rounded-lg border border-border">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={630}
            className="w-full h-auto"
          />
        </div>
      )}
      {caption && (
        <figcaption className="text-xs text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
