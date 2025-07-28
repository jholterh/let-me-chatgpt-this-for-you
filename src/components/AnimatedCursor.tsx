import { useEffect, useState, useRef } from "react";

interface AnimatedCursorProps {
  show: boolean;
  onAnimationComplete?: () => void;
}

export function AnimatedCursor({ show, onAnimationComplete }: AnimatedCursorProps) {
  const [cursorType, setCursorType] = useState<"pointer" | "text" | "default">("default");
  const [stage, setStage] = useState<
    "moving-to-input" | "typing" | "typing-complete" | "moving-to-arrow" | "clicking-arrow"
  >("moving-to-input");
  const [shouldShow, setShouldShow] = useState(true); // Controls cursor visibility
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!show) return;

    const input = document.querySelector('input[placeholder="Ask anything"]') as HTMLInputElement;
    const submitBtn = document.querySelector('[data-submit-btn]') as HTMLButtonElement;

    if (!input || !submitBtn) return;

    // Get bounding boxes and styles dynamically
    const inputRect = input.getBoundingClientRect();
    const submitRect = submitBtn.getBoundingClientRect();
    const computedStyle = getComputedStyle(input);
    const paddingLeft = parseFloat(computedStyle.paddingLeft || "0");
    const paddingTop = parseFloat(computedStyle.paddingTop || "0");
    const fontSize = parseFloat(computedStyle.fontSize || "16");
    const lineHeight =
      computedStyle.lineHeight === "normal" ? fontSize * 1.2 : parseFloat(computedStyle.lineHeight);

    // Dynamic positions
    const startX = inputRect.left - 10; // Slightly above and to the left of the input box
    const startY = inputRect.top - 10;
    const textStartX = inputRect.left + paddingLeft - 15; // Exact left edge of the text field
    const textStartY = inputRect.top + paddingTop + lineHeight / 2 - 20; // Adjusted to align with the text
    const arrowX = submitRect.left + submitRect.width / 2 + 17; // Adjusted for precise horizontal center
    const arrowY = submitRect.top + submitRect.height / 2 - 5; // Vertical center of the arrow button

    // Reset cursor
    setCursorType("default");
    setShouldShow(true);
    setStage("moving-to-input");
    if (cursorRef.current) {
      cursorRef.current.style.left = `${startX}px`;
      cursorRef.current.style.top = `${startY}px`;
    }

    // Animation helpers
    const animate = (
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      duration: number,
      onComplete?: () => void
    ) => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const x = fromX + (toX - fromX) * progress;
        const y = fromY + (toY - fromY) * progress;

        if (cursorRef.current) {
          cursorRef.current.style.left = `${x}px`;
          cursorRef.current.style.top = `${y}px`;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else if (onComplete) {
          onComplete();
        }
      };

      requestAnimationFrame(step);
    };

    // Step 1: Move to input field
    animate(startX, startY, textStartX, textStartY, 1000, () => {
      setCursorType("text");
      setStage("typing");

      // Step 2: Hide cursor during typing
      setTimeout(() => {
        setShouldShow(false);

        // Step 3: Move to submit button after typing
        setTimeout(() => {
          setShouldShow(true);
          setStage("moving-to-arrow");
          animate(textStartX, textStartY, arrowX, arrowY, 1000, () => {
            setCursorType("pointer");
            setStage("clicking-arrow");

            // Step 4: Simulate click
            setTimeout(() => {
              setShouldShow(false);
              onAnimationComplete?.();
            }, 500);
          });
        }, 1000); // Simulate typing duration
      }, 500); // Pause before hiding cursor
    });
  }, [show, onAnimationComplete]);

  if (!show) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 transition-all duration-300 ease-out ${
        shouldShow ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: 0,
        top: 0,
        transform: "translate(-50%, -50%)",
      }}
    >
      {cursorType === "text" ? (
        <div className="w-0.5 h-6 bg-white animate-pulse" />
      ) : cursorType === "pointer" ? (
        <img
          src="/src/components/images/click_icon.png" // Replace with your `click_icon.png` path
          alt="Click Cursor"
          className="w-8 h-8 object-contain"
        />
      ) : (
        <img
          src="/src/components/images/cursor_icon.png" // Replace with your `cursor_icon.webp` path
          alt="Cursor Icon"
          className="w-8 h-8 object-contain"
        />
      )}
    </div>
  );
}
