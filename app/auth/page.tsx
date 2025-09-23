'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User, UserPlus, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) throw error;

      toast.success('Signed in successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            full_name: signUpData.fullName,
            role: signUpData.role,
          },
        },
      });

      if (error) throw error;

      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-100 shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-gray-900">Join Our Community</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 mb-4">
                {activeTab === 'signin' ? 'Welcome back to' : 'Welcome to'}{' '}
                <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                  Coding Central
                </span>
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full mx-auto mb-4"></div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {activeTab === 'signin' 
                  ? 'Sign in to your account to continue your coding journey'
                  : 'Join Our Community - Create a new account to start your coding journey'
                }
              </p>
            </div>

            {/* Auth Card */}
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-2xl">
              <CardContent className="p-8">
                <Tabs defaultValue="signin" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-gray-100/80 backdrop-blur-sm rounded-xl">
                    <TabsTrigger 
                      value="signin" 
                      className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>Sign In</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="flex items-center space-x-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="mt-6">
                    <form onSubmit={handleSignIn} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email" className="text-sm font-semibold text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="signin-email"
                          type="email"
                          value={signInData.email}
                          onChange={(e) => setSignInData(prev => ({
                            ...prev,
                            email: e.target.value
                          }))}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password" className="text-sm font-semibold text-gray-700">
                          Password
                        </Label>
                        <Input
                          id="signin-password"
                          type="password"
                          value={signInData.password}
                          onChange={(e) => setSignInData(prev => ({
                            ...prev,
                            password: e.target.value
                          }))}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="mt-6">
                    <form onSubmit={handleSignUp} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-sm font-semibold text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="signup-name"
                          value={signUpData.fullName}
                          onChange={(e) => setSignUpData(prev => ({
                            ...prev,
                            fullName: e.target.value
                          }))}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-sm font-semibold text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData(prev => ({
                            ...prev,
                            email: e.target.value
                          }))}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-semibold text-gray-700">
                          Password
                        </Label>
                        <Input
                          id="signup-password"
                          type="password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData(prev => ({
                            ...prev,
                            password: e.target.value
                          }))}
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                          placeholder="Create a password"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-role" className="text-sm font-semibold text-gray-700">
                          I am a...
                        </Label>
                        <Select
                          value={signUpData.role}
                          onValueChange={(value) => setSignUpData(prev => ({
                            ...prev,
                            role: value
                          }))}
                        >
                          <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="tutor">Tutor</SelectItem>
                            <SelectItem value="chapter_lead">Chapter Lead</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}