import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

interface AnalyticsData {
  chartData: {
    date: string;
    tryOns: number;
    successful: number;
    failed: number;
    avgLatency: number;
  }[];
  totalCost: string;
}

// Mock data for demo purposes
const mockAnalyticsData: AnalyticsData = {
  chartData: [
    { date: '2026-02-04', tryOns: 45, successful: 42, failed: 3, avgLatency: 1850 },
    { date: '2026-02-05', tryOns: 52, successful: 49, failed: 3, avgLatency: 1920 },
    { date: '2026-02-06', tryOns: 38, successful: 37, failed: 1, avgLatency: 1780 },
    { date: '2026-02-07', tryOns: 61, successful: 58, failed: 3, avgLatency: 1890 },
    { date: '2026-02-08', tryOns: 48, successful: 46, failed: 2, avgLatency: 1820 },
    { date: '2026-02-09', tryOns: 55, successful: 53, failed: 2, avgLatency: 1860 },
    { date: '2026-02-10', tryOns: 70, successful: 68, failed: 2, avgLatency: 1910 },
    { date: '2026-02-11', tryOns: 65, successful: 62, failed: 3, avgLatency: 1870 },
    { date: '2026-02-12', tryOns: 58, successful: 56, failed: 2, avgLatency: 1840 },
    { date: '2026-02-13', tryOns: 72, successful: 70, failed: 2, avgLatency: 1900 },
    { date: '2026-02-14', tryOns: 81, successful: 78, failed: 3, avgLatency: 1930 },
    { date: '2026-02-15', tryOns: 76, successful: 74, failed: 2, avgLatency: 1880 },
    { date: '2026-02-16', tryOns: 69, successful: 67, failed: 2, avgLatency: 1850 },
    { date: '2026-02-17', tryOns: 84, successful: 81, failed: 3, avgLatency: 1920 },
    { date: '2026-02-18', tryOns: 78, successful: 76, failed: 2, avgLatency: 1890 },
    { date: '2026-02-19', tryOns: 91, successful: 88, failed: 3, avgLatency: 1940 },
    { date: '2026-02-20', tryOns: 87, successful: 85, failed: 2, avgLatency: 1910 },
    { date: '2026-02-21', tryOns: 93, successful: 91, failed: 2, avgLatency: 1880 },
    { date: '2026-02-22', tryOns: 98, successful: 95, failed: 3, avgLatency: 1950 },
    { date: '2026-02-23', tryOns: 102, successful: 99, failed: 3, avgLatency: 1920 },
    { date: '2026-02-24', tryOns: 95, successful: 93, failed: 2, avgLatency: 1890 },
    { date: '2026-02-25', tryOns: 108, successful: 105, failed: 3, avgLatency: 1960 },
    { date: '2026-02-26', tryOns: 112, successful: 109, failed: 3, avgLatency: 1930 },
    { date: '2026-02-27', tryOns: 105, successful: 102, failed: 3, avgLatency: 1900 },
    { date: '2026-02-28', tryOns: 118, successful: 115, failed: 3, avgLatency: 1970 },
    { date: '2026-03-01', tryOns: 125, successful: 122, failed: 3, avgLatency: 1940 },
    { date: '2026-03-02', tryOns: 130, successful: 127, failed: 3, avgLatency: 1920 },
    { date: '2026-03-03', tryOns: 122, successful: 119, failed: 3, avgLatency: 1890 },
    { date: '2026-03-04', tryOns: 135, successful: 132, failed: 3, avgLatency: 1950 },
    { date: '2026-03-05', tryOns: 142, successful: 139, failed: 3, avgLatency: 1980 },
  ],
  totalCost: '127.50',
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#666666]">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const totalTryOns = data.chartData.reduce((sum, day) => sum + day.tryOns, 0);
  const totalSuccessful = data.chartData.reduce((sum, day) => sum + day.successful, 0);
  const successRate = totalTryOns > 0 ? ((totalSuccessful / totalTryOns) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Usage Analytics</h1>
        <p className="text-[#666666]">Track your virtual try-on platform performance over time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-[#eeeeee]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#666666] mb-1">Total Try-Ons (30d)</p>
                <p className="text-3xl font-bold">{totalTryOns.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#eeeeee]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#666666] mb-1">Success Rate</p>
                <p className="text-3xl font-bold">{successRate}%</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#eeeeee]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#666666] mb-1">Total Cost (30d)</p>
                <p className="text-3xl font-bold">${data.totalCost}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Try-Ons Over Time */}
      <Card className="border-2 border-[#eeeeee]">
        <CardHeader>
          <CardTitle>Try-Ons Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                stroke="#666666"
              />
              <YAxis stroke="#666666" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '2px solid #eeeeee' }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Legend />
              <Bar dataKey="successful" fill="#22c55e" name="Successful" />
              <Bar dataKey="failed" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="border-2 border-[#eeeeee]">
        <CardHeader>
          <CardTitle>Average Latency</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                stroke="#666666"
              />
              <YAxis stroke="#666666" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '2px solid #eeeeee' }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgLatency"
                stroke="#000000"
                strokeWidth={2}
                name="Avg Latency (ms)"
                dot={{ fill: '#000000', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
