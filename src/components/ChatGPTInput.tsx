import { useRef, useEffect } from "react";
import { ArrowUp, Paperclip, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatGPTInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit?: (prompt: string) => void;
  disabled?: boolean;
  showAnimation?: boolean;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
}

export function ChatGPTInput({
  prompt,
  setPrompt,
  onSubmit,
  disabled = false,
  showAnimation = false,
  inputRef,
}: ChatGPTInputProps) {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const resolvedRef = inputRef || internalRef;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit?.(prompt);
  };

  // --- Auto-resize logic ---
  function resizeTextarea(textarea: HTMLTextAreaElement | null) {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  useEffect(() => {
    resizeTextarea(resolvedRef.current);
  }, [prompt]);

  useEffect(() => {
    // Also resize on mount in case of pre-filled
    resizeTextarea(resolvedRef.current);
  }, []);

  return (
    <div className="animate-float-in">
      <div className="max-w-3xl w-full mx-auto flex justify-center">
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="bg-card border border-border rounded-3xl shadow-lg py-2 px-4 w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center w-full rounded-3xl px-4 py-2 bg-transparent">
                  <textarea
                    ref={resolvedRef}
                    value={prompt}
                    onChange={(e) => !showAnimation && setPrompt(e.target.value)}
                    placeholder="Ask anything"
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none resize-none"
                    disabled={disabled}
                    readOnly={showAnimation}
                    rows={1}
                    style={{
                      minHeight: "1rem",
                      maxHeight: "8rem",
                      overflowY: "auto",
                      lineHeight: "1.5",
                      transition: "height 0.1s",
                    }}
                  />
                </div>
                {/* ...buttons as before... */}
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
