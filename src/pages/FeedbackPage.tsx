import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, TrendingUp } from "lucide-react";

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

interface FeedbackPageProps {
  questionsAndAnswers: QuestionAnswer[];
  onStartNewInterview: () => void;
}

const FeedbackPage = ({ questionsAndAnswers, onStartNewInterview }: FeedbackPageProps) => {
  const averageScore = questionsAndAnswers.length > 0
    ? Math.round(questionsAndAnswers.reduce((sum, qa) => sum + qa.score, 0) / questionsAndAnswers.length)
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 glass border-b border-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-lg font-bold text-white">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Interview Feedback</h1>
            <p className="text-xs text-muted-foreground">Performance Assessment</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Overall Score */}
          <Card className="glass border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Overall Performance</h2>
                <p className="text-muted-foreground">Your interview has been completed and assessed</p>
              </div>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(averageScore)}`}>
                  {averageScore}%
                </div>
                <div className={`text-sm font-semibold ${getScoreColor(averageScore)}`}>
                  {getScoreLabel(averageScore)}
                </div>
              </div>
            </div>
          </Card>

          {/* Question-by-Question Feedback */}
          {questionsAndAnswers.map((qa, index) => (
            <Card key={index} className="glass border-border p-6">
              <div className="space-y-4">
                {/* Question */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Question {index + 1}
                    </h3>
                    <div className={`text-2xl font-bold ${getScoreColor(qa.score)}`}>
                      {qa.score}%
                    </div>
                  </div>
                  <p className="text-muted-foreground">{qa.question}</p>
                </div>

                {/* User's Answer */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Your Answer:</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-foreground">{qa.answer}</p>
                  </div>
                </div>

                {/* Strengths */}
                {qa.feedback.strengths.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <h4 className="text-sm font-semibold text-success">Strengths</h4>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {qa.feedback.strengths.map((strength, i) => (
                        <li key={i} className="text-sm text-foreground list-disc">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {qa.feedback.weaknesses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <h4 className="text-sm font-semibold text-destructive">Areas to Address</h4>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {qa.feedback.weaknesses.map((weakness, i) => (
                        <li key={i} className="text-sm text-foreground list-disc">
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {qa.feedback.improvements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold text-primary">Suggestions for Improvement</h4>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {qa.feedback.improvements.map((improvement, i) => (
                        <li key={i} className="text-sm text-foreground list-disc">
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {/* Start New Interview Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={onStartNewInterview}
              className="h-12 px-8 bg-primary hover:bg-primary-hover text-lg"
            >
              Start New Interview
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackPage;
