'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Shield, BarChart3, Code, Briefcase, Users, BookOpen, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const courseCategories = {
  'ai-ml': {
    title: 'AI & Machine Learning',
    icon: Brain,
    description: 'Master artificial intelligence and machine learning fundamentals',
    courses: [
      {
        id: 'ml-fundamentals',
        title: 'Machine Learning Fundamentals',
        description: 'Learn the core concepts of ML including supervised and unsupervised learning, neural networks, and model evaluation.',
        level: 'Beginner',
        duration: '12 weeks',
        link: 'https://www.coursera.org/learn/machine-learning',
      },
      {
        id: 'deep-learning',
        title: 'Deep Learning Specialization',
        description: 'Master neural networks, CNNs, RNNs, and advanced deep learning techniques for real-world applications.',
        level: 'Intermediate',
        duration: '16 weeks',
        link: 'https://www.deeplearning.ai/courses/deep-learning-specialization/',
      },
      {
        id: 'nlp-fundamentals',
        title: 'Natural Language Processing',
        description: 'Build chatbots, sentiment analysis systems, and language models using modern NLP techniques.',
        level: 'Intermediate',
        duration: '10 weeks',
        link: 'https://www.coursera.org/learn/language-processing',
      },
      {
        id: 'computer-vision',
        title: 'Computer Vision',
        description: 'Learn image recognition, object detection, and computer vision applications using OpenCV and TensorFlow.',
        level: 'Advanced',
        duration: '14 weeks',
        link: 'https://www.coursera.org/learn/convolutional-neural-networks',
      },
    ]
  },
  'cybersecurity': {
    title: 'Cybersecurity',
    icon: Shield,
    description: 'Protect systems and data with comprehensive security training',
    courses: [
      {
        id: 'cyber-fundamentals',
        title: 'Cybersecurity Fundamentals',
        description: 'Learn the basics of information security, threat analysis, and risk management principles.',
        level: 'Beginner',
        duration: '8 weeks',
        link: 'https://www.coursera.org/learn/intro-cyber-security',
      },
      {
        id: 'ethical-hacking',
        title: 'Ethical Hacking & Penetration Testing',
        description: 'Master penetration testing techniques, vulnerability assessment, and ethical hacking methodologies.',
        level: 'Intermediate',
        duration: '12 weeks',
        link: 'https://www.cybrary.it/course/ethical-hacking/',
      },
      {
        id: 'network-security',
        title: 'Network Security',
        description: 'Secure networks, implement firewalls, and understand network protocols and security architectures.',
        level: 'Intermediate',
        duration: '10 weeks',
        link: 'https://www.coursera.org/learn/network-security',
      },
      {
        id: 'incident-response',
        title: 'Incident Response & Forensics',
        description: 'Learn digital forensics, incident response procedures, and malware analysis techniques.',
        level: 'Advanced',
        duration: '14 weeks',
        link: 'https://www.sans.org/cyber-security-courses/',
      },
    ]
  },
  'data-science': {
    title: 'Data Science',
    icon: BarChart3,
    description: 'Extract insights from data with statistical analysis and visualization',
    courses: [
      {
        id: 'data-analysis',
        title: 'Data Analysis with Python',
        description: 'Master pandas, NumPy, and data manipulation techniques for comprehensive data analysis.',
        level: 'Beginner',
        duration: '10 weeks',
        link: 'https://www.coursera.org/learn/data-analysis-with-python',
      },
      {
        id: 'data-visualization',
        title: 'Data Visualization',
        description: 'Create compelling visualizations using Matplotlib, Seaborn, Plotly, and Tableau.',
        level: 'Beginner',
        duration: '8 weeks',
        link: 'https://www.coursera.org/learn/python-for-data-visualization',
      },
      {
        id: 'statistics',
        title: 'Statistics for Data Science',
        description: 'Learn statistical concepts, hypothesis testing, and statistical modeling for data science.',
        level: 'Intermediate',
        duration: '12 weeks',
        link: 'https://www.coursera.org/learn/statistical-inference',
      },
      {
        id: 'big-data',
        title: 'Big Data Analytics',
        description: 'Work with large datasets using Spark, Hadoop, and cloud-based analytics platforms.',
        level: 'Advanced',
        duration: '16 weeks',
        link: 'https://www.coursera.org/learn/big-data-analysis',
      },
    ]
  },
  'software-dev': {
    title: 'Software Development',
    icon: Code,
    description: 'Build applications and master programming fundamentals',
    courses: [
      {
        id: 'web-fundamentals',
        title: 'Web Development Fundamentals',
        description: 'Learn HTML, CSS, JavaScript, and modern web development practices from scratch.',
        level: 'Beginner',
        duration: '8 weeks',
        link: 'https://www.freecodecamp.org/learn/responsive-web-design/',
      },
      {
        id: 'python-programming',
        title: 'Python Programming',
        description: 'Master Python basics and advanced concepts for software development and automation.',
        level: 'Beginner',
        duration: '10 weeks',
        link: 'https://www.codecademy.com/learn/learn-python-3',
      },
      {
        id: 'react-development',
        title: 'React & Modern JavaScript',
        description: 'Build interactive web applications with React, hooks, state management, and best practices.',
        level: 'Intermediate',
        duration: '12 weeks',
        link: 'https://react.dev/learn',
      },
      {
        id: 'full-stack',
        title: 'Full-Stack Development',
        description: 'Combine frontend and backend skills to build complete web applications with databases and APIs.',
        level: 'Advanced',
        duration: '20 weeks',
        link: 'https://fullstackopen.com/en/',
      },
    ]
  },
  'career': {
    title: 'Career Services',
    icon: Briefcase,
    description: 'Professional development and career advancement resources',
    courses: [
      {
        id: 'resume-building',
        title: 'Tech Resume Mastery',
        description: 'Create compelling resumes that get noticed by tech recruiters and hiring managers.',
        level: 'All Levels',
        duration: '2 weeks',
        link: '#',
      },
      {
        id: 'interview-prep',
        title: 'Technical Interview Preparation',
        description: 'Master coding interviews, system design, and behavioral questions for top tech companies.',
        level: 'All Levels',
        duration: '6 weeks',
        link: '#',
      },
      {
        id: 'portfolio-development',
        title: 'Portfolio Development',
        description: 'Build a professional portfolio that showcases your skills and projects effectively.',
        level: 'All Levels',
        duration: '4 weeks',
        link: '#',
      },
      {
        id: 'networking',
        title: 'Professional Networking',
        description: 'Learn to network effectively, build professional relationships, and advance your career.',
        level: 'All Levels',
        duration: '3 weeks',
        link: '#',
      },
    ]
  }
};

function getLevelBadgeVariant(level: string) {
  switch (level) {
    case 'Beginner': return 'secondary';
    case 'Intermediate': return 'default';
    case 'Advanced': return 'destructive';
    default: return 'outline';
  }
}

export default function LearnPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-100 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-gray-900">
                Empowering Minds, Unlocking Potential
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Learn Computer Science with{' '}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                Expert Guidance
              </span>
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full mx-auto"></div>
            
            <div className="space-y-4">
              <p className="text-xl font-semibold text-gray-800 leading-relaxed max-w-2xl mx-auto">
                Master technology skills where everyone has the opportunity to learn at no cost
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Expert Curriculum</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Global Mentors</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Trophy className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">5,000+</div>
              <p className="text-sm text-gray-600">Students Learning</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <p className="text-sm text-gray-600">Expert Mentors</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <p className="text-sm text-gray-600">Countries Reached</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <p className="text-sm text-gray-600">Free Forever</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 space-y-16">
        {/* Course Categories */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Learning Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive computer science learning areas
          </p>
        </div>

        <Tabs defaultValue="ai-ml" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto p-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl">
              {Object.entries(courseCategories).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="flex flex-col items-center space-y-2 p-4 rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-sm font-semibold text-center leading-tight">
                      {category.title}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {Object.entries(courseCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="text-center">
                <Card className="max-w-lg mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 space-y-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-500">
                      <category.icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                        Coming Soon ✨
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        We&apos;re crafting world-class <span className="font-semibold text-blue-600">{category.title.toLowerCase()}</span> courses 
                        with industry experts. Get ready for an amazing learning experience!
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-3xl p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-blue-700/90"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Users className="w-10 h-10 text-white animate-bounce" />
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Need Personalized Help?
              </h2>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Our expert mentors provide 1:1 guidance across all technology domains. 
              Get personalized support for your learning journey and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 text-xl font-black rounded-full hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <Link href="/tutoring">Get a Mentor</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-3 border-white text-white bg-white/10 hover:bg-white hover:text-blue-600 px-10 py-5 text-xl font-black rounded-full hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              >
                <Link href="/events">Join Events</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}