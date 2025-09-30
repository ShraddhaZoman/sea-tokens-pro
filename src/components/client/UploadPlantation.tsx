import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plantation } from '@/data/mockData';
import { Upload, MapPin, Leaf, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface UploadPlantationProps {
  onUpload: (plantation: Omit<Plantation, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => void;
  language: 'en' | 'hi';
}

const UploadPlantation = ({ onUpload, language }: UploadPlantationProps) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [formData, setFormData] = useState({
    species: '',
    area: '',
    latitude: '',
    longitude: '',
    imageUrl: '',
  });

  const texts = {
    en: {
      title: 'Upload New Plantation',
      description: 'Submit your mangrove plantation for AI verification',
      species: 'Mangrove Species',
      speciesPlaceholder: 'e.g., Rhizophora, Avicennia Marina',
      area: 'Area (hectares)',
      areaPlaceholder: '2.5',
      location: 'GPS Coordinates',
      latitude: 'Latitude',
      longitude: 'Longitude',
      image: 'Plantation Image URL',
      imagePlaceholder: 'https://...',
      submit: 'Submit for Verification',
      simulating: 'Running AI Verification...',
      aiVerifying: 'AI is analyzing your plantation...',
      verified: 'AI Verification Complete!',
    },
    hi: {
      title: 'नया वृक्षारोपण अपलोड करें',
      description: 'AI सत्यापन के लिए अपना मैंग्रोव वृक्षारोपण जमा करें',
      species: 'मैंग्रोव प्रजाति',
      speciesPlaceholder: 'जैसे, राइज़ोफोरा, एविसेनिया मरीना',
      area: 'क्षेत्र (हेक्टेयर)',
      areaPlaceholder: '2.5',
      location: 'GPS निर्देशांक',
      latitude: 'अक्षांश',
      longitude: 'देशांतर',
      image: 'वृक्षारोपण छवि URL',
      imagePlaceholder: 'https://...',
      submit: 'सत्यापन के लिए जमा करें',
      simulating: 'AI सत्यापन चल रहा है...',
      aiVerifying: 'AI आपके वृक्षारोपण का विश्लेषण कर रहा है...',
      verified: 'AI सत्यापन पूर्ण!',
    },
  };

  const t = texts[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);

    // Simulate AI verification delay
    toast.info(t.aiVerifying, {
      icon: <Sparkles className="h-4 w-4" />,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const verificationScore = 0.85 + Math.random() * 0.14;
    const co2Sequestration = parseFloat(formData.area) * 1.5;

    onUpload({
      species: formData.species,
      area: parseFloat(formData.area),
      gps: {
        lat: parseFloat(formData.latitude),
        lng: parseFloat(formData.longitude),
      },
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      verificationScore,
      co2Sequestration,
    });

    // Reset form
    setFormData({
      species: '',
      area: '',
      latitude: '',
      longitude: '',
      imageUrl: '',
    });

    setIsSimulating(false);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="species">{t.species}</Label>
              <Input
                id="species"
                placeholder={t.speciesPlaceholder}
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">{t.area}</Label>
              <Input
                id="area"
                type="number"
                step="0.1"
                placeholder={t.areaPlaceholder}
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t.location}
            </Label>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder={`${t.latitude}: 19.0760`}
                type="number"
                step="0.0001"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                required
              />
              <Input
                placeholder={`${t.longitude}: 72.8777`}
                type="number"
                step="0.0001"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">{t.image}</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder={t.imagePlaceholder}
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Optional: Leave blank to use a default image
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-nature hover:opacity-90 transition-opacity"
            disabled={isSimulating}
          >
            {isSimulating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                {t.simulating}
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadPlantation;
