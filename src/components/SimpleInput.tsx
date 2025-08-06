import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimpleInputProps {
  onSubmit?: (prompt: string) => void;
  disabled?: boolean;
}

export function SimpleInput({ onSubmit, disabled = false }: SimpleInputProps) {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize logic
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit?.(prompt);
    setPrompt(""); // Optional: clear after submit
  };

  // Handle Enter and Shift+Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim()) {
        onSubmit?.(prompt);
        setPrompt(""); // Optional: clear after submit
      }
    }
    // Shift+Enter will naturally insert a new line, so no need to handle it
  };

  return (
    <div className="animate-float-in">
      <div className="max-w-3xl w-full mx-auto flex justify-center">
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="bg-card border border-border rounded-3xl shadow-lg p-4 w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 relative w-full">
                <textarea
                  ref={inputRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything"
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base pr-12 py-2 border-none outline-none resize-none"
                  disabled={disabled}
                  rows={1}
                  style={{
                    minHeight: "2.5rem",
                    maxHeight: "8rem",
                    overflowY: "auto",
                    lineHeight: "1.5",
                    transition: "height 0.1s",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-50"
                  disabled={disabled || !prompt.trim()}
                >
                  <ArrowUp className="w-4 h-4 text-primary-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
