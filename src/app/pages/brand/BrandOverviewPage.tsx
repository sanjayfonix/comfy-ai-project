import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { TrendingUp, Zap, Clock, Shirt } from 'lucide-react';

interface Stats {
  tryOnsThisMonth: number;
  successRate: number;
  avgLatency: number;
  activeGarments: number;
}

interface Job {
  id: string;
  status: string;
  created_at: string;
  garments?: {
    name: string;
    category: string;
  };
}

// Mock data for demo purposes
const mockStats: Stats = {
  tryOnsThisMonth: 1247,
  successRate: 98,
  avgLatency: 1850,
  activeGarments: 34,
};

const mockRecentActivity: Job[] = [
  {
    id: 'job_a1b2c3d4e5f6g7h8',
    status: 'completed',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    garments: { name: 'Classic White T-Shirt', category: 'Tops' },
  },
  {
    id: 'job_b2c3d4e5f6g7h8i9',
    status: 'completed',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    garments: { name: 'Slim Fit Jeans', category: 'Bottoms' },
  },
  {
    id: 'job_c3d4e5f6g7h8i9j0',
    status: 'processing',
    created_at: new Date(Date.now() - 10800000).toISOString(),
    garments: { name: 'Summer Dress', category: 'Dresses' },
  },
  {
    id: 'job_d4e5f6g7h8i9j0k1',
    status: 'completed',
    created_at: new Date(Date.now() - 14400000).toISOString(),
    garments: { name: 'Leather Jacket', category: 'Outerwear' },
  },
  {
    id: 'job_e5f6g7h8i9j0k1l2',
    status: 'completed',
    created_at: new Date(Date.now() - 18000000).toISOString(),
    garments: { name: 'Running Shoes', category: 'Footwear' },
  },
];

export default function BrandOverviewPage() {
  const [stats, setStats] = useState<Stats>(mockStats);
  const [recentActivity, setRecentActivity] = useState<Job[]>(mockRecentActivity);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    {
      title: 'Try-Ons This Month',
      value: stats.tryOnsThisMonth,
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Avg Latency',
      value: `${stats.avgLatency}ms`,
      icon: Clock,
      color: 'text-black',
      bgColor: 'bg-[#eeeeee]',
    },
    {
      title: 'Active Garments',
      value: stats.activeGarments,
      icon: Shirt,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#666666]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-[#666666]">Monitor your virtual try-on platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-2 border-[#eeeeee]">
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

      {/* Recent Activity */}
      <Card className="border-2 border-[#eeeeee]">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-center text-[#666666] py-8">No recent activity</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#eeeeee]">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Job ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Garment</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((job) => (
                      <tr key={job.id} className="border-b border-[#eeeeee] last:border-0">
                        <td className="py-3 px-4 text-sm font-mono">{job.id.substring(0, 8)}...</td>
                        <td className="py-3 px-4 text-sm">
                          {job.garments?.name || 'N/A'}
                          <span className="text-[#666666] ml-2">({job.garments?.category})</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#666666]">
                          {new Date(job.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}