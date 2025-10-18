import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, Monitor, Settings, MoreVertical, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlPanelProps {
  onEndInterview?: () => void;
}

const ControlPanel = ({ onEndInterview }: ControlPanelProps) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const controls = [
    {
      icon: isMicOn ? Mic : MicOff,
      label: isMicOn ? "Mute microphone" : "Unmute microphone",
      isActive: isMicOn,
      onClick: () => setIsMicOn(!isMicOn),
      variant: "default" as const,
    },
    {
      icon: isCameraOn ? Video : VideoOff,
      label: isCameraOn ? "Turn off camera" : "Turn on camera",
      isActive: isCameraOn,
      onClick: () => setIsCameraOn(!isCameraOn),
      variant: "default" as const,
    },
    {
      icon: Monitor,
      label: "Share screen",
      isActive: false,
      onClick: () => console.log("Share screen"),
      variant: "ghost" as const,
    },
    {
      icon: Settings,
      label: "Settings",
      isActive: false,
      onClick: () => console.log("Settings"),
      variant: "ghost" as const,
    },
    {
      icon: MoreVertical,
      label: "More options",
      isActive: false,
      onClick: () => console.log("More options"),
      variant: "ghost" as const,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-strong px-4 py-3 rounded-full shadow-lg">
        <TooltipProvider>
          <div className="flex items-center gap-2">
            {controls.map((control, index) => {
              const Icon = control.icon;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={control.variant}
                      size="icon"
                      onClick={control.onClick}
                      className={`
                        relative h-11 w-11 rounded-full transition-smooth
                        ${
                          control.isActive
                            ? "bg-primary hover:bg-primary-hover text-primary-foreground"
                            : "bg-background-subtle hover:bg-muted text-foreground"
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="glass border-border/50 backdrop-blur-md"
                  >
                    <p className="text-sm">{control.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
            
            {/* End Interview Button */}
            {onEndInterview && (
              <>
                <div className="w-px h-6 bg-border mx-2" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={onEndInterview}
                      className="h-11 w-11 rounded-full"
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="glass border-border/50 backdrop-blur-md"
                  >
                    <p className="text-sm">End Interview</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ControlPanel;
