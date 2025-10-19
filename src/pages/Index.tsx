import { useState, useEffect } from "react";
import CameraFeed from "@/components/CameraFeed";
import AudioVisualizer from "@/components/AudioVisualizer";
import ControlPanel from "@/components/ControlPanel";
import CodeEditor from "@/components/CodeEditor";
import FeedbackPage from "@/pages/FeedbackPage";

interface QuestionAnswer {
  question: string;
  answer: string;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
  score: number;
}

const Index = () => {
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<QuestionAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);

  // Simulate AI asking questions (for demo purposes)
  useEffect(() => {
    if (!interviewEnded) {
      const questions = [
        "Tell me about yourself and your experience.",
        "Write code to reverse a string in JavaScript.",
        "What are your greatest strengths?",
        "Implement a function to find the maximum element in an array.",
        "How do you handle challenging situations at work?"
      ];
      
      let questionIndex = 0;
      const interval = setInterval(() => {
        if (questionIndex < questions.length) {
          const question = questions[questionIndex];
          setCurrentQuestion(question);
          
          // Detect coding questions
          const codingKeywords = [
            "write code",
            "implement",
            "solve this problem",
            "code a function",
            "create a function",
            "algorithm",
            "programming",
            "function to"
          ];
          
          const isCodingQuestion = codingKeywords.some(keyword => 
            question.toLowerCase().includes(keyword)
          );
          
          setShowCodeEditor(isCodingQuestion);
          
          // Simulate answer after some time
          setTimeout(() => {
            const mockAnswer = isCodingQuestion 
              ? "function reverse(str) { return str.split('').reverse().join(''); }"
              : "This is a sample answer to the question.";
            
            setCurrentAnswer(mockAnswer);
            
            // Generate mock feedback
            const mockFeedback: QuestionAnswer = {
              question,
              answer: mockAnswer,
              feedback: {
                strengths: [
                  "Clear and concise response",
                  "Good understanding of the concept"
                ],
                weaknesses: [
                  "Could provide more detailed examples",
                  "Consider edge cases"
                ],
                improvements: [
                  "Add more specific examples from your experience",
                  "Explain your thought process in more detail"
                ]
              },
              score: Math.floor(Math.random() * 30) + 70 // Random score 70-100
            };
            
            setQuestionsAndAnswers(prev => [...prev, mockFeedback]);
          }, 8000);
          
          questionIndex++;
        } else {
          clearInterval(interval);
        }
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [interviewEnded]);

  const handleEndInterview = () => {
    setInterviewEnded(true);
  };

  const handleStartNewInterview = () => {
    setInterviewEnded(false);
    setShowCodeEditor(false);
    setQuestionsAndAnswers([]);
    setCurrentQuestion("");
    setCurrentAnswer("");
  };

  if (interviewEnded) {
    return (
      <FeedbackPage 
        questionsAndAnswers={questionsAndAnswers}
        onStartNewInterview={handleStartNewInterview}
      />
    );
  }

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
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Video Tiles Container - Animates based on code editor visibility */}
        <div 
          className={`flex gap-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            showCodeEditor 
              ? 'w-1/3 flex-col' 
              : 'flex-1 flex-row'
          }`}
        >
          {/* User Camera Tile */}
          <div 
            className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              showCodeEditor ? 'h-1/2' : 'flex-1'
            }`}
          >
            <CameraFeed label="You" isActive={true} isCameraOn={isCameraOn} />
          </div>

          {/* AI Interviewer Tile */}
          <div 
            className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              showCodeEditor ? 'h-1/2' : 'flex-1'
            }`}
          >
            <CameraFeed label="AI Interviewer" isAI={true} isActive={true}>
              <AudioVisualizer isActive={true} />
            </CameraFeed>
          </div>
        </div>

        {/* Code Editor - Slides in from the right */}
        <div 
          className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            showCodeEditor 
              ? 'flex-1 opacity-100 translate-x-0' 
              : 'w-0 opacity-0 translate-x-full overflow-hidden'
          }`}
        >
          {showCodeEditor && <CodeEditor />}
        </div>
      </main>

      {/* Control Panel */}
      <ControlPanel 
        onEndInterview={handleEndInterview}
        isCameraOn={isCameraOn}
        onCameraToggle={setIsCameraOn}
      />
    </div>
  );
};

export default Index;
