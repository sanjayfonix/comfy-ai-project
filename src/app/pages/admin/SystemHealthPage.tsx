import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Activity, Zap, XCircle, Users, Cpu } from 'lucide-react';

interface HealthData {
  activeJobs: number;
  failedJobsLast24h: number;
  totalJobsLast24h: number;
  activeTenants: number;
  queueLength: number;
  gpuStatus: string;
}

// Mock data generator for demo purposes
const generateMockHealth = (): HealthData => ({
  activeJobs: Math.floor(Math.random() * 50) + 10,
  failedJobsLast24h: Math.floor(Math.random() * 15),
  totalJobsLast24h: Math.floor(Math.random() * 1000) + 500,
  activeTenants: 5,
  queueLength: Math.floor(Math.random() * 20),
  gpuStatus: 'Healthy',
});

export default function SystemHealthPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchHealth = () => {
    // Simulate API call with mock data
    setTimeout(() => {
      setHealth(generateMockHealth());
      setLoading(false);
    }, 300);
  };

  if (loading || !health) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#979797]">Loading system health...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Active Jobs',
      value: health.activeJobs,
      icon: Zap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Failed Jobs (24h)',
      value: health.failedJobsLast24h,
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Total Jobs (24h)',
      value: health.totalJobsLast24h,
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Tenants',
      value: health.activeTenants,
      icon: Users,
      color: 'text-black',
      bgColor: 'bg-[#eeeeee]',
    },
    {
      title: 'Queue Length',
      value: health.queueLength,
      icon: Activity,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'GPU Status',
      value: health.gpuStatus,
      icon: Cpu,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Health</h1>
        <p className="text-[#666666]">Real-time system monitoring and status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-[#979797]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#666666] mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-[#979797]">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <p className="text-lg font-medium">All systems operational</p>
          </div>
          <p className="text-sm text-[#666666] mt-2">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}