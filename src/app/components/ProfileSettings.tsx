import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  User, 
  Ruler, 
  Palette, 
  Users, 
  Save,
  CheckCircle
} from 'lucide-react';

interface ProfileAttributes {
  gender: string;
  ageGroup: string;
  skinTone: string;
  bodyType: string;
  height: string;
  preferredStyle: string;
}

export default function ProfileSettings() {
  const [saved, setSaved] = useState(false);
  const [attributes, setAttributes] = useState<ProfileAttributes>({
    gender: '',
    ageGroup: '',
    skinTone: '',
    bodyType: '',
    height: '',
    preferredStyle: '',
  });

  const handleSave = () => {
    // Save to backend/context
    console.log('Saving profile attributes:', attributes);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  const ageGroupOptions = [
    { value: 'child', label: 'Child (3-12)' },
    { value: 'teen', label: 'Teen (13-17)' },
    { value: 'young-adult', label: 'Young Adult (18-29)' },
    { value: 'adult', label: 'Adult (30-49)' },
    { value: 'mature', label: 'Mature (50+)' },
  ];

  const skinToneOptions = [
    { value: 'very-fair', label: 'Very Fair', color: '#FFE0BD' },
    { value: 'fair', label: 'Fair', color: '#F7D3B0' },
    { value: 'light', label: 'Light', color: '#E7BC91' },
    { value: 'medium', label: 'Medium', color: '#D6A57A' },
    { value: 'tan', label: 'Tan', color: '#C68E6B' },
    { value: 'brown', label: 'Brown', color: '#9D7A54' },
    { value: 'dark-brown', label: 'Dark Brown', color: '#7A5C47' },
    { value: 'deep', label: 'Deep', color: '#5C4033' },
  ];

  const bodyTypeOptions = [
    { value: 'petite', label: 'Petite' },
    { value: 'slim', label: 'Slim' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'average', label: 'Average' },
    { value: 'curvy', label: 'Curvy' },
    { value: 'plus-size', label: 'Plus Size' },
  ];

  const heightOptions = [
    { value: 'under-150', label: 'Under 150 cm' },
    { value: '150-160', label: '150-160 cm' },
    { value: '160-170', label: '160-170 cm' },
    { value: '170-180', label: '170-180 cm' },
    { value: '180-190', label: '180-190 cm' },
    { value: 'over-190', label: 'Over 190 cm' },
  ];

  const styleOptions = [
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'sporty', label: 'Sporty' },
    { value: 'elegant', label: 'Elegant' },
    { value: 'bohemian', label: 'Bohemian' },
    { value: 'streetwear', label: 'Streetwear' },
    { value: 'classic', label: 'Classic' },
    { value: 'trendy', label: 'Trendy' },
  ];

  return (
    <Card className="border-2 border-[#979797]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-black" />
              Profile Settings for Better Fit
            </CardTitle>
            <CardDescription className="mt-2">
              Customize your profile for accurate virtual try-on results. All information is private and secure.
            </CardDescription>
          </div>
          {saved && (
            <Badge className="bg-[#eeeeee] text-black border border-[#979797]">
              <CheckCircle className="w-4 h-4 mr-1" />
              Saved!
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Gender Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-black" />
            Gender
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setAttributes({ ...attributes, gender: option.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  attributes.gender === option.value
                    ? 'border-black bg-[#eeeeee]'
                    : 'border-[#979797] hover:border-black'
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Age Group */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-black" />
            Age Group
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {ageGroupOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setAttributes({ ...attributes, ageGroup: option.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  attributes.ageGroup === option.value
                    ? 'border-black bg-[#eeeeee]'
                    : 'border-[#979797] hover:border-black'
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skin Tone */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4 text-black" />
            Skin Tone
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skinToneOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setAttributes({ ...attributes, skinTone: option.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  attributes.skinTone === option.value
                    ? 'border-black bg-[#eeeeee]'
                    : 'border-[#979797] hover:border-black'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-[#979797]"
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Body Type */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Ruler className="w-4 h-4 text-black" />
            Body Type
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {bodyTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setAttributes({ ...attributes, bodyType: option.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  attributes.bodyType === option.value
                    ? 'border-black bg-[#eeeeee]'
                    : 'border-[#979797] hover:border-black'
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Height */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Ruler className="w-4 h-4 text-black" />
            Height Range
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {heightOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setAttributes({ ...attributes, height: option.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  attributes.height === option.value
                    ? 'border-black bg-[#eeeeee]'
                    : 'border-[#979797] hover:border-black'
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Style */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4 text-black" />
            Preferred Style
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {styleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setAttributes({ ...attributes, preferredStyle: option.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  attributes.preferredStyle === option.value
                    ? 'border-black bg-[#eeeeee]'
                    : 'border-[#979797] hover:border-black'
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-[#979797]">
          <Button
            onClick={handleSave}
            size="lg"
            className="w-full md:w-auto bg-black hover:bg-[#666666] text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Profile Settings
          </Button>
          <p className="text-sm text-[#666666] mt-3">
            💡 Setting your profile helps us provide more accurate size recommendations and virtual try-on experiences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
