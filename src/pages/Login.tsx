import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Essential for redirection
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate(); // Hook to move between pages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // SIMPLE ADMIN CHECK
    // You can change these credentials if you want
    if (email === "admin@modelcorp.com" && password === "admin123") {
      
      // 1. Save the "Proof of Login" to browser memory
      localStorage.setItem("admin_token", "true");

      // 2. Show Success Message
      toast.success("Login Successful! Redirecting...");

      // 3. REDIRECT (The missing part)
      // We wait a tiny bit (500ms) so you can see the success message
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 500);

    } else {
      toast.error("Invalid credentials. Try admin123");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Admin Login</CardTitle>
          <CardDescription>Access the  Dharvista dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email Address
              </label>
              <Input 
                type="email" 
                placeholder="Admin Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}