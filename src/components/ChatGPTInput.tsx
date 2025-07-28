import { useState, useRef, useEffect } from "react";
import { ArrowUp, Paperclip, Globe, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatGPTInputProps {
  onSubmit?: (prompt: string) => void;
  disabled?: boolean;
  showAnimation?: boolean;
  animationPrompt?: string;
}

export function ChatGPTInput({ onSubmit, disabled = false, showAnimation = false, animationPrompt = "" }: ChatGPTInputProps) {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    onSubmit?.(prompt);
  };

  // Animation effect for teaching mode
  useEffect(() => {
    if (showAnimation && animationPrompt && inputRef.current) {
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
          if (currentIndex < animationPrompt.length) {
            setPrompt(animationPrompt.slice(0, currentIndex + 1));
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
                  window.location.href = `https://chat.openai.com/?q=${encodeURIComponent(animationPrompt)}`;
                }, 1500);
              }
            }, 500);
          }
        }, 100);
      }, 1500);
    }
  }, [showAnimation, animationPrompt]);

  return (
    <div className="animate-float-in">
      <div className="max-w-3xl w-full mx-auto flex justify-center">
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="bg-card border border-border rounded-3xl shadow-lg py-2 px-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            {/* Input Field */}
            <div className="flex flex-col gap-2 w-full">
  
              <div className="flex items-center w-full rounded-3xl px-4 py-2 bg-transparent">
                <input
                  ref={inputRef}
                  type="text"
                  value={prompt}
                  onChange={(e) => !showAnimation && setPrompt(e.target.value)}
                  placeholder="Ask anything"
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none"
                  disabled={disabled}
                  readOnly={showAnimation}
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="rounded-3xl text-white font-normal border border-[#4c4c4c] hover:bg-white/10 disabled:text-white disabled:opacity-100"
                    disabled={true}
                  >
                    <Paperclip className="w-5 h-5 text-white" />
                    <span className="text-sm text-white">Attach</span>
                  </Button>

                  <Button 
                    type="button" 
                    size="sm" 
                    variant="ghost" 
                    className="rounded-3xl text-white font-normal border border-[#4c4c4c] hover:bg-white/10 disabled:text-white disabled:opacity-100"
                    disabled={disabled}
                  >
                    <Globe className="w-5 h-5 text-white" />
                    <span className="text-sm text-white">Search</span>
                  </Button>
                </div>

                <Button
                  type="submit"
                  data-submit-btn
                  size="sm"
                  className="bg-white text-black w-10 h-10 rounded-full border border-[#4c4c4c] hover:bg-white/10 disabled:text-black disabled:opacity-100 disabled:pointer-events-none flex items-center justify-center"
                  disabled={disabled || !prompt.trim()}
                >
                  <ArrowUp className="w-4 h-4" strokeWidth={3} />
                </Button>
              </div>
            </div>
            </div>
            </div>


        </form>
      </div>
    </div>
  );
}