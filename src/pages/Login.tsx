
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { User, Lock, ChevronLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tenant, setTenant] = React.useState("asia");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    if (tenant === "asia") {
      toast({
        title: "Welcome to Asia Aviation Services",
        description: "Redirecting to MRO dashboard...",
      });
      navigate("/weststar");
    } else {
      toast({
        title: "Login successful",
        description: "Redirecting to dashboard...",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-800">
      <Button
        variant="ghost"
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-blue-200"
        onClick={() => navigate("/")}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Home
      </Button>
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            {tenant === "asia" ? (
              <div className="space-y-2">
                <div className="text-blue-900">Asia Aviation Services</div>
                <div className="text-lg text-blue-700">MRO Management System</div>
              </div>
            ) : (
              "Login to Aptiv8 GenAI AeroGuardian"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tenant">Organization</Label>
              <select
                id="tenant"
                className="w-full p-2 border rounded-md"
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
              >
                <option value="asia">Asia Aviation Services</option>
                <option value="default">AeroGuardian Default</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-blue-900/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-blue-900/50" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
