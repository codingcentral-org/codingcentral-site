'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { 
  Heart, 
  Users, 
  Code, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Globe, 
  Award,
  Mail,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AboutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setFormData(prev => ({ ...prev, email: user.email || '' }));
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to send us a message');
      router.push('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          user_id: user.id,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) throw error;

      toast.success('Message sent successfully! We&apos;ll get back to you soon.');
      setFormData({
        name: '',
        email: user.email || '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const values = [
    {
      icon: Heart,
      title: 'Inclusivity',
      description: 'We believe coding is for everyone, regardless of background, experience level, or circumstances.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creative thinking and innovative approaches to problem-solving and learning.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive environment where learners and mentors grow together.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for high-quality education and meaningful impact in everything we do.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former Google engineer passionate about democratizing coding education.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Education',
      bio: 'Computer Science professor with 10+ years of teaching experience.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Community Manager',
      bio: 'Building bridges between learners, mentors, and industry professionals.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'David Kim',
      role: 'Technical Director',
      bio: 'Full-stack developer ensuring our platform delivers the best learning experience.',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const stats = [
    { number: '5,000+', label: 'Students Taught', icon: BookOpen },
    { number: '300+', label: 'Volunteer Mentors', icon: Users },
    { number: '10+', label: 'Countries Reached', icon: Globe },
    { number: '100%', label: 'Free Education', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Coding Central</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We&apos;re on a mission to motivate students to learn computer science and stay up to date with the latest technologies. 
              Coding Central is your comprehensive platform for projects, industry events, mentorship, and learning resources.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Coding Central, we believe that computer science education should be accessible to everyone, 
                regardless of their background or circumstances. We&apos;re not just about free education - we&apos;re 
                a comprehensive platform that supports students throughout their learning journey.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From beginner programming concepts to advanced industry projects, from hackathons to career 
                guidance, we provide everything students need to succeed in tech. Our platform connects 
                learners with volunteer mentors, industry events, and real-world opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
                  Free Education
                </Badge>
                <Badge className="bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-medium">
                  Mentorship
                </Badge>
                <Badge className="bg-cyan-100 text-cyan-700 px-4 py-2 text-sm font-medium">
                  Industry Events
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
                  Real Projects
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Computer science and technology"
                className="rounded-2xl shadow-2xl"
                width={800}
                height={533}
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-bold">5,000+</div>
                <div className="text-sm opacity-90">Lives Changed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the culture of our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300 mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to making coding education accessible to all
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto p-4 bg-white/20 rounded-full mb-4 w-fit">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}