import { useEffect, useState, useRef } from "react";

interface AnimatedCursorProps {
  show: boolean;
  typingComplete: boolean; // <-- NEW PROP
  onAnimationComplete?: () => void;
}

export function AnimatedCursor({
  show,
  typingComplete,
  onAnimationComplete,
}: AnimatedCursorProps) {
  const [cursorType, setCursorType] = useState<"pointer" | "text" | "default">("default");
  const [stage, setStage] = useState<
    "moving-to-input" | "typing" | "typing-complete" | "moving-to-arrow" | "clicking-arrow"
  >("moving-to-input");
  const [shouldShow, setShouldShow] = useState(true);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // These refs are needed so the second effect can access the latest positions
  const textStartXRef = useRef(0);
  const textStartYRef = useRef(0);
  const arrowXRef = useRef(0);
  const arrowYRef = useRef(0);

  useEffect(() => {
    if (!show) return;

    const input = document.querySelector('textarea[placeholder="Ask anything"]') as HTMLTextAreaElement;

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
    const startX = inputRect.left - 10;
    const startY = inputRect.top - 10;
    const textStartX = inputRect.left + paddingLeft - 15;
    const textStartY = inputRect.top + paddingTop + lineHeight / 2 - 20;
    const arrowX = submitRect.left + submitRect.width / 2 + 17;
    const arrowY = submitRect.top + submitRect.height / 2 - 5;

    // Save for later use in 2nd effect
    textStartXRef.current = textStartX;
    textStartYRef.current = textStartY;
    arrowXRef.current = arrowX;
    arrowYRef.current = arrowY;

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

    // Step 1: Move to input field (2.5 seconds)
    animate(startX, startY, textStartX, textStartY, 1000, () => {
      setCursorType("text");
      setStage("typing");

      // Step 2: Blink, then hide cursor during typing
      setTimeout(() => {
        setShouldShow(false);
        setStage("typing-complete");
        // Now, WAIT for typingComplete to become true (handled in next effect)
      }, 500); // Pause before hiding cursor
    });
  }, [show]);

  // Step 3: When typing is complete, move to submit button
  useEffect(() => {
    if (!show) return;
    if (stage !== "typing-complete") return;
    if (!typingComplete) return;

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

    setShouldShow(true);
    setStage("moving-to-arrow");
    animate(
      textStartXRef.current,
      textStartYRef.current,
      arrowXRef.current,
      arrowYRef.current,
      1000,
      () => {
        setCursorType("pointer");
        setStage("clicking-arrow");

        // Step 4: Simulate click
        setTimeout(() => {
          setShouldShow(false);
          onAnimationComplete?.();
        }, 500);
      }
    );
  }, [typingComplete, show, stage, onAnimationComplete]);

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
        <div className="w-0.5 h-6 bg-foreground animate-pulse" />
      ) : cursorType === "pointer" ? (
        <img
          src="/assets/click_icon.png"
          alt="Click Cursor"
          className="w-10 h-10 object-contain"
        />
      ) : (
        <img
          src="/assets/cursor_icon.png"
          alt="Cursor Icon"
          className="w-16 h-16 object-contain"
        />
      )}
    </div>
  );
}
