import { ChevronDown } from "lucide-react";

export function ChatGPTHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-2">
        <span className="text-foreground font-medium">ChatGPT</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <div className="flex items-center gap-4">
        {/* Intentionally empty to match ChatGPT design */}
      </div>
    </header>
  );
}