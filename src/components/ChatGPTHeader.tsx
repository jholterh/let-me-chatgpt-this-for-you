import { ChevronDown } from "lucide-react";

export function ChatGPTHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background">
      <div className="flex items-center gap-1">
        <span className="text-foreground font-medium text-lg">Let me ChatGPT that for you</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </header>
  );
}