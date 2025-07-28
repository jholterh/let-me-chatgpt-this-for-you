import { useEffect, useRef } from "react";
import { ChatGPTInput } from "@/components/ChatGPTInput";
import { AnimatedCursor } from "@/components/AnimatedCursor";

interface AnimationScreenProps {
  prompt: string;
}

export function AnimationScreen({ prompt }: AnimationScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Animation effect for teaching mode
  useEffect(() => {
    if (prompt && inputRef.current) {
      const input = inputRef.current;
      let currentIndex = 0;
      
      // Focus the input after a delay
      setTimeout(() => {
        input.focus();
        input.click();
      }, 1000);

      // Type the prompt character by character
      setTimeout(() => {
        const typeInterval = setInterval(() => {
          if (currentIndex < prompt.length) {
            // We'll handle the typing in ChatGPTInput component
            currentIndex++;
          } else {
            clearInterval(typeInterval);
            // Click submit button after typing is complete
            setTimeout(() => {
              const submitBtn = document.querySelector('[data-submit-btn]') as HTMLButtonElement;
              if (submitBtn) {
                submitBtn.click();
                // Redirect after brief pause
                setTimeout(() => {
                  window.location.href = `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
                }, 1500);
              }
            }, 500);
          }
        }, 100);
      }, 1500);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-background demo-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background">
        <div className="flex items-center gap-1">
          <span className="text-foreground font-medium text-lg">ChatGPT</span>
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
            Log in
          </button>
          <button className="px-4 py-2 border border-border text-foreground hover:bg-muted rounded-lg transition-colors">
            Sign up for free
          </button>
          <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
            ?
          </button>
        </div>
      </header>
      
      <AnimatedCursor 
        show={true} 
        onAnimationComplete={() => {
          // Animation completed, continue with typing
        }}
      />
      
      <main className="pt-20 px-6 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center -mt-20">
          {/* Main ChatGPT Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-light text-foreground animate-float-in">
              ChatGPT
            </h1>
          </div>
          {/* Main Input - much wider */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl">
              <ChatGPTInput 
                showAnimation={true}
                animationPrompt={prompt}
                disabled={true}
              />
            </div>
          </div>
        </div>
        {/* Footer - positioned at bottom */}
        <div className="text-center pb-8">
          <p className="text-xs text-muted-foreground">
            By messaging ChatGPT, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">Terms</a>
            {" "}and have read our{" "}
            <a href="#" className="underline hover:text-foreground">Privacy Policy</a>
            . See{" "}
            <a href="#" className="underline hover:text-foreground">Cookie Preferences</a>.
          </p>
        </div>
      </main>
    </div>
  );
} 