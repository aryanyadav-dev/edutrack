import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

interface LandingPageProps {
  onSignInClick: () => void;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function LandingPage({ onSignInClick }: LandingPageProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-50 bg-opacity-70 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
       <div className="max-w-8xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              className="flex items-center space-x-4 justify-start"
              whileHover={{ scale: 1.02 }}
            >
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">EduERP</span>
            </motion.div>
            <motion.button
              onClick={onSignInClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-white text-indigo-900 font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                Education Management
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400"
                  style={{
                    WebkitTextStroke: '1px transparent', 
                  }}
                >
                  Reimagined
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-200">
                Empower your educational journey with our comprehensive platform designed for modern learning experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.button
                onClick={onSignInClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-indigo-900 text-lg font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Login
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        className="py-24 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why Choose EduERP?</h2>
            <p className="mt-4 text-xl text-gray-300">
              Everything you need to manage your educational institution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-12 w-12 text-indigo-400" />}
              title="Smart Learning"
              description="AI-powered personalized learning paths and adaptive assessments to maximize student engagement and success."
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-indigo-400" />}
              title="Collaborative Space"
              description="Real-time collaboration tools, discussion forums, and group projects to foster peer learning and engagement."
            />
            <FeatureCard
              icon={<Award className="h-12 w-12 text-indigo-400" />}
              title="Progress Tracking"
              description="Comprehensive analytics and progress monitoring tools to measure and improve learning outcomes."
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/20"
    >
      <div className="mb-6 p-3 rounded-xl bg-white/10">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-center text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default LandingPage;
