import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Waves } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      toast.success('Login successful!');
      // Navigation will be handled by App.tsx based on user role
    } else {
      toast.error('Invalid credentials. Try admin@bluecarbon.com / admin123');
    }

    setIsLoading(false);
  };

  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-ocean p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920')] bg-cover bg-center opacity-10" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl animate-scale-in">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-ocean rounded-full shadow-glow">
              <Waves className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
            Blue Carbon MRV
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Blockchain-powered coastal restoration platform
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="admin@bluecarbon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-ocean hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="space-y-3">
            <p className="text-sm text-center text-muted-foreground">Quick login as:</p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('admin@bluecarbon.com', 'admin123')}
                className="flex items-center gap-2"
              >
                <Leaf className="h-4 w-4" />
                Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('farmer1@community.com', 'farmer123')}
                className="flex items-center gap-2"
              >
                <Waves className="h-4 w-4" />
                Farmer
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Demo credentials:<br />
              Admin: admin@bluecarbon.com / admin123<br />
              Farmer: farmer1@community.com / farmer123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
