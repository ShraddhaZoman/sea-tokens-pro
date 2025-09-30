import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plantation } from '@/data/mockData';
import { CheckCircle, XCircle, Clock, MapPin, Leaf } from 'lucide-react';

interface PlantationsListProps {
  plantations: Plantation[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const PlantationsList = ({ plantations, onApprove, onReject }: PlantationsListProps) => {
  const getStatusBadge = (status: Plantation['status']) => {
    const variants = {
      verified: { label: 'Verified', icon: CheckCircle, className: 'bg-secondary/20 text-secondary' },
      pending: { label: 'Pending', icon: Clock, className: 'bg-warning/20 text-warning' },
      rejected: { label: 'Rejected', icon: XCircle, className: 'bg-destructive/20 text-destructive' },
    };

    const { label, icon: Icon, className } = variants[status];
    return (
      <Badge variant="outline" className={className}>
        <Icon className="h-3 w-3 mr-1" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {plantations.map((plantation) => (
        <Card key={plantation.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="md:flex">
            <div className="md:w-48 h-48 md:h-auto relative overflow-hidden bg-muted">
              <img
                src={plantation.imageUrl}
                alt={plantation.species}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      {plantation.species}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Submitted by {plantation.userName} • {new Date(plantation.submittedAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {getStatusBadge(plantation.status)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Area</p>
                    <p className="font-semibold">{plantation.area} hectares</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-semibold flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {plantation.gps.lat.toFixed(4)}, {plantation.gps.lng.toFixed(4)}
                    </p>
                  </div>
                  {plantation.verificationScore && (
                    <div>
                      <p className="text-muted-foreground">AI Score</p>
                      <p className="font-semibold text-primary">
                        {(plantation.verificationScore * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                  {plantation.co2Sequestration && (
                    <div>
                      <p className="text-muted-foreground">CO₂ Sequestered</p>
                      <p className="font-semibold text-secondary">
                        {plantation.co2Sequestration} tons
                      </p>
                    </div>
                  )}
                </div>

                {plantation.status === 'pending' && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => onApprove(plantation.id)}
                      className="flex-1 bg-secondary hover:bg-secondary/90"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve & Mint Credits
                    </Button>
                    <Button
                      onClick={() => onReject(plantation.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}

                {plantation.status === 'verified' && (
                  <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg text-sm">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-secondary font-medium">
                      Verified • Carbon credits minted on blockchain
                    </span>
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

export default PlantationsList;
