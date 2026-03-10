import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Building2, Mail, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-[#666666]">Manage your account and preferences</p>
      </div>

      <Card className="border-2 border-[#eeeeee]">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-5 h-5 text-[#666666]" />
              <Input placeholder="Your Company" className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Contact Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-[#666666]" />
              <Input type="email" placeholder="contact@company.com" className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-5 h-5 text-[#666666]" />
              <Input placeholder="https://company.com" className="pl-10" />
            </div>
          </div>

          <Button className="bg-black hover:bg-[#666666] text-white">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="border-2 border-[#eeeeee]">
        <CardHeader>
          <CardTitle>Billing Plan</CardTitle>
          <CardDescription>Current plan: Starter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-[#eeeeee] rounded-lg">
              <div>
                <p className="font-semibold">Starter Plan</p>
                <p className="text-sm text-[#666666]">Up to 1,000 try-ons per month</p>
              </div>
              <Button variant="outline">Upgrade</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
