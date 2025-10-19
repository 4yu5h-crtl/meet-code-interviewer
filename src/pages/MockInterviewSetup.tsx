import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Play } from 'lucide-react';

const MockInterviewSetup = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState([30]);
  const [interviewType, setInterviewType] = useState('technical');

  const handleStartInterview = () => {
    // Store settings and navigate to interview
    navigate('/interview');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Mock Interview Setup</h2>
        <p className="text-muted-foreground mt-1">Configure your practice interview session</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resume / CV</CardTitle>
          <CardDescription>Upload your resume for tailored interview questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Drag and drop your resume, or click to browse</p>
            <Input type="file" className="hidden" id="resume-upload" accept=".pdf,.doc,.docx" />
            <Button variant="outline" onClick={() => document.getElementById('resume-upload')?.click()}>
              Choose File
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interview Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Interview Type</Label>
            <Tabs value={interviewType} onValueChange={setInterviewType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="hr">HR</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">AI Platform</Label>
              <Select defaultValue="gemini">
                <SelectTrigger id="platform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini">Gemini Pro</SelectItem>
                  <SelectItem value="gpt">GPT-4</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role / Domain</Label>
              <Select defaultValue="developer">
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Software Developer</SelectItem>
                  <SelectItem value="pm">Product Manager</SelectItem>
                  <SelectItem value="data">Data Scientist</SelectItem>
                  <SelectItem value="designer">UI/UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="english">
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Duration</Label>
                <span className="text-sm text-muted-foreground">{duration[0]} minutes</span>
              </div>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={15}
                max={60}
                step={15}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium">Additional Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="camera">Enable Camera</Label>
                <Switch id="camera" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="mic">Enable Microphone</Label>
                <Switch id="mic" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="captions">Enable Captions</Label>
                <Switch id="captions" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleStartInterview} size="lg" className="flex-1">
          <Play className="mr-2 h-4 w-4" />
          Start Interview
        </Button>
      </div>
    </div>
  );
};

export default MockInterviewSetup;
