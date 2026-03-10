import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Plus, Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface APIKey {
  id: string;
  key_prefix: string;
  name: string;
  active: boolean;
  created_at: string;
  last_used_at: string | null;
  raw_key?: string;
}

// Mock data for demo purposes
const mockAPIKeys: APIKey[] = [
  {
    id: 'key_1',
    key_prefix: 'comify_a1b2c3d',
    name: 'Production API Key',
    active: true,
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    last_used_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'key_2',
    key_prefix: 'comify_x9y8z7w',
    name: 'Development API Key',
    active: true,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    last_used_at: new Date(Date.now() - 7200000).toISOString(),
  },
];

export default function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<APIKey | null>(null);
  const [revealedKey, setRevealedKey] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    const rawKey = `comify_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      key_prefix: rawKey.substring(0, 15),
      name: newKeyName,
      active: true,
      created_at: new Date().toISOString(),
      last_used_at: null,
      raw_key: rawKey,
    };

    setApiKeys([newKey, ...apiKeys]);
    setNewlyCreatedKey(newKey);
    setShowCreateModal(false);
    setNewKeyName('');
    toast.success('API key created successfully');
  };

  const handleRevokeKey = async (keyId: string) => {
    setApiKeys(apiKeys.map(k => k.id === keyId ? { ...k, active: false } : k));
    toast.success('API key revoked');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#666666]">Loading API keys...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">API Keys</h1>
          <p className="text-[#666666]">Manage your API keys for programmatic access</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-black hover:bg-[#666666] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create API Key
        </Button>
      </div>

      {/* New Key Alert */}
      {newlyCreatedKey && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">API Key Created!</CardTitle>
            <CardDescription className="text-green-800">
              Make sure to copy your API key now. You won't be able to see it again!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input
                value={revealedKey ? newlyCreatedKey.raw_key : '••••••••••••••••••••••••••••••••'}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRevealedKey(!revealedKey)}
              >
                {revealedKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(newlyCreatedKey.raw_key || '')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNewlyCreatedKey(null)}
              className="mt-2"
            >
              Dismiss
            </Button>
          </CardContent>
        </Card>
      )}

      {/* API Keys List */}
      <Card className="border-2 border-[#eeeeee]">
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <p className="text-center text-[#666666] py-8">No API keys created yet</p>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-4 border border-[#eeeeee] rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{key.name}</p>
                      {!key.active && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          Revoked
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#666666] font-mono">{key.key_prefix}•••••••••••</p>
                    <div className="flex gap-4 mt-2 text-xs text-[#666666]">
                      <span>Created: {new Date(key.created_at).toLocaleDateString()}</span>
                      {key.last_used_at && (
                        <span>Last used: {new Date(key.last_used_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(key.key_prefix)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    {key.active && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeKey(key.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-2 border-[#eeeeee]">
            <CardHeader>
              <CardTitle>Create New API Key</CardTitle>
              <CardDescription>
                Enter a name to help you identify this API key later
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Key Name</Label>
                <Input
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production API Key"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewKeyName('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateKey}
                  className="flex-1 bg-black hover:bg-[#666666] text-white"
                >
                  Create Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
