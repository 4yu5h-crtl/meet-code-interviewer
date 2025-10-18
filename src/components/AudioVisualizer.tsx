import { useEffect, useState } from "react";

interface AudioVisualizerProps {
  isActive?: boolean;
}

const AudioVisualizer = ({ isActive = false }: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(5).fill(20));

  useEffect(() => {
    if (!isActive) {
      setBars(Array(5).fill(20));
      return;
    }

    const interval = setInterval(() => {
      setBars(
        Array(5)
          .fill(0)
          .map(() => Math.random() * 60 + 20)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-1.5 bg-gradient-to-t from-primary to-secondary rounded-full transition-all duration-100 ease-out"
          style={{
            height: `${height}%`,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
