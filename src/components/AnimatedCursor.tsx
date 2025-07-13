import { useEffect, useState } from "react";
import { MousePointer } from "lucide-react";

interface AnimatedCursorProps {
  show: boolean;
  onAnimationComplete?: () => void;
}

export function AnimatedCursor({ show, onAnimationComplete }: AnimatedCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!show) return;

    const animateToInput = () => {
      const input = document.querySelector('input[placeholder="Ask anything"]') as HTMLInputElement;
      if (!input) return;

      const rect = input.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;

      setPosition({ x: targetX, y: targetY });
      
      setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 200);
        onAnimationComplete?.();
      }, 1000);
    };

    const timer = setTimeout(animateToInput, 500);
    return () => clearTimeout(timer);
  }, [show, onAnimationComplete]);

  if (!show) return null;

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-all duration-1000 ease-out ${
        isClicking ? 'scale-90' : 'scale-100'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <MousePointer className="w-6 h-6 text-accent drop-shadow-lg" />
    </div>
  );
}