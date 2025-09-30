import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/StatCard';
import UploadPlantation from '@/components/client/UploadPlantation';
import MyPlantations from '@/components/client/MyPlantations';
import RevenueView from '@/components/client/RevenueView';
import { mockPlantations, mockCredits, Plantation } from '@/data/mockData';
import { LogOut, Leaf, DollarSign, TrendingUp, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const [plantations, setPlantations] = useState(mockPlantations);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const userPlantations = plantations.filter(p => p.userId === user?.id);
  const userCredits = mockCredits.filter(c =>
    userPlantations.some(p => p.id === c.plantationId)
  );
  
  const totalArea = userPlantations.reduce((sum, p) => sum + p.area, 0);
  const verifiedCount = userPlantations.filter(p => p.status === 'verified').length;
  const totalRevenue = userCredits.reduce((sum, c) => sum + c.revenue, 0);
  const totalCO2 = userPlantations
    .filter(p => p.co2Sequestration)
    .reduce((sum, p) => sum + (p.co2Sequestration || 0), 0);

  const handleUpload = (newPlantation: Omit<Plantation, 'id' | 'userId' | 'userName' | 'submittedAt' | 'status'>) => {
    const plantation: Plantation = {
      ...newPlantation,
      id: `p${Date.now()}`,
      userId: user!.id,
      userName: user!.name,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    
    setPlantations(prev => [...prev, plantation]);
    
    toast.success(language === 'hi' ? 'वृक्षारोपण सफलतापूर्वक अपलोड किया गया!' : 'Plantation uploaded successfully!', {
      description: language === 'hi' 
        ? 'AI सत्यापन प्रक्रिया शुरू हो गई है'
        : 'AI verification process has been initiated',
    });
  };

  const texts = {
    en: {
      title: 'Community Dashboard',
      upload: 'Upload Plantation',
      myPlantations: 'My Plantations',
      revenue: 'Revenue',
      totalArea: 'Total Area',
      verified: 'Verified Projects',
      earnings: 'Total Earnings',
      co2: 'CO₂ Sequestered',
    },
    hi: {
      title: 'समुदाय डैशबोर्ड',
      upload: 'वृक्षारोपण अपलोड करें',
      myPlantations: 'मेरे वृक्षारोपण',
      revenue: 'राजस्व',
      totalArea: 'कुल क्षेत्र',
      verified: 'सत्यापित परियोजनाएं',
      earnings: 'कुल कमाई',
      co2: 'CO₂ संग्रहीत',
    },
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-nature rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Blue Carbon MRV</h1>
                <p className="text-sm text-muted-foreground">{t.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(lang => (lang === 'en' ? 'hi' : 'en'))}
              >
                {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
              </Button>
              <div className="text-right hidden md:block">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Banner */}
        <Card className="bg-gradient-nature text-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {language === 'hi' ? `नमस्ते, ${user?.name}!` : `Welcome, ${user?.name}!`}
              </h2>
              <p className="text-white/90">
                {language === 'hi'
                  ? 'तटीय पारिस्थितिकी तंत्र की बहाली में योगदान के लिए धन्यवाद'
                  : 'Thank you for contributing to coastal ecosystem restoration'}
              </p>
            </div>
            <Sparkles className="h-8 w-8 text-white/80" />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title={t.totalArea}
            value={`${totalArea.toFixed(1)} ha`}
            icon={Leaf}
            gradient="nature"
          />
          <StatCard
            title={t.verified}
            value={verifiedCount}
            icon={TrendingUp}
            gradient="ocean"
          />
          <StatCard
            title={t.earnings}
            value={`₹${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            gradient="hero"
            trend={{ value: '+8.2%', isPositive: true }}
          />
          <StatCard
            title={t.co2}
            value={`${totalCO2.toFixed(1)}t`}
            icon={TrendingUp}
            gradient="nature"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="upload">{t.upload}</TabsTrigger>
            <TabsTrigger value="plantations">{t.myPlantations}</TabsTrigger>
            <TabsTrigger value="revenue">{t.revenue}</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <UploadPlantation onUpload={handleUpload} language={language} />
          </TabsContent>

          <TabsContent value="plantations">
            <MyPlantations plantations={userPlantations} language={language} />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueView credits={userCredits} plantations={userPlantations} language={language} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
