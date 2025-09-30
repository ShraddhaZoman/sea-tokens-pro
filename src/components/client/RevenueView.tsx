import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Credit, Plantation } from '@/data/mockData';
import { DollarSign, TrendingUp, Award, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RevenueViewProps {
  credits: Credit[];
  plantations: Plantation[];
  language: 'en' | 'hi';
}

const RevenueView = ({ credits, plantations, language }: RevenueViewProps) => {
  const texts = {
    en: {
      title: 'Revenue Dashboard',
      description: 'Track your carbon credit earnings',
      totalEarnings: 'Total Earnings',
      creditsMinted: 'Credits Minted',
      avgPerCredit: 'Avg per Credit',
      revenueBreakdown: 'Revenue Breakdown',
      yourShare: 'Your Share (60%)',
      panchayat: 'Panchayat (20%)',
      platform: 'Platform (15%)',
      buffer: 'Buffer Fund (5%)',
      txHash: 'Transaction Hash',
      viewOnChain: 'View on Blockchain',
      empty: 'No revenue yet. Your verified plantations will generate carbon credits!',
    },
    hi: {
      title: 'राजस्व डैशबोर्ड',
      description: 'अपनी कार्बन क्रेडिट आय को ट्रैक करें',
      totalEarnings: 'कुल आय',
      creditsMinted: 'क्रेडिट जारी किए गए',
      avgPerCredit: 'प्रति क्रेडिट औसत',
      revenueBreakdown: 'राजस्व विवरण',
      yourShare: 'आपका हिस्सा (60%)',
      panchayat: 'पंचायत (20%)',
      platform: 'प्लेटफॉर्म (15%)',
      buffer: 'बफर फंड (5%)',
      txHash: 'लेनदेन हैश',
      viewOnChain: 'ब्लॉकचेन पर देखें',
      empty: 'अभी तक कोई राजस्व नहीं। आपके सत्यापित वृक्षारोपण कार्बन क्रेडिट उत्पन्न करेंगे!',
    },
  };

  const t = texts[language];

  const totalRevenue = credits.reduce((sum, c) => sum + c.revenue, 0);
  const totalCredits = credits.reduce((sum, c) => sum + c.tokensMinted, 0);
  const avgPerCredit = totalCredits > 0 ? totalRevenue / totalCredits : 0;
  const yourShare = totalRevenue * 0.6;

  if (credits.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <DollarSign className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{t.empty}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalEarnings}</p>
                <p className="text-3xl font-bold mt-1">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-10 w-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.creditsMinted}</p>
                <p className="text-3xl font-bold mt-1">{totalCredits}</p>
              </div>
              <Award className="h-10 w-10 text-secondary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.avgPerCredit}</p>
                <p className="text-3xl font-bold mt-1">₹{avgPerCredit.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-accent opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>{t.revenueBreakdown}</CardTitle>
          <CardDescription>How your earnings are distributed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
            <span className="font-medium">{t.yourShare}</span>
            <span className="text-2xl font-bold text-primary">₹{yourShare.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">{t.panchayat}</span>
            <span className="font-semibold">₹{(totalRevenue * 0.2).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">{t.platform}</span>
            <span className="font-semibold">₹{(totalRevenue * 0.15).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">{t.buffer}</span>
            <span className="font-semibold">₹{(totalRevenue * 0.05).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Blockchain-verified credit minting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {credits.map((credit) => {
            const plantation = plantations.find((p) => p.id === credit.plantationId);
            return (
              <div key={credit.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-secondary/20 text-secondary">
                        {credit.tokensMinted} Credits
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(credit.mintedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">{plantation?.species}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {t.txHash}: {credit.txHash.slice(0, 20)}...
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">₹{credit.revenue.toLocaleString()}</p>
                    <Button variant="ghost" size="sm" className="mt-1 h-auto py-1 px-2">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span className="text-xs">{t.viewOnChain}</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueView;
