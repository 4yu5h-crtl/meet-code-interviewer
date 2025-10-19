import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Video, History, TrendingUp, Award, Target, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Interviews', value: '0', icon: Video, color: 'text-blue-500' },
    { label: 'Avg Score', value: 'N/A', icon: Target, color: 'text-green-500' },
    { label: 'Improvement', value: '0%', icon: TrendingUp, color: 'text-orange-500' },
    { label: 'Achievements', value: '0', icon: Award, color: 'text-purple-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome back, {user?.name}!</h2>
        <p className="text-muted-foreground mt-1">Ready to ace your next interview?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Jump right into your next practice session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => navigate('/dashboard/mock-interview')}>
              <Video className="mr-2 h-4 w-4" />
              Start New Interview
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard/history')}>
              <History className="mr-2 h-4 w-4" />
              View Past Interviews
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled practice interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">No scheduled interviews</p>
              <Button variant="link" className="mt-2">Schedule one now</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest practice sessions and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <History className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No activity yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start your first mock interview to see your progress here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
