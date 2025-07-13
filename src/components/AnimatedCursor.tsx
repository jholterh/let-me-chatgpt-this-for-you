import { useEffect, useState } from "react";
import { MousePointer } from "lucide-react";

interface AnimatedCursorProps {
  show: boolean;
  onAnimationComplete?: () => void;
}

export function AnimatedCursor({ show, onAnimationComplete }: AnimatedCursorProps) {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100 });
  const [isClicking, setIsClicking] = useState(false);
  const [stage, setStage] = useState<'moving-to-input' | 'clicking-input' | 'typing' | 'moving-to-submit' | 'clicking-submit'>('moving-to-input');

  useEffect(() => {
    if (!show) return;

    const animateSequence = async () => {
      // Stage 1: Move to input field
      await new Promise(resolve => {
        setTimeout(() => {
          const input = document.querySelector('input[placeholder="Ask anything"]') as HTMLInputElement;
          if (!input) return;

          const rect = input.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.top + rect.height / 2;

          setPosition({ x: targetX, y: targetY });
          resolve(void 0);
        }, 500);
      });

      // Stage 2: Click input
      await new Promise(resolve => {
        setTimeout(() => {
          setStage('clicking-input');
          setIsClicking(true);
          setTimeout(() => {
            setIsClicking(false);
            setStage('typing');
            resolve(void 0);
          }, 200);
        }, 1000);
      });

      // Stage 3: Wait for typing to complete (handled in ChatGPTInput)
      onAnimationComplete?.();
    };

    animateSequence();
  }, [show, onAnimationComplete]);

  // Function to move to submit button (called from ChatGPTInput after typing)
  useEffect(() => {
    if (stage === 'typing') {
      const moveToSubmit = () => {
        setTimeout(() => {
          const submitBtn = document.querySelector('[data-submit-btn]') as HTMLButtonElement;
          if (!submitBtn) return;

          const rect = submitBtn.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.top + rect.height / 2;

          setPosition({ x: targetX, y: targetY });
          setStage('moving-to-submit');
          
          setTimeout(() => {
            setStage('clicking-submit');
            setIsClicking(true);
            setTimeout(() => setIsClicking(false), 200);
          }, 500);
        }, 500);
      };

      // Listen for typing completion
      const checkTypingComplete = setInterval(() => {
        const input = document.querySelector('input[placeholder="Ask anything"]') as HTMLInputElement;
        if (input && input.value.length > 0) {
          clearInterval(checkTypingComplete);
          moveToSubmit();
        }
      }, 100);

      return () => clearInterval(checkTypingComplete);
    }
  }, [stage]);

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