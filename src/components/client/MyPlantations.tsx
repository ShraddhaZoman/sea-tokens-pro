import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plantation } from '@/data/mockData';
import { CheckCircle, Clock, XCircle, MapPin, Leaf, Award } from 'lucide-react';

interface MyPlantationsProps {
  plantations: Plantation[];
  language: 'en' | 'hi';
}

const MyPlantations = ({ plantations, language }: MyPlantationsProps) => {
  const texts = {
    en: {
      title: 'My Plantations',
      description: 'Track your mangrove restoration projects',
      verified: 'Verified',
      pending: 'Pending Review',
      rejected: 'Rejected',
      area: 'Area',
      location: 'Location',
      aiScore: 'AI Verification Score',
      co2: 'CO₂ Sequestered',
      submitted: 'Submitted',
      nftReady: 'NFT Proof Ready',
      empty: 'No plantations yet. Upload your first project!',
    },
    hi: {
      title: 'मेरे वृक्षारोपण',
      description: 'अपने मैंग्रोव बहाली परियोजनाओं को ट्रैक करें',
      verified: 'सत्यापित',
      pending: 'समीक्षा लंबित',
      rejected: 'अस्वीकृत',
      area: 'क्षेत्र',
      location: 'स्थान',
      aiScore: 'AI सत्यापन स्कोर',
      co2: 'CO₂ संग्रहीत',
      submitted: 'प्रस्तुत किया गया',
      nftReady: 'NFT प्रमाण तैयार',
      empty: 'अभी तक कोई वृक्षारोपण नहीं। अपनी पहली परियोजना अपलोड करें!',
    },
  };

  const t = texts[language];

  const getStatusBadge = (status: Plantation['status']) => {
    const variants = {
      verified: { label: t.verified, icon: CheckCircle, className: 'bg-secondary/20 text-secondary' },
      pending: { label: t.pending, icon: Clock, className: 'bg-warning/20 text-warning' },
      rejected: { label: t.rejected, icon: XCircle, className: 'bg-destructive/20 text-destructive' },
    };

    const { label, icon: Icon, className } = variants[status];
    return (
      <Badge variant="outline" className={className}>
        <Icon className="h-3 w-3 mr-1" />
        {label}
      </Badge>
    );
  };

  if (plantations.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Leaf className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{t.empty}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {plantations.map((plantation) => (
        <Card key={plantation.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-48 h-48 md:h-auto relative overflow-hidden bg-muted">
              <img
                src={plantation.imageUrl}
                alt={plantation.species}
                className="w-full h-full object-cover"
              />
              {plantation.status === 'verified' && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-secondary/90 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    {t.nftReady}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      {plantation.species}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {t.submitted}: {new Date(plantation.submittedAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {getStatusBadge(plantation.status)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t.area}</p>
                    <p className="font-semibold">{plantation.area} hectares</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t.location}</p>
                    <p className="font-semibold flex items-center gap-1 text-xs">
                      <MapPin className="h-3 w-3" />
                      {plantation.gps.lat.toFixed(2)}, {plantation.gps.lng.toFixed(2)}
                    </p>
                  </div>
                  {plantation.verificationScore && (
                    <div>
                      <p className="text-muted-foreground">{t.aiScore}</p>
                      <p className="font-semibold text-primary">
                        {(plantation.verificationScore * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                  {plantation.co2Sequestration && (
                    <div>
                      <p className="text-muted-foreground">{t.co2}</p>
                      <p className="font-semibold text-secondary">
                        {plantation.co2Sequestration} tons
                      </p>
                    </div>
                  )}
                </div>

                {/* NFT Card Preview for Verified */}
                {plantation.status === 'verified' && (
                  <div className="p-4 bg-gradient-nature rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium opacity-90">Carbon Credit NFT</p>
                        <p className="text-2xl font-bold mt-1">
                          {plantation.co2Sequestration} tCO₂
                        </p>
                        <p className="text-xs opacity-80 mt-1">
                          Blockchain Verified • Tokenized Asset
                        </p>
                      </div>
                      <Award className="h-12 w-12 opacity-80" />
                    </div>
                  </div>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MyPlantations;
