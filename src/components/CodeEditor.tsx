import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, Copy, RotateCcw, Maximize2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`// Write your code here
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`);

  const [output, setOutput] = useState("");

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];

  const handleRun = () => {
    setOutput("// Output will appear here after execution");
    toast.success("Code execution simulated");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleReset = () => {
    setCode(`// Write your code here\n`);
    setOutput("");
  };

  return (
    <div className="flex flex-col h-full bg-background-subtle border-l border-border">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card glass">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">Code Editor</h3>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-40 h-9 glass border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-border/50 backdrop-blur-md">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-9 gap-2 hover:bg-muted"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 gap-2 hover:bg-muted"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleRun}
            className="h-9 gap-2 bg-primary hover:bg-primary-hover"
          >
            <Play className="h-4 w-4" />
            Run
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="60%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "JetBrains Mono, Fira Code, monospace",
            minimap: { enabled: true },
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            folding: true,
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
          }}
        />

        {/* Output Section */}
        <div className="h-[40%] border-t border-border bg-background flex flex-col">
          <div className="px-4 py-2 border-b border-border bg-card glass">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Output
            </span>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <pre className="text-sm text-muted-foreground font-mono">
              {output || "// Run your code to see output"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
