import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { DollarSign, TrendingUp } from 'lucide-react';

interface BillingData {
  id: string;
  brand_name: string;
  plan_type: string;
  active: boolean;
  totalCost: string;
  jobCount: number;
}

// Mock data for demo purposes
const mockBillingData: BillingData[] = [
  {
    id: '1',
    brand_name: 'Hugo Boss',
    plan_type: 'enterprise',
    active: true,
    totalCost: '12450.00',
    jobCount: 45230,
  },
  {
    id: '2',
    brand_name: 'Adidas Deutschland',
    plan_type: 'pro',
    active: true,
    totalCost: '5890.00',
    jobCount: 18750,
  },
  {
    id: '3',
    brand_name: 'Zalando',
    plan_type: 'enterprise',
    active: true,
    totalCost: '28940.00',
    jobCount: 87650,
  },
  {
    id: '4',
    brand_name: 'Tom Tailor',
    plan_type: 'basic',
    active: true,
    totalCost: '890.00',
    jobCount: 3420,
  },
  {
    id: '5',
    brand_name: 'Peek & Cloppenburg',
    plan_type: 'pro',
    active: false,
    totalCost: '3670.00',
    jobCount: 12340,
  },
];

export default function BillingPage() {
  const [billing, setBilling] = useState<BillingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setBilling(mockBillingData);
      setLoading(false);
    }, 500);
  }, []);

  const totalRevenue = billing.reduce((sum, b) => sum + Number(b.totalCost), 0);
  const totalJobs = billing.reduce((sum, b) => sum + b.jobCount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#979797]">Loading billing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing Overview</h1>
        <p className="text-[#666666]">Usage and revenue across all tenants</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#979797]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#666666] mb-1">Total Revenue</p>
                <p className="text-3xl font-bold">€{totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#979797]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#666666] mb-1">Total Jobs Processed</p>
                <p className="text-3xl font-bold">{totalJobs.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#979797]">
        <CardHeader>
          <CardTitle>Tenant Billing Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#979797]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Brand</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Jobs</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Total Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#666666]">Status</th>
                </tr>
              </thead>
              <tbody>
                {billing.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-[#eeeeee] last:border-0">
                    <td className="py-3 px-4 font-medium">{tenant.brand_name}</td>
                    <td className="py-3 px-4 capitalize text-sm">{tenant.plan_type}</td>
                    <td className="py-3 px-4 text-sm">{tenant.jobCount.toLocaleString()}</td>
                    <td className="py-3 px-4 font-bold text-green-600">€{tenant.totalCost}</td>
                    <td className="py-3 px-4">
                      <Badge className={tenant.active ? 'bg-green-600' : 'bg-red-600'}>
                        {tenant.active ? 'Active' : 'Inactive'}
                      </Badge>
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