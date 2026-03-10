import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Eye, RefreshCw } from 'lucide-react';

interface Job {
  id: string;
  status: string;
  latency_ms: number | null;
  created_at: string;
  completed_at: string | null;
  failure_reason: string | null;
  result_image_url: string | null;
  garments?: {
    name: string;
    category: string;
  };
}

// Mock data for demo purposes
const mockJobs: Job[] = [
  {
    id: 'job_1a2b3c4d',
    status: 'completed',
    latency_ms: 1850,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    completed_at: new Date(Date.now() - 3500000).toISOString(),
    failure_reason: null,
    result_image_url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200',
    garments: { name: 'Classic White T-Shirt', category: 'Tops' },
  },
  {
    id: 'job_2b3c4d5e',
    status: 'completed',
    latency_ms: 2120,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    completed_at: new Date(Date.now() - 7100000).toISOString(),
    failure_reason: null,
    result_image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200',
    garments: { name: 'Slim Fit Jeans', category: 'Bottoms' },
  },
  {
    id: 'job_3c4d5e6f',
    status: 'processing',
    latency_ms: null,
    created_at: new Date(Date.now() - 300000).toISOString(),
    completed_at: null,
    failure_reason: null,
    result_image_url: null,
    garments: { name: 'Summer Dress', category: 'Dresses' },
  },
  {
    id: 'job_4d5e6f7g',
    status: 'completed',
    latency_ms: 1650,
    created_at: new Date(Date.now() - 14400000).toISOString(),
    completed_at: new Date(Date.now() - 14300000).toISOString(),
    failure_reason: null,
    result_image_url: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=200',
    garments: { name: 'Leather Jacket', category: 'Outerwear' },
  },
  {
    id: 'job_5e6f7g8h',
    status: 'failed',
    latency_ms: null,
    created_at: new Date(Date.now() - 18000000).toISOString(),
    completed_at: new Date(Date.now() - 17900000).toISOString(),
    failure_reason: 'Unable to detect body in uploaded photo',
    result_image_url: null,
    garments: { name: 'Sport Shirt', category: 'Activewear' },
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    const config = {
      completed: { className: 'bg-green-100 text-green-800 border-green-200', label: 'Completed' },
      processing: { className: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Processing' },
      pending: { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      failed: { className: 'bg-red-100 text-red-800 border-red-200', label: 'Failed' },
    };
    return config[status as keyof typeof config] || config.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#666666]">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Try-On Jobs</h1>
          <p className="text-[#666666]">Monitor virtual try-on processing status</p>
        </div>
        <Button
          onClick={() => setJobs([...mockJobs])}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Jobs List */}
      <Card className="border-2 border-[#eeeeee]">
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-center text-[#666666] py-8">No jobs found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#eeeeee]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Job ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Garment</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Latency</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Created</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => {
                    const statusBadge = getStatusBadge(job.status);
                    return (
                      <tr key={job.id} className="border-b border-[#eeeeee] last:border-0">
                        <td className="py-3 px-4 text-sm font-mono">{job.id.substring(0, 12)}...</td>
                        <td className="py-3 px-4 text-sm">
                          {job.garments?.name || 'N/A'}
                          <span className="text-[#666666] text-xs ml-2">({job.garments?.category})</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={statusBadge.className}>
                            {statusBadge.label}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#666666]">
                          {job.latency_ms ? `${job.latency_ms}ms` : '-'}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#666666]">
                          {new Date(job.created_at).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedJob(job)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-2 border-[#eeeeee]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Job Details</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedJob(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#666666]">Job ID</p>
                  <p className="font-mono text-sm">{selectedJob.id}</p>
                </div>
                <div>
                  <p className="text-sm text-[#666666]">Status</p>
                  <Badge className={getStatusBadge(selectedJob.status).className}>
                    {getStatusBadge(selectedJob.status).label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-[#666666]">Garment</p>
                  <p className="font-medium">{selectedJob.garments?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-[#666666]">Latency</p>
                  <p className="font-medium">
                    {selectedJob.latency_ms ? `${selectedJob.latency_ms}ms` : 'N/A'}
                  </p>
                </div>
              </div>

              {selectedJob.failure_reason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-900 mb-1">Error</p>
                  <p className="text-sm text-red-800">{selectedJob.failure_reason}</p>
                </div>
              )}

              {selectedJob.result_image_url && (
                <div>
                  <p className="text-sm text-[#666666] mb-2">Result Image</p>
                  <img
                    src={selectedJob.result_image_url}
                    alt="Try-on result"
                    className="w-full max-w-md mx-auto rounded-lg border-2 border-[#eeeeee]"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
