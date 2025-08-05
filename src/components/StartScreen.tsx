import { useState, useEffect } from "react";
import { SimpleInput } from "@/components/SimpleInput";
import PromoSection from "@/components/Langdock"; // adjust the import path as needed

function ThemedVideo() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(match.matches);
    const handler = (e) => setIsDark(e.matches);
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  return (
    <video
      width="560"
      height="315"
      autoPlay
      loop
      muted
      playsInline
      className="rounded-lg shadow-lg"
      key={isDark ? "dark" : "light"} // forces re-render when theme changes
    >
      <source
        src={isDark ? "/assets/example_vid_bright.mp4" : "/assets/example_vid_dark.mp4"}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
}

export function StartScreen() {
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (prompt: string) => {
    const shareableLink = `${window.location.origin}/?q=${encodeURIComponent(prompt.trim())}`;
    setGeneratedLink(shareableLink);
  };

  const handleCreateAnother = () => {
    setGeneratedLink("");
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Optionally show error feedback
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
                      className="flex-1 bg-transparent text-sm text-foreground select-all cursor-pointer"
                      onClick={handleCopy}
                      title="Click to copy"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  {copied && (
                    <div className="text-xs text-green-600 mt-2 transition-opacity">
                      Link copied to clipboard!
                    </div>
                  )}
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
          <div className="text-center">
            <h1 className="text-5xl font-light text-foreground mb-8 animate-float-in">
              Let me ChatGPT this for you
            </h1>
          </div>
          <SimpleInput disabled={false} onSubmit={handleSubmit} />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Create a shareable link to teach someone how to use ChatGPT
            </p>
          </div>
          <div className="flex flex-col items-center mt-8">
            <ThemedVideo />
            <PromoSection />
          </div>
        </div>
      </main>
    </div>
  );
}
