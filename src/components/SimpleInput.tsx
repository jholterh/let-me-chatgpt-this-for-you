import { useState, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimpleInputProps {
  onSubmit?: (prompt: string) => void;
  disabled?: boolean;
}

export function SimpleInput({ onSubmit, disabled = false }: SimpleInputProps) {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    onSubmit?.(prompt);
  };

  return (
    <div className="animate-float-in">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-card border border-border rounded-3xl shadow-lg p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask anything"
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base pr-12 py-2 border-none outline-none"
                  disabled={disabled}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted hover:bg-muted/80 text-foreground p-2 rounded-lg disabled:opacity-50"
                  disabled={disabled || !prompt.trim()}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 