import { useEffect, useState } from 'react';

export default function Cursor() {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    width: '32px',
    height: '32px',
    borderRadius: '100%',
    hoveredOver: false,
    hideDot: false,
    scrolling: false,
  });

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', cursorScroll);
    window.addEventListener('click', checkCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', cursorScroll);
      window.removeEventListener('click', checkCursor);
    };
  }, []);

  const moveCursor = (e: MouseEvent) => {
    let width = '32px',
      height = '32px',
      borderRadius = '100%',
      x = e.clientX - 16,
      y = e.clientY - 16,
      hoveredOver = false;

    let hoveredElement: Element | null | undefined = document.elementFromPoint(
      e.clientX,
      e.clientY
    );
    let dataCursor = hoveredElement?.getAttribute('data-cursor');
    if (dataCursor) {
      // If the element has data-cursor but it's not "true", look for a parent with data-cursor="true"
      // Otherwise, use the current element if it has any data-cursor value
      if (dataCursor !== 'true') {
        const parentWithTrueCursor =
          hoveredElement?.closest(`[data-cursor="true"]`);
        if (parentWithTrueCursor) {
          hoveredElement = parentWithTrueCursor;
        }
        // If no parent with data-cursor="true" exists, still use the current element
      }

      if (!hoveredElement) return;
      const computedStyle = window.getComputedStyle(hoveredElement);
      const boundingRect = hoveredElement.getBoundingClientRect();
      width = boundingRect.width + 'px';
      height = boundingRect.height + 'px';
      borderRadius = computedStyle.borderRadius || '100%';
      if (borderRadius === '0px') {
        borderRadius = '4px';
      }
      x = boundingRect.x;
      y = boundingRect.y;
      hoveredOver = true;
    }
    setCursor({
      x,
      y,
      width,
      height,
      borderRadius,
      hoveredOver,
      hideDot: false,
      scrolling: false,
    });
  };

  const cursorScroll = () => {
    if (cursor.hoveredOver) return;
    // setCursor({
    //   x: 0,
    //   y: 60,
    //   width: window.innerWidth + "px",
    //   height: 4 + "px",
    //   borderRadius: "0",
    //   hoveredOver: false,
    //   scrolling: true,
    //   hideDot: false,
    // });
    resetCursor();
  };

  const checkCursor = (e: MouseEvent) => {
    let hoveredElement: Element | null | undefined = document.elementFromPoint(
      e.clientX,
      e.clientY
    );
    let dataFocusableCursor = hoveredElement?.getAttribute(
      'data-cursor-focusable'
    );
    if (dataFocusableCursor && hoveredElement) {
      const computedStyle = window.getComputedStyle(hoveredElement);
      const boundingRect = hoveredElement.getBoundingClientRect();
      let borderRadius = computedStyle.borderRadius || '100%';
      if (borderRadius === '0px') {
        borderRadius = '4px';
      }
      setCursor({
        x: boundingRect.x,
        y: boundingRect.y,
        width: boundingRect.width + 'px',
        height: boundingRect.height + 'px',
        borderRadius,
        hoveredOver: true,
        hideDot: true,
        scrolling: false,
      });
    } else resetCursor();
  };

  const resetCursor = () => {
    setCursor(prev => {
      return {
        ...prev,
        width: '32px',
        height: '32px',
        borderRadius: '100%',
        hoveredOver: false,
      };
    });
  };

  return (
    <>
      <div
        className={`top-0 left-0 fixed will-change-transform z-[999] pointer-events-none border-2 border-border hidden lg:flex 
        ${
          cursor.hoveredOver || cursor.scrolling
            ? 'duration-300 border-primary'
            : 'duration-150'
        }
        `}
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
          width: cursor.width,
          height: cursor.height,
          borderRadius: cursor.borderRadius,
          transitionProperty:
            'width, height, border-radius, border-color, transform',
          transitionTimingFunction: 'ease-out',
        }}
      />
      {!(cursor.hoveredOver || cursor.hideDot || cursor.scrolling) && (
        <div
          className="fixed w-1 h-1 rounded-full bg-primary z-[999] pointer-events-none hidden md:flex "
          style={{
            transform: `translate3d(${cursor.x + 14}px, ${cursor.y + 14}px, 0)`,
          }}
        />
      )}
    </>
  );
}
