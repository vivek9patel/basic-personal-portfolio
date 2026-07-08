import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  pickRandomBannerLayout,
  pickRandomSideBannerLayout,
  SIDE_BANNER_VIEWBOX,
  type BannerLayout,
} from '@/helpers/banner-layouts';

type BannerVariant = 'top' | 'sides';

function BannerGraphic({
  layout,
  viewBox = '0 0 1440 160',
  className,
  mirror = false,
  preserveAspectRatio = 'xMidYMid meet',
}: {
  layout: BannerLayout;
  viewBox?: string;
  className?: string;
  mirror?: boolean;
  preserveAspectRatio?: string;
}) {
  const [, , width] = viewBox.split(' ').map(Number);

  return (
    <svg
      viewBox={viewBox}
      className={cn('w-full h-full', className)}
      preserveAspectRatio={preserveAspectRatio}
    >
      <g
        transform={mirror ? `scale(-1, 1) translate(-${width}, 0)` : undefined}
      >
        <g
          className="text-primary opacity-25"
          stroke="currentColor"
          strokeWidth="0.75"
          fill="none"
        >
          {layout.lines.map((line, i) => (
            <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
          ))}
        </g>
        <g className="text-primary" fill="currentColor">
          {layout.nodes.map((node, i) => (
            <circle key={i} cx={node.x} cy={node.y} r={node.r ?? 2.5} />
          ))}
        </g>
      </g>
    </svg>
  );
}

function SideBanner({
  layout,
  side,
}: {
  layout: BannerLayout;
  side: 'left' | 'right';
}) {
  return (
    <div
      className={cn(
        'fixed top-0 z-0 hidden xl:block h-screen w-20 pointer-events-none select-none',
        side === 'left' ? 'left-0' : 'right-0'
      )}
      aria-hidden="true"
    >
      <BannerGraphic
        layout={layout}
        viewBox={SIDE_BANNER_VIEWBOX}
        mirror={side === 'right'}
      />
    </div>
  );
}

export default function Banner({
  variant = 'top',
}: {
  variant?: BannerVariant;
}) {
  const [topLayout] = useState(() => pickRandomBannerLayout());
  const [sideLayout] = useState(() => pickRandomSideBannerLayout());

  if (variant === 'sides') {
    return (
      <>
        <SideBanner layout={sideLayout} side="left" />
        <SideBanner layout={sideLayout} side="right" />
      </>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative left-1/2 w-screen -translate-x-1/2 h-44 sm:h-40 md:h-48 select-none overflow-hidden"
    >
      <BannerGraphic layout={topLayout} preserveAspectRatio="xMidYMid slice" />
    </div>
  );
}
