import { useState, useRef, useEffect } from "react";
import { Paperclip, Globe, Mic, ArrowUp, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ChatGPTInputProps {
  onSubmit?: (prompt: string) => void;
  disabled?: boolean;
  showAnimation?: boolean;
  animationPrompt?: string;
}

export function ChatGPTInput({ onSubmit, disabled = false, showAnimation = false, animationPrompt = "" }: ChatGPTInputProps) {
  const [prompt, setPrompt] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // Generate shareable link
    const shareableLink = `${window.location.origin}/?q=${encodeURIComponent(prompt.trim())}`;
    setGeneratedLink(shareableLink);
    
    onSubmit?.(prompt);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share this link to show someone how to use ChatGPT.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
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

  if (generatedLink) {
    return (
      <div className="animate-float-in">
        <div className="chatgpt-card p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Link is Ready!</h3>
          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-2">Share this link:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-1 bg-transparent text-sm text-foreground select-all"
              />
              <Button
                onClick={handleCopyLink}
                size="sm"
                className="flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={() => {
                setGeneratedLink("");
                setPrompt("");
              }}
              variant="outline"
            >
              Create Another Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-float-in">
      <form onSubmit={handleSubmit} className="chatgpt-card p-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <Button type="button" className="chatgpt-button" disabled={disabled}>
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <Button type="button" className="chatgpt-button" disabled={disabled}>
            <Globe className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => !showAnimation && setPrompt(e.target.value)}
              placeholder="Ask anything"
              className="chatgpt-input w-full pr-12"
              disabled={disabled}
              readOnly={showAnimation}
            />
            <Button
              type="submit"
              data-submit-btn
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-accent-foreground p-2 rounded-lg transition-all duration-200"
              disabled={disabled || !prompt.trim()}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
          
          <Button type="button" className="chatgpt-button" disabled={disabled}>
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}