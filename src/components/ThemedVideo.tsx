import { useState, useEffect } from "react";

export function ThemedVideo() {
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
      key={isDark ? "dark" : "light"}
    >
      <source
        src={isDark ? "/assets/example_vid_bright.mp4" : "/assets/example_vid_dark.mp4"}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
}
