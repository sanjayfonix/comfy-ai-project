import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Trash2, Mail } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

// Mock data for demo purposes
const mockTeam: TeamMember[] = [
  {
    id: 'user_1',
    email: 'sarah.johnson@example.com',
    full_name: 'Sarah Johnson',
    role: 'brand_admin',
    created_at: new Date(Date.now() - 86400000 * 90).toISOString(),
  },
  {
    id: 'user_2',
    email: 'mike.chen@example.com',
    full_name: 'Mike Chen',
    role: 'brand_user',
    created_at: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: 'user_3',
    email: 'emily.rodriguez@example.com',
    full_name: 'Emily Rodriguez',
    role: 'brand_user',
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', role: 'brand_user' });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInvite = async () => {
    if (!inviteData.email || !inviteData.role) {
      toast.error('Please fill all fields');
      return;
    }

    const newMember: TeamMember = {
      id: `user_${Date.now()}`,
      email: inviteData.email,
      full_name: null,
      role: inviteData.role,
      created_at: new Date().toISOString(),
    };

    setTeam([...team, newMember]);
    toast.success('Team member invited successfully');
    setShowInviteModal(false);
    setInviteData({ email: '', role: 'brand_user' });
  };

  const handleRemoveMember = async (memberId: string) => {
    setTeam(team.filter(m => m.id !== memberId));
    toast.success('Team member removed');
  };

  const getRoleBadge = (role: string) => {
    const config = {
      brand_admin: { className: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Admin' },
      brand_user: { className: 'bg-blue-100 text-blue-800 border-blue-200', label: 'User' },
    };
    return config[role as keyof typeof config] || config.brand_user;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#666666]">Loading team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Members</h1>
          <p className="text-[#666666]">Manage who has access to your brand dashboard</p>
        </div>
        <Button
          onClick={() => setShowInviteModal(true)}
          className="bg-black hover:bg-[#666666] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Team List */}
      <Card className="border-2 border-[#eeeeee]">
        <CardHeader>
          <CardTitle>Team Members ({team.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {team.length === 0 ? (
            <p className="text-center text-[#666666] py-8">No team members yet</p>
          ) : (
            <div className="space-y-3">
              {team.map((member) => {
                const roleBadge = getRoleBadge(member.role);
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border border-[#eeeeee] rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#eeeeee] flex items-center justify-center">
                        <span className="text-lg font-semibold text-[#666666]">
                          {member.full_name?.charAt(0) || member.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {member.full_name || member.email.split('@')[0]}
                        </p>
                        <p className="text-sm text-[#666666]">{member.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={roleBadge.className}>{roleBadge.label}</Badge>
                          <span className="text-xs text-[#666666]">
                            Joined {new Date(member.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-2 border-[#eeeeee]">
            <CardHeader>
              <CardTitle>Invite Team Member</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  placeholder="colleague@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={inviteData.role}
                  onValueChange={(value) => setInviteData({ ...inviteData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand_admin">Admin (Full access)</SelectItem>
                    <SelectItem value="brand_user">User (Limited access)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  <Mail className="w-4 h-4 inline mr-1" />
                  An invitation will be sent to the email address
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowInviteModal(false);
                    setInviteData({ email: '', role: 'brand_user' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInvite}
                  className="flex-1 bg-black hover:bg-[#666666] text-white"
                >
                  Send Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
