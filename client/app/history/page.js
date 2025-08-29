"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Calendar, AlertCircle, User, History, BarChart3, Heart, ChevronRight, Zap, Sparkles, Shield, Clock, LogOut, Menu, X, Home, CheckCircle, XCircle, MapPin, Stethoscope, Brain, Lightbulb, ArrowRight, Loader2, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const icons = [Activity, Heart, Shield, TrendingUp];
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


const Navbar = () => {
  const router = useRouter();
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "New Prediction", href: "/predict", icon: BarChart3 },
    { name: "Records", href: "/history", icon: History, active: true },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
   
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block relative z-20 bg-white/10 backdrop-blur-md border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                DiabPredict
              </h1>
            </motion.div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${item.active
                        ? "bg-white/20 text-white border border-white/30"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </div>

              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-800 hover:bg-red-900 text-red-300 hover:text-red-200 rounded-xl transition-all duration-300 border border-red-800/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden relative z-20 bg-white/10 backdrop-blur-md border-b border-white/20"
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                DiabPredict
              </h1>
            </div>

            <motion.button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 bg-red-800 hover:bg-red-900 text-red-300 rounded-lg transition-all duration-300 border border-red-800/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/10 backdrop-blur-md border-t border-white/20"
      >
        <div className="grid grid-cols-4 py-2">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center py-3 px-2 transition-all duration-300 ${item.active
                  ? "text-cyan-400"
                  : "text-white/60 hover:text-white"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className={`w-6 h-6 mb-1 ${item.active ? "text-cyan-400" : ""}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </>
  );
};


const PredictionCard = ({ prediction, index }) => {
  const [expanded, setExpanded] = useState(false);

  const healthMap = {
    1: "Excellent",
    2: "Very Good",
    3: "Good",
    4: "Fair",
    5: "Poor",
  };

  const ageMap = {
    1: "18–24",
    2: "25–29",
    3: "30–34",
    4: "35–39",
    5: "40–44",
    6: "45–49",
    7: "50–54",
    8: "55–59",
    9: "60–64",
    10: "65–69",
    11: "70–74",
    12: "75–79",
    13: "80+",
  };

  const isHighRisk = prediction.result === "High Risk";
  const hasSuggestion = prediction.suggestion && prediction.suggestion !== "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isHighRisk 
            ? "bg-red-900/30 border border-red-800/50" 
            : "bg-green-900/30 border border-green-800/50"
          }`}>
            {isHighRisk ? (
              <AlertCircle className="w-6 h-6 text-red-400" />
            ) : (
              <CheckCircle className="w-6 h-6 text-green-400" />
            )}
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isHighRisk ? "text-red-400" : "text-green-400"}`}>
              {prediction.result}
            </h3>
            <p className="text-white/60 text-sm">
              <Calendar className="w-4 h-4 inline mr-1" />
              {prediction.created_at.split(".")[0].replace("T", " at ")}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${isHighRisk 
            ? "bg-red-900/30 text-red-300 border border-red-800/50" 
            : "bg-green-900/30 text-green-300 border border-green-800/50"
          }`}>
            {(prediction.probability * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-white/60 text-xs font-medium">BMI</p>
          <p className="text-white text-lg font-bold">{prediction.bmi}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-white/60 text-xs font-medium">Age Group</p>
          <p className="text-white text-lg font-bold">{ageMap[prediction.age]}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-white/60 text-xs font-medium">Blood Pressure</p>
          <p className="text-white text-lg font-bold">{prediction.high_bp === 1 ? "High" : "Normal"}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-white/60 text-xs font-medium">Cholesterol</p>
          <p className="text-white text-lg font-bold">{prediction.high_chol === 1 ? "High" : "Normal"}</p>
        </div>
      </div>

      {/* Expandable Details */}
      {hasSuggestion && (
        <div className="border-t border-white/20 pt-4">
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Previous AI Recommendations Available</span>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-white/60" />
            </motion.div>
          </motion.button>

          <motion.div
            initial={false}
            animate={{
              height: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-800/30 rounded-xl p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <Brain className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-1">Personalized Suggestions</h4>
                    <p className="text-white/80 text-sm">Based on your health assessment</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                  <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                    {prediction.suggestion}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Additional Health Info */}
      <motion.div
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0
        }}
        transition={{ duration: 0.3, delay: expanded ? 0.1 : 0 }}
        className="overflow-hidden"
      >
        <div className="border-t border-white/20 pt-4 mt-4">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Complete Health Profile
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-white/60 text-sm font-medium">General Health</p>
              <p className="text-white font-semibold">{healthMap[prediction.gen_hlth] || "N/A"}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-white/60 text-sm font-medium">Age Category</p>
              <p className="text-white font-semibold">Category {prediction.age}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function HistoryPage() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/history", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <AnimatedBackground />
        <FloatingIcons />
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center"
          >
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg font-medium">Loading your prediction history...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!history) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <AnimatedBackground />
        <FloatingIcons />
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-900/20 backdrop-blur-md rounded-3xl p-8 border border-red-800/30 text-center"
          >
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 text-lg font-medium">Error loading history</p>
            <p className="text-white/70 mt-2">Please try refreshing the page</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden pb-20 md:pb-0">
      <AnimatedBackground />
      <FloatingIcons />
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent" />

      <Navbar />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center"
            >
              <History className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Prediction History
          </h1>
          <p className="text-white/80 text-lg font-medium max-w-2xl mx-auto">
            Complete record of all your diabetes risk assessments and personalized health insights
          </p>
        </motion.div>

        {/* Empty State */}
        {history.predictions.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-500/30">
              <BarChart3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Predictions Yet</h3>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              You have not made any predictions yet. Start your health journey today with our AI-powered risk assessment!
            </p>
            <motion.a
              href="/predict"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-6 h-6" />
              <span>Make Your First Prediction</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        ) : (
          <>
            {/* Stats Overview */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium">Total Assessments</p>
                    <p className="text-2xl font-bold text-white">{history.predictions.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-xl flex items-center justify-center border border-red-500/30">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium">High Risk</p>
                    <p className="text-2xl font-bold text-white">
                      {history.predictions.filter(p => p.result === "High Risk").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center border border-green-500/30">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium">Low Risk</p>
                    <p className="text-2xl font-bold text-white">
                      {history.predictions.filter(p => p.result === "Low Risk").length}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Predictions List */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Your Assessment Records</h2>
                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Most recent first</span>
                </div>
              </div>

              <div className="space-y-4">
                {history.predictions.map((prediction, index) => (
                  <PredictionCard
                    key={prediction.id}
                    prediction={prediction}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

           
          </>
        )}
      </motion.div>
    </div>
  );
}