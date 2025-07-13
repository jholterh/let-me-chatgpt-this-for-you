import { useEffect, useState } from "react";
import { ChatGPTHeader } from "@/components/ChatGPTHeader";
import { ChatGPTInput } from "@/components/ChatGPTInput";
import { AnimatedCursor } from "@/components/AnimatedCursor";

const Index = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPrompt, setAnimationPrompt] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Check if this is a shared link with a prompt
    const urlParams = new URLSearchParams(window.location.search);
    const prompt = urlParams.get('q');
    
    if (prompt) {
      // This is a shared link - show the teaching animation
      setAnimationPrompt(prompt);
      setShowAnimation(true);
      setShowCursor(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ChatGPTHeader />
      
      {showAnimation && (
        <div className="fixed top-80 left-0 right-0 z-40 flex items-center justify-center p-4">
          <div className="text-center bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground">
              See how easy it is to use ChatGPT!
            </p>
          </div>
        </div>
      )}
      
      <AnimatedCursor 
        show={showCursor} 
        onAnimationComplete={() => {
          // Animation completed, continue with typing
        }}
      />
      
      <main className="pt-20 pb-8 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main ChatGPT Title */}
          <div className="text-center">
            <h1 className="text-5xl font-light text-foreground mb-8 animate-float-in">
              ChatGPT
            </h1>
          </div>
          
          {/* Main Input */}
          <ChatGPTInput 
            showAnimation={showAnimation}
            animationPrompt={animationPrompt}
            disabled={showAnimation}
          />
          
          {!showAnimation && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Create a shareable link to teach someone how to use ChatGPT
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
