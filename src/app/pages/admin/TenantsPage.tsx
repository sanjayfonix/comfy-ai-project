import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Building2, Users, Zap, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface Tenant {
  id: string;
  brand_name: string;
  plan_type: string;
  active: boolean;
  created_at: string;
  stats: {
    totalJobs: number;
    totalCost: string;
  };
}

// Mock data for demo purposes
const mockTenants: Tenant[] = [
  {
    id: '1',
    brand_name: 'Hugo Boss',
    plan_type: 'enterprise',
    active: true,
    created_at: '2024-01-15T10:00:00Z',
    stats: {
      totalJobs: 45230,
      totalCost: '12,450.00',
    },
  },
  {
    id: '2',
    brand_name: 'Adidas Deutschland',
    plan_type: 'pro',
    active: true,
    created_at: '2024-02-20T14:30:00Z',
    stats: {
      totalJobs: 18750,
      totalCost: '5,890.00',
    },
  },
  {
    id: '3',
    brand_name: 'Zalando',
    plan_type: 'enterprise',
    active: true,
    created_at: '2024-01-05T09:15:00Z',
    stats: {
      totalJobs: 87650,
      totalCost: '28,940.00',
    },
  },
  {
    id: '4',
    brand_name: 'Tom Tailor',
    plan_type: 'basic',
    active: true,
    created_at: '2024-03-10T11:45:00Z',
    stats: {
      totalJobs: 3420,
      totalCost: '890.00',
    },
  },
  {
    id: '5',
    brand_name: 'Peek & Cloppenburg',
    plan_type: 'pro',
    active: false,
    created_at: '2024-02-28T16:20:00Z',
    stats: {
      totalJobs: 12340,
      totalCost: '3,670.00',
    },
  },
];

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setTenants(mockTenants);
      setLoading(false);
    }, 500);
  }, []);

  const handleToggleActive = (tenantId: string, currentStatus: boolean) => {
    // Update local state
    setTenants(prev => prev.map(t => 
      t.id === tenantId ? { ...t, active: !currentStatus } : t
    ));
    toast.success(`Tenant ${!currentStatus ? 'activated' : 'deactivated'}`);
  };

  const handleChangePlan = (tenantId: string, planType: string) => {
    // Update local state
    setTenants(prev => prev.map(t => 
      t.id === tenantId ? { ...t, plan_type: planType } : t
    ));
    toast.success('Plan updated');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#979797]">Loading tenants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Tenants</h1>
        <p className="text-[#666666]">Manage all fashion brands on the platform</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tenants.length === 0 ? (
          <Card className="border-[#979797]">
            <CardContent className="p-12 text-center">
              <p className="text-[#666666]">No tenants found</p>
            </CardContent>
          </Card>
        ) : (
          tenants.map((tenant) => (
            <Card key={tenant.id} className="border-[#979797]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#eeeeee] rounded-lg">
                      <Building2 className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tenant.brand_name}</CardTitle>
                      <p className="text-sm text-[#666666] mt-1">
                        Joined {new Date(tenant.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={tenant.active ? 'bg-green-600' : 'bg-red-600'}>
                    {tenant.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-[#eeeeee] rounded-lg">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-[#666666]">Total Jobs</p>
                      <p className="text-lg font-bold">{tenant.stats.totalJobs.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#eeeeee] rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-xs text-[#666666]">Total Revenue</p>
                      <p className="text-lg font-bold">€{tenant.stats.totalCost}</p>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex gap-2">
                      <Select
                        value={tenant.plan_type}
                        onValueChange={(value) => handleChangePlan(tenant.id, value)}
                      >
                        <SelectTrigger className="bg-white border-[#979797]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#979797]">
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="pro">Pro</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        onClick={() => handleToggleActive(tenant.id, tenant.active)}
                        className={tenant.active ? 'border-red-600 text-red-600 hover:bg-red-600/10' : 'border-green-600 text-green-600 hover:bg-green-600/10'}
                      >
                        {tenant.active ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}