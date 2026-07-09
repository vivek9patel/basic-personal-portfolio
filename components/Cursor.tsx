import { useEffect, useRef, useState } from 'react';

const TEXT_HOVER_PADDING = 6;

function isTextLikeElement(
  element: Element,
  computedStyle: CSSStyleDeclaration
) {
  const display = computedStyle.display;
  return (
    display === 'inline' ||
    display === 'inline-block' ||
    element.tagName === 'A' ||
    element.tagName === 'SPAN' ||
    element.tagName === 'EM'
  );
}

function getHoveredCursorBounds(element: Element) {
  const computedStyle = window.getComputedStyle(element);
  const boundingRect = element.getBoundingClientRect();
  let borderRadius = computedStyle.borderRadius || '100%';
  if (borderRadius === '0px') {
    borderRadius = '4px';
  }

  const padding = isTextLikeElement(element, computedStyle)
    ? TEXT_HOVER_PADDING
    : 0;

  return {
    x: boundingRect.x - padding,
    y: boundingRect.y - padding,
    width: boundingRect.width + padding * 2 + 'px',
    height: boundingRect.height + padding * 2 + 'px',
    borderRadius,
  };
}

type HoverState = {
  width: string;
  height: string;
  borderRadius: string;
  hoveredOver: boolean;
  hideDot: boolean;
  scrolling: boolean;
};

const DEFAULT_HOVER_STATE: HoverState = {
  width: '32px',
  height: '32px',
  borderRadius: '100%',
  hoveredOver: false,
  hideDot: false,
  scrolling: false,
};

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const hoverStateRef = useRef<HoverState>(DEFAULT_HOVER_STATE);

  const [hoverState, setHoverState] = useState<HoverState>(DEFAULT_HOVER_STATE);

  const applyPosition = (x: number, y: number) => {
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  const schedulePositionUpdate = (x: number, y: number) => {
    positionRef.current = { x, y };
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const { x, y } = positionRef.current;
      applyPosition(x, y);
    });
  };

  const updateHoverState = (next: HoverState) => {
    hoverStateRef.current = next;
    setHoverState(next);
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      let width = '32px',
        height = '32px',
        borderRadius = '100%',
        x = e.clientX - 16,
        y = e.clientY - 16,
        hoveredOver = false;

      let hoveredElement: Element | null | undefined =
        document.elementFromPoint(e.clientX, e.clientY);
      const dataCursor = hoveredElement?.getAttribute('data-cursor');
      if (dataCursor) {
        if (dataCursor !== 'true') {
          const parentWithTrueCursor =
            hoveredElement?.closest(`[data-cursor="true"]`);
          if (parentWithTrueCursor) {
            hoveredElement = parentWithTrueCursor;
          }
        }

        if (!hoveredElement) return;
        const bounds = getHoveredCursorBounds(hoveredElement);
        width = bounds.width;
        height = bounds.height;
        borderRadius = bounds.borderRadius;
        x = bounds.x;
        y = bounds.y;
        hoveredOver = true;
      }

      schedulePositionUpdate(x, y);

      const prev = hoverStateRef.current;
      if (
        prev.width !== width ||
        prev.height !== height ||
        prev.borderRadius !== borderRadius ||
        prev.hoveredOver !== hoveredOver ||
        prev.hideDot ||
        prev.scrolling
      ) {
        updateHoverState({
          width,
          height,
          borderRadius,
          hoveredOver,
          hideDot: false,
          scrolling: false,
        });
      }
    };

    const resetCursor = () => {
      updateHoverState({
        ...hoverStateRef.current,
        width: '32px',
        height: '32px',
        borderRadius: '100%',
        hoveredOver: false,
      });
    };

    const cursorScroll = () => {
      if (hoverStateRef.current.hoveredOver) return;
      resetCursor();
    };

    const checkCursor = (e: MouseEvent) => {
      let hoveredElement: Element | null | undefined =
        document.elementFromPoint(e.clientX, e.clientY);
      const dataFocusableCursor = hoveredElement?.getAttribute(
        'data-cursor-focusable'
      );
      if (dataFocusableCursor && hoveredElement) {
        const bounds = getHoveredCursorBounds(hoveredElement);
        schedulePositionUpdate(bounds.x, bounds.y);
        updateHoverState({
          width: bounds.width,
          height: bounds.height,
          borderRadius: bounds.borderRadius,
          hoveredOver: true,
          hideDot: true,
          scrolling: false,
        });
      } else {
        resetCursor();
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('scroll', cursorScroll, { passive: true });
    window.addEventListener('click', checkCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', cursorScroll);
      window.removeEventListener('click', checkCursor);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`top-0 left-0 fixed will-change-transform z-[999] pointer-events-none border-2 border-border hidden lg:flex 
        ${
          hoverState.hoveredOver || hoverState.scrolling
            ? 'duration-300 border-primary'
            : 'duration-150'
        }
        `}
        style={{
          width: hoverState.width,
          height: hoverState.height,
          borderRadius: hoverState.borderRadius,
          transitionProperty:
            'width, height, border-radius, border-color, transform',
          transitionTimingFunction: 'ease-out',
        }}
      />
      <div
        ref={dotRef}
        className={`fixed w-1 h-1 rounded-full bg-primary z-[999] pointer-events-none hidden md:flex will-change-transform ${
          hoverState.hoveredOver || hoverState.hideDot || hoverState.scrolling
            ? 'opacity-0'
            : 'opacity-100'
        }`}
      />
    </>
  );
}
