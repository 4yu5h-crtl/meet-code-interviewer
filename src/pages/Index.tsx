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

          {/* Current Question Display */}
          {currentQuestion && (
            <div className="glass border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-primary mb-2">Current Question:</h3>
              <p className="text-sm text-foreground">{currentQuestion}</p>
            </div>
          )}
        </div>

        {/* Right Panel - Code Editor (Conditional) */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
            showCodeEditor ? 'flex-1 opacity-100' : 'w-0 opacity-0 overflow-hidden'
          }`}
        >
          {showCodeEditor && <CodeEditor />}
        </div>
      </main>

      {/* Control Panel */}
      <ControlPanel onEndInterview={handleEndInterview} />
    </div>
  );
};

export default Index;
