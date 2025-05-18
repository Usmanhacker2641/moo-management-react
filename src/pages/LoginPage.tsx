
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Google } from "lucide-react";

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

const LoginPage = ({ setIsLoggedIn }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!username || !password) {
      toast.error("Please enter both username and password");
      setIsLoading(false);
      return;
    }

    // Simple mock authentication - in a real app, this would verify against a database
    // For demo purposes, accept any username with password "admin"
    setTimeout(() => {
      if (password === "admin") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        setIsLoggedIn(true);
        toast.success(`Welcome, ${username}!`);
        navigate("/");
      } else {
        toast.error("Invalid credentials. Try username with password 'admin'");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Mock Google authentication
    setTimeout(() => {
      const randomName = `User${Math.floor(Math.random() * 1000)}`;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", randomName);
      setIsLoggedIn(true);
      toast.success(`Welcome, ${randomName}!`);
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-farm-green">Dairy Farm Management</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-farm-green hover:bg-farm-green/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <Google className="mr-2" size={16} />
            Sign in with Google
          </Button>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Demo credentials: any username with password "admin"</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
