import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Search, Archive, Edit2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface Garment {
  id: string;
  name: string;
  category: string;
  image_url: string;
  status: string;
  created_at: string;
}

// Mock data for demo purposes
const mockGarments: Garment[] = [
  {
    id: 'gar_1',
    name: 'Classic White T-Shirt',
    category: 'top',
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'active',
    created_at: new Date().toISOString(),
  },
  {
    id: 'gar_2',
    name: 'Slim Fit Jeans',
    category: 'pants',
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    status: 'active',
    created_at: new Date().toISOString(),
  },
  {
    id: 'gar_3',
    name: 'Summer Dress',
    category: 'dress',
    image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    status: 'active',
    created_at: new Date().toISOString(),
  },
  {
    id: 'gar_4',
    name: 'Leather Jacket',
    category: 'outerwear',
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    status: 'active',
    created_at: new Date().toISOString(),
  },
  {
    id: 'gar_5',
    name: 'Pleated Skirt',
    category: 'skirt',
    image_url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400',
    status: 'active',
    created_at: new Date().toISOString(),
  },
  {
    id: 'gar_6',
    name: 'Wool Scarf',
    category: 'accessories',
    image_url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400',
    status: 'active',
    created_at: new Date().toISOString(),
  },
];

export default function GarmentsPage() {
  const [garments, setGarments] = useState<Garment[]>(mockGarments);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGarment, setNewGarment] = useState({
    name: '',
    category: '',
    image_url: '',
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter garments based on search
  const filteredGarments = garments.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      // Simulate upload - in production this would upload to storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGarment({ ...newGarment, image_url: reader.result as string });
        setUploadingImage(false);
        toast.success('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      setUploadingImage(false);
    }
  };

  const handleAddGarment = async () => {
    if (!newGarment.name || !newGarment.category || !newGarment.image_url) {
      toast.error('Please fill all fields');
      return;
    }

    const garment: Garment = {
      id: `gar_${Date.now()}`,
      name: newGarment.name,
      category: newGarment.category,
      image_url: newGarment.image_url,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    setGarments([garment, ...garments]);
    toast.success('Garment added successfully');
    setShowAddModal(false);
    setNewGarment({ name: '', category: '', image_url: '' });
  };

  const handleArchiveGarment = async (garmentId: string) => {
    setGarments(garments.filter(g => g.id !== garmentId));
    toast.success('Garment archived');
  };

  const categories = ['Top', 'Dress', 'Outerwear', 'Pants', 'Skirt', 'Accessories'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Garment Management</h1>
          <p className="text-[#666666]">Upload and manage your product catalog</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-black hover:bg-[#666666] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Garment
        </Button>
      </div>

      {/* Search */}
      <Card className="border-2 border-[#eeeeee]">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#666666]" />
            <Input
              placeholder="Search garments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Garments Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#666666]">Loading garments...</p>
          </div>
        </div>
      ) : filteredGarments.length === 0 ? (
        <Card className="border-2 border-[#eeeeee]">
          <CardContent className="p-12 text-center">
            <p className="text-[#666666]">No garments found. Add your first garment to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGarments.map((garment) => (
            <Card key={garment.id} className="border-2 border-[#eeeeee] overflow-hidden">
              <div className="aspect-square bg-[#eeeeee] relative">
                <img
                  src={garment.image_url}
                  alt={garment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{garment.name}</h3>
                <p className="text-sm text-[#666666] mb-4 capitalize">{garment.category}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleArchiveGarment(garment.id)}
                    className="flex-1"
                  >
                    <Archive className="w-4 h-4 mr-1" />
                    Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Garment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg border-2 border-[#eeeeee]">
            <CardHeader>
              <CardTitle>Add New Garment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Garment Name</Label>
                <Input
                  value={newGarment.name}
                  onChange={(e) => setNewGarment({ ...newGarment, name: e.target.value })}
                  placeholder="e.g., Black Leather Jacket"
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newGarment.category}
                  onValueChange={(value) => setNewGarment({ ...newGarment, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="border-2 border-dashed border-[#979797] rounded-lg p-8 text-center">
                  {newGarment.image_url ? (
                    <div className="space-y-2">
                      <img
                        src={newGarment.image_url}
                        alt="Preview"
                        className="w-32 h-32 object-cover mx-auto rounded"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNewGarment({ ...newGarment, image_url: '' })}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-2 text-[#666666]" />
                      <p className="text-sm text-[#666666] mb-2">Click to upload image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      {uploadingImage && <p className="text-xs text-[#666666]">Uploading...</p>}
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewGarment({ name: '', category: '', image_url: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddGarment}
                  disabled={uploadingImage}
                  className="flex-1 bg-black hover:bg-[#666666] text-white"
                >
                  Add Garment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}