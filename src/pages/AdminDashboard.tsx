import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/StatCard';
import PlantationsList from '@/components/admin/PlantationsList';
import AnalyticsCharts from '@/components/admin/AnalyticsCharts';
import MapView from '@/components/admin/MapView';
import { mockPlantations, mockCredits } from '@/data/mockData';
import { LogOut, Leaf, DollarSign, CheckCircle, Clock, TrendingUp, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [plantations, setPlantations] = useState(mockPlantations);

  const totalProjects = plantations.length;
  const verifiedProjects = plantations.filter(p => p.status === 'verified').length;
  const pendingProjects = plantations.filter(p => p.status === 'pending').length;
  const totalCO2 = plantations
    .filter(p => p.co2Sequestration)
    .reduce((sum, p) => sum + (p.co2Sequestration || 0), 0);
  const totalRevenue = mockCredits.reduce((sum, c) => sum + c.revenue, 0);

  const handleApprove = (plantationId: string) => {
    setPlantations(prev =>
      prev.map(p =>
        p.id === plantationId
          ? { ...p, status: 'verified' as const, verificationScore: 0.85 + Math.random() * 0.14 }
          : p
      )
    );
    toast.success('Plantation verified successfully!', {
      description: 'Carbon credits will be minted on blockchain',
    });
  };

  const handleReject = (plantationId: string) => {
    setPlantations(prev =>
      prev.map(p => (p.id === plantationId ? { ...p, status: 'rejected' as const } : p))
    );
    toast.error('Plantation rejected');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-ocean rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Blue Carbon MRV</h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Projects"
            value={totalProjects}
            icon={Leaf}
            gradient="ocean"
            trend={{ value: '+12%', isPositive: true }}
          />
          <StatCard
            title="Verified Projects"
            value={verifiedProjects}
            icon={CheckCircle}
            gradient="nature"
          />
          <StatCard
            title="Pending Review"
            value={pendingProjects}
            icon={Clock}
            gradient="hero"
          />
          <StatCard
            title="CO₂ Sequestered"
            value={`${totalCO2.toFixed(1)}t`}
            icon={TrendingUp}
            description="Total carbon captured"
            gradient="nature"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <PlantationsList
              plantations={plantations}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts plantations={plantations} credits={mockCredits} />
          </TabsContent>

          <TabsContent value="map">
            <MapView plantations={plantations} />
          </TabsContent>
        </Tabs>

        {/* Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Revenue Distribution Model
            </CardTitle>
            <CardDescription>
              Transparent allocation of carbon credit revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Community</p>
                <p className="text-2xl font-bold text-primary">60%</p>
                <p className="text-xs text-muted-foreground mt-1">Direct to farmers</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Panchayat</p>
                <p className="text-2xl font-bold text-secondary">20%</p>
                <p className="text-xs text-muted-foreground mt-1">Local governance</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="text-2xl font-bold text-accent">15%</p>
                <p className="text-xs text-muted-foreground mt-1">Operations</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Buffer</p>
                <p className="text-2xl font-bold text-warning">5%</p>
                <p className="text-xs text-muted-foreground mt-1">Insurance fund</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
