import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plantation } from '@/data/mockData';
import { MapPin, Leaf } from 'lucide-react';

interface MapViewProps {
  plantations: Plantation[];
}

const MapView = ({ plantations }: MapViewProps) => {
  const verifiedPlantations = plantations.filter(p => p.status === 'verified');

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Restoration Map
        </CardTitle>
        <CardDescription>
          Geographic distribution of verified plantation projects
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mock Map Visualization */}
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden border">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200')] bg-cover bg-center opacity-20" />
          
          {/* Map Markers */}
          {verifiedPlantations.map((plantation, index) => {
            const position = {
              top: `${20 + (index * 15) % 60}%`,
              left: `${15 + (index * 20) % 70}%`,
            };

            return (
              <div
                key={plantation.id}
                className="absolute animate-pulse"
                style={position}
              >
                <div className="relative group">
                  <div className="w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-150 transition-transform" />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-white rounded-lg shadow-xl p-3 min-w-48 border">
                      <p className="font-semibold text-sm">{plantation.species}</p>
                      <p className="text-xs text-muted-foreground">{plantation.userName}</p>
                      <p className="text-xs text-primary mt-1">
                        {plantation.area} ha • {plantation.co2Sequestration}t CO₂
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm">Verified Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm">{verifiedPlantations.length} Locations</span>
            </div>
          </div>
          <Badge variant="outline" className="bg-secondary/10 text-secondary">
            Live Map
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {verifiedPlantations.reduce((sum, p) => sum + p.area, 0).toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Hectares Restored</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-secondary">
              {verifiedPlantations.reduce((sum, p) => sum + (p.co2Sequestration || 0), 0).toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Tons CO₂ Captured</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-accent">
              {verifiedPlantations.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Active Sites</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
