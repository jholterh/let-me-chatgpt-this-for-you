import { useEffect, useState } from "react";
import { StartScreen } from "@/components/StartScreen";
import { AnimationScreen } from "@/components/AnimationScreen";

const Index = () => {
  const [prompt, setPrompt] = useState<string | null>(null);

  useEffect(() => {
    // Check if this is a shared link with a prompt
    const urlParams = new URLSearchParams(window.location.search);
    const urlPrompt = urlParams.get('q');
    
    if (urlPrompt) {
      // This is a shared link - show the animation screen
      setPrompt(urlPrompt);
    }
  }, []);

  // Show animation screen if there's a prompt, otherwise show start screen
  if (prompt) {
    return <AnimationScreen prompt={prompt} />;
  }

  return <StartScreen />;
};

export default Index;
