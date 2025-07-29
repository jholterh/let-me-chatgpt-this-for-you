import { useState } from "react";
import { SimpleInput } from "@/components/SimpleInput";

export function StartScreen() {
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false); // <-- New state

  const handleSubmit = (prompt: string) => {
    const shareableLink = `${window.location.origin}/?q=${encodeURIComponent(prompt.trim())}`;
    setGeneratedLink(shareableLink);
  };

  const handleCreateAnother = () => {
    setGeneratedLink("");
    setCopied(false); // Reset on new link
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      // Handle error (optional: show error feedback)
    }
  };

  if (generatedLink) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-20 pb-8 px-6">
          <div className="max-w-4xl mx-auto space-y-8">
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
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleCreateAnother}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-secondary"
                  >
                    Create Another Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-8 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main ChatGPT Title */}
          <div className="text-center">
            <h1 className="text-5xl font-light text-foreground mb-8 animate-float-in">
              Let me ChatGPT that for you
            </h1>
          </div>
          
          {/* Main Input */}
          <SimpleInput 
            disabled={false}
            onSubmit={handleSubmit}
          />
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Create a shareable link to teach someone how to use ChatGPT
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
