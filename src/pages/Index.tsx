import CameraFeed from "@/components/CameraFeed";
import AudioVisualizer from "@/components/AudioVisualizer";
import ControlPanel from "@/components/ControlPanel";
import CodeEditor from "@/components/CodeEditor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 glass border-b border-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-lg font-bold text-white">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">GenAI Interview</h1>
            <p className="text-xs text-muted-foreground">Technical Assessment Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 glass rounded-full border border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-foreground">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Video Feeds */}
        <div className="w-2/5 p-6 flex flex-col gap-6">
          {/* User Camera */}
          <div className="flex-1">
            <CameraFeed label="You" isActive={true} />
          </div>

          {/* AI Avatar */}
          <div className="flex-1">
            <CameraFeed label="AI Interviewer" isAI={true} isActive={true}>
              <AudioVisualizer isActive={true} />
            </CameraFeed>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1">
          <CodeEditor />
        </div>
      </main>

      {/* Control Panel */}
      <ControlPanel />
    </div>
  );
};

export default Index;
