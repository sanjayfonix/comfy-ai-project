import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Job {
  id: string;
  status: string;
  created_at: string;
  latency_ms: number | null;
  failure_reason: string | null;
  tenants: { brand_name: string };
  garments: { name: string; category: string };
}

// Mock data for demo purposes
const generateMockJobs = (): Job[] => {
  const brands = ['Hugo Boss', 'Adidas Deutschland', 'Zalando', 'Tom Tailor', 'Peek & Cloppenburg'];
  const garments = [
    { name: 'Summer Dress', category: 'Dresses' },
    { name: 'Casual Jeans', category: 'Pants' },
    { name: 'Sport Jacket', category: 'Outerwear' },
    { name: 'Business Shirt', category: 'Tops' },
    { name: 'Evening Gown', category: 'Dresses' },
  ];
  const statuses = ['completed', 'processing', 'pending', 'failed'];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: `job-${Math.random().toString(36).substr(2, 9)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    latency_ms: Math.random() > 0.2 ? Math.floor(Math.random() * 5000) + 500 : null,
    failure_reason: Math.random() > 0.9 ? 'Invalid image format' : null,
    tenants: { brand_name: brands[Math.floor(Math.random() * brands.length)] },
    garments: garments[Math.floor(Math.random() * garments.length)],
  })).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

export default function AllJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setJobs(generateMockJobs());
      setLoading(false);
    }, 500);
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    setTimeout(() => {
      setJobs(generateMockJobs());
      setLoading(false);
      toast.success('Jobs refreshed');
    }, 500);
  };

  const handleRetry = (jobId: string) => {
    // Update local state
    setJobs(prev => prev.map(j => 
      j.id === jobId ? { ...j, status: 'pending' } : j
    ));
    toast.success('Job queued for retry');
  };

  const getStatusBadge = (status: string) => {
    const config = {
      completed: 'bg-green-600',
      processing: 'bg-blue-600',
      pending: 'bg-yellow-600',
      failed: 'bg-red-600',
    };
    return config[status as keyof typeof config] || config.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#979797]">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Jobs</h1>
          <p className="text-[#666666]">Monitor all virtual try-on jobs across tenants</p>
        </div>
        <Button onClick={fetchJobs} variant="outline" className="gap-2 border-[#979797] hover:bg-[#eeeeee]">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <Card className="border-[#979797]">
        <CardHeader>
          <CardTitle>Recent Jobs ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#979797]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Job ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Tenant</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Garment</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Latency</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Created</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-[#eeeeee] last:border-0">
                    <td className="py-3 px-4">
                      <code className="text-xs bg-[#eeeeee] px-2 py-1 rounded">
                        {job.id.substring(0, 8)}...
                      </code>
                    </td>
                    <td className="py-3 px-4 text-sm">{job.tenants.brand_name}</td>
                    <td className="py-3 px-4 text-sm">{job.garments.name}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusBadge(job.status)}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {job.latency_ms ? `${job.latency_ms}ms` : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#666666]">
                      {new Date(job.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {job.status === 'failed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRetry(job.id)}
                          className="border-[#979797] hover:bg-[#eeeeee]"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Retry
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}