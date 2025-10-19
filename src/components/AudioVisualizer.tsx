import { useEffect, useState } from "react";

interface AudioVisualizerProps {
  isActive?: boolean;
  showAvatar?: boolean;
  avatarLabel?: string;
}

const AudioVisualizer = ({ isActive = false, showAvatar = false, avatarLabel = "AI" }: AudioVisualizerProps) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isActive) {
      setScale(1);
      return;
    }

    const interval = setInterval(() => {
      // Random scale between 1 and 1.15 for pulsing effect
      setScale(1 + Math.random() * 0.15);
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulsing rings */}
      <div 
        className="absolute w-32 h-32 rounded-full border-4 border-primary/40 transition-all duration-150 ease-out"
        style={{
          transform: `scale(${isActive ? scale : 1})`,
          opacity: isActive ? 0.6 : 0.3,
        }}
      />
      <div 
        className="absolute w-28 h-28 rounded-full border-4 border-secondary/50 transition-all duration-150 ease-out"
        style={{
          transform: `scale(${isActive ? scale * 0.9 : 1})`,
          opacity: isActive ? 0.7 : 0.3,
        }}
      />
      
      {/* Avatar circle */}
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
        <span className="text-4xl font-bold text-white">
          {showAvatar ? avatarLabel.charAt(0).toUpperCase() : "AI"}
        </span>
      </div>

      {/* Inner glow effect */}
      <div 
        className="absolute w-24 h-24 rounded-full bg-primary/20 blur-xl transition-all duration-150"
        style={{
          transform: `scale(${isActive ? scale * 1.2 : 1})`,
          opacity: isActive ? 0.6 : 0,
        }}
      />
    </div>
  );
};

export default AudioVisualizer;
