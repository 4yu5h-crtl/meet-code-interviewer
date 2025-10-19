import { User } from "lucide-react";
import AudioVisualizer from "./AudioVisualizer";

interface CameraFeedProps {
  label: string;
  isAI?: boolean;
  isActive?: boolean;
  isCameraOn?: boolean;
  children?: React.ReactNode;
}

const CameraFeed = ({ label, isAI = false, isActive = true, isCameraOn = false, children }: CameraFeedProps) => {
  return (
    <div className="relative w-full h-full glass-strong rounded-xl overflow-hidden group">
      {/* Placeholder content */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-subtle to-muted flex items-center justify-center">
        {isAI ? (
          children
        ) : (
          // User camera off - show avatar with visualizer
          !isCameraOn ? (
            <AudioVisualizer isActive={isActive} showAvatar={true} avatarLabel={label} />
          ) : (
            <User className="w-24 h-24 text-muted-foreground opacity-50" />
          )
        )}
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 glass rounded-lg backdrop-blur-md">
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-success rounded-full shadow-glow animate-pulse" />
      )}

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-smooth pointer-events-none" />
    </div>
  );
};

export default CameraFeed;
