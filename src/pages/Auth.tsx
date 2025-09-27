import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Welcome back!",
            description: "You have been signed in successfully.",
          });
          navigate('/admin');
        }
      } else {
        // Sign up - restricted to admin only
        const redirectUrl = `${window.location.origin}/`;
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });

        if (error) throw error;

        if (data.user && !data.session) {
          toast({
            title: "Check your email",
            description: "We've sent you a confirmation link to complete your registration.",
          });
        } else if (data.session) {
          toast({
            title: "Account created!",
            description: "Your admin account has been created successfully.",
          });
          navigate('/admin');
        }
      }
    } catch (error: any) {
      let message = "An unexpected error occurred";
      
      if (error.message.includes("Registration is restricted to admin only")) {
        message = "Registration is restricted. Only admin access is allowed.";
      } else if (error.message.includes("Invalid login credentials")) {
        message = "Invalid email or password. Please check your credentials.";
      } else if (error.message.includes("Email not confirmed")) {
        message = "Please check your email and confirm your account before signing in.";
      } else if (error.message) {
        message = error.message;
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md">
        <Card className="card-elegant shadow-elegant border-border/50">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-elegant text-foreground">
                {isLogin ? "Welcome Back" : "Admin Registration"}
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                {isLogin 
                  ? "Sign in to access your admin dashboard" 
                  : "Create your admin account to get started"
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Authorized Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-background border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 bg-background border-border focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium py-3 rounded-md transition-all duration-200 hover:scale-[1.02]"
              >
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Admin Account")}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
              >
                {isLogin 
                  ? "Need to create an admin account?" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {!isLogin && (
              <div className="text-center p-4 bg-accent-light rounded-md border border-accent/20">
                <p className="text-xs text-muted-foreground">
                  Note: Registration is restricted to admin@popwale.in only. 
                  Only authorized personnel can create accounts.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;