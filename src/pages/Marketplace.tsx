import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockMarketplace } from '@/data/mockData';
import { ShoppingCart, TrendingDown, Calendar, Shield } from 'lucide-react';
import { toast } from 'sonner';

const Marketplace = () => {
  const handlePurchase = (listingId: string) => {
    toast.success('Pre-booking successful!', {
      description: 'Credits will be released according to vesting schedule',
    });
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Carbon Credit Marketplace</h1>
        <p className="text-muted-foreground mt-2">Pre-book future credits at discounted rates</p>
      </div>

      <div className="grid gap-6">
        {mockMarketplace.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{listing.buyer}</CardTitle>
                  <CardDescription>
                    Purchased {new Date(listing.purchasedAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant={listing.escrowStatus === 'locked' ? 'default' : 'secondary'}>
                  <Shield className="h-3 w-3 mr-1" />
                  {listing.escrowStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Credits</p>
                  <p className="text-xl font-bold">{listing.creditsPurchased}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    Discount
                  </p>
                  <p className="text-xl font-bold text-secondary">{listing.discountRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Vesting
                  </p>
                  <p className="text-xl font-bold">{listing.vestingSchedule}</p>
                </div>
                <div className="flex items-end">
                  <Button onClick={() => handlePurchase(listing.id)} className="w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Similar Deal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
