"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, MapPin, Shield, Clock, TrendingUp, ChevronRight, Sparkles, X, Menu } from 'lucide-react';
import { useRouter } from "next/navigation";
import Footer from '../components/footer';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
       
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              DiabPredict
            </h1>
          </motion.div>

       
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('/dashboard')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Go to Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsLoggedIn(false);
                    handleNavigation('/');
                  }}
                  className="text-white/80 hover:text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('/login')}
                  className="text-white/80 hover:text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('/register')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>


          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

     
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/10 p-4"
          >
            <div className="flex flex-col space-y-4">
              {isLoggedIn ? (
                <>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleNavigation('/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-center"
                  >
                    Go to Dashboard
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                      handleNavigation('/');
                    }}
                    className="text-white text-center px-4 py-2 rounded-lg border border-white/20"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleNavigation('/login');
                      setIsMenuOpen(false);
                    }}
                    className="text-white text-center px-4 py-2 rounded-lg"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleNavigation('/register');
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-center"
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    updateDimensions();

    // Add resize listener
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Only create particles on client side
    if (typeof window === 'undefined') return;

    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
    }));
    setParticles(newParticles);
  }, [dimensions]);

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + dimensions.width) % dimensions.width,
        y: (particle.y + particle.speedY + dimensions.height) % dimensions.height,
      })));
    }, 100);

    return () => clearInterval(interval);
  }, [particles.length, dimensions]);

  // Don't render anything on server side
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-200 rounded-full opacity-10"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: particle.id * 0.1,
          }}
        />
      ))}
    </div>
  );
};

const FloatingIcons = () => {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    updateDimensions();

    // Add resize listener
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Don't render anything on server side
  if (typeof window === 'undefined') {
    return null;
  }

  // Define icons only on client side
  const icons = [Activity, Heart, Shield, TrendingUp];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-100 opacity-5"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            rotate: 0
          }}
          animate={{
            y: [null, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={30 + index * 8} />
        </motion.div>
      ))}
    </div>
  );
};


export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: Activity,
      title: "ML-Powered Risk Assessment",
      description: "Machine learning algorithms analyze your health data to predict diabetes risk with high accuracy.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Personalized AI Suggestions",
      description: "Get tailored health recommendations and lifestyle changes based on your risk level and health profile.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Find Nearby Doctors",
      description: "Instantly locate qualified healthcare professionals and specialists in your area for immediate consultation.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is encrypted with bank-level security.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "Track your health metrics over time and receive instant alerts about changes in your risk profile.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor improvements in your health journey with detailed analytics and progress visualization.",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <AnimatedBackground />
      <FloatingIcons />

 
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent" />

      <Navbar />

      {/* Hero Section */}
      <motion.main
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center pt-12 sm:pt-20 pb-16">
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto" />
            </motion.div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold mb-8 leading-tight px-4"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Predict Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Diabetes Risk
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed px-4"
          >
            Harness the power of AI to assess your diabetes risk early. Get personalized health insights,
            AI-powered recommendations, and connect with nearby healthcare professionals instantly.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/register')}
              className="w-full sm:w-auto group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Start Risk Assessment</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/about')}
              className="w-full sm:w-auto border-2 border-white/30 text-white px-6 sm:px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

    
        <motion.div
          variants={itemVariants}
          className="mb-20 px-4"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              Your Health Journey in 3 Simple Steps
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Complete Assessment", desc: "Answer simple questions about your health and lifestyle", icon: Activity },
                { step: "2", title: "Get AI Analysis", desc: "Our advanced AI analyzes your risk and provides personalized insights", icon: Brain },
                { step: "3", title: "Take Action", desc: "Receive tailored suggestions and find nearby healthcare professionals", icon: MapPin }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl"
                  >
                    <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-white/70 text-sm sm:text-base">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

       
        <motion.div
          variants={itemVariants}
          className="mb-20 px-4"
        >
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Advanced Health Intelligence
            </span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center pb-20 px-4"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20">
            <motion.h3
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Take Control of Your Health Today
            </motion.h3>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Do not wait for symptoms to appear. Early detection and prevention are your best defense against diabetes.
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/register')}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 sm:px-10 py-4 rounded-full font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Begin Your Assessment</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
}