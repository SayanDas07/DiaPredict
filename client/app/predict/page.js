"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Calendar, AlertCircle, User, History, BarChart3, Heart, ChevronRight, Zap, Sparkles, Shield, Clock, LogOut, Menu, X, Home, CheckCircle, XCircle, MapPin, Stethoscope, Brain, Lightbulb, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + (typeof window !== 'undefined' ? window.innerWidth : 1000)) % (typeof window !== 'undefined' ? window.innerWidth : 1000),
        y: (particle.y + particle.speedY + (typeof window !== 'undefined' ? window.innerHeight : 1000)) % (typeof window !== 'undefined' ? window.innerHeight : 1000),
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-100 opacity-5"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
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
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "New Prediction", href: "/predict", icon: BarChart3, active: true },
    { name: "Records", href: "/history", icon: History },
    { name: "Profile", href: "/profile", icon: User },
  ];
  const router = useRouter();

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

const ResultModal = ({ result, onClose }) => {
  const isHighRisk = result.result === "High Risk";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 border border-white/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center ${isHighRisk ? "bg-red-900/30 border border-red-800/50" : "bg-green-900/30 border border-green-800/50"
            }`}>
            {isHighRisk ? (
              <AlertCircle className="w-10 h-10 text-red-400" />
            ) : (
              <CheckCircle className="w-10 h-10 text-green-400" />
            )}
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Assessment Complete
          </h2>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold border ${isHighRisk
              ? "bg-red-900/70 border-red-800/70 text-red-300"
              : "bg-green-900/70 border-green-800/70 text-green-300"
            }`}>
            {result.result}
          </div>
        </div>

        {/* Probability */}
        <div className="text-center mb-6">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Risk Probability</p>
            <p className="text-3xl font-bold text-white">
              {(result.probability * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white/10 rounded-2xl p-6 mb-6 border border-white/20">
          <p className="text-white text-center font-medium">
            {result.message}
          </p>
        </div>


        <div className="text-center">
          {isHighRisk ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-800/30 rounded-2xl p-4">
                <p className="text-orange-300 text-sm font-medium">
                  Close this window to get personalized AI recommendations and find nearby specialists.
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl hover:from-orange-500 hover:to-red-500 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Detailed Recommendations</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-2xl p-4">
                <p className="text-green-300 text-sm font-medium">
                  Great news! Continue maintaining your healthy lifestyle.
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Monitoring
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};


const HighRiskActions = ({ result, formData, onGetSuggestion, suggestion, loadingSuggestion }) => {
  const [mapEmbedUrl, setMapEmbedUrl] = useState(null);
  const [loadingMap, setLoadingMap] = useState(false);

  const handleFindDoctors = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setLoadingMap(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const directUrl = `https://maps.google.com/maps?q=diabetes+doctor&hl=en&ll=${latitude},${longitude}&z=14&output=embed`;
        setMapEmbedUrl(directUrl);
        setLoadingMap(false);
      },
      () => {
        // Fallback 
        setMapEmbedUrl("https://maps.google.com/maps?q=diabetes+doctor&output=embed");
        setLoadingMap(false);
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* High Risk Alert */}
      <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-red-800/30">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-red-900/50 rounded-2xl flex items-center justify-center border border-red-800/50 flex-shrink-0">
            <AlertCircle className="w-7 h-7 text-red-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">High Risk Assessment</h3>
            <p className="text-white/90 text-lg leading-relaxed">
              Your assessment indicates an elevated diabetes risk. Take proactive steps with personalized recommendations and professional medical guidance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            onClick={onGetSuggestion}
            disabled={loadingSuggestion}
            className="flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!loadingSuggestion ? { scale: 1.02 } : {}}
            whileTap={!loadingSuggestion ? { scale: 0.98 } : {}}
          >
            {loadingSuggestion ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                <span>Get AI Recommendations</span>
              </>
            )}
          </motion.button>

          <motion.button
            onClick={handleFindDoctors}
            disabled={loadingMap}
            className="flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!loadingMap ? { scale: 1.02 } : {}}
            whileTap={!loadingMap ? { scale: 0.98 } : {}}
          >
            {loadingMap ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5" />
                <span>Find Specialists</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* AI Recommendations */}
      {suggestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20"
        >
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center border border-yellow-500/30 flex-shrink-0">
              <Lightbulb className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">AI Health Recommendations</h3>
              <p className="text-white/70">Personalized suggestions based on your assessment</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border border-yellow-800/20 rounded-2xl p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-white/90 leading-relaxed text-lg whitespace-pre-wrap">
                {suggestion}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-blue-900/20 border border-blue-800/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">Important Disclaimer</h4>
                <p className="text-white/80 text-sm">
                  These are AI-generated suggestions for informational purposes only. Please consult with a healthcare professional for medical advice.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/*  Map */}
      {mapEmbedUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20"
        >
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center border border-red-500/30 flex-shrink-0">
              <Stethoscope className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">Nearby Diabetes Specialists</h3>
              <p className="text-white/70">Find qualified healthcare professionals in your area</p>
            </div>
          </div>
          
          <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-gray-900/50 h-96">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Nearby Diabetes Doctors"
              className="w-full h-full"
            ></iframe>
          </div>

          <div className="mt-6 bg-red-900/20 border border-red-800/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Schedule a Consultation</h4>
                <p className="text-white/90 text-sm">
                  Contact a qualified endocrinologist or primary care physician for proper diagnosis, treatment planning, and ongoing care management.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function PredictPage() {
  const [formData, setFormData] = useState({
    HighBP: "",
    GenHlth: "",
    BMI: "",
    Age: "",
    HighChol: "",
    CholCheck: "",
    Income: "",
    PhysHlth: "",
  });

  const [result, setResult] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHighRiskActions, setShowHighRiskActions] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setSuggestion(null);
    setShowHighRiskActions(false);

    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Prediction failed");
      const json = await res.json();
      setResult(json);
      setShowModal(true);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (result && result.result === "High Risk") {
      setShowHighRiskActions(true);
    }
  };

  const handleGetSuggestion = async () => {
    if (!result) return;
    setLoadingSuggestion(true);

    const payload = {
      features: [
        parseFloat(formData.HighBP),
        parseFloat(formData.GenHlth),
        parseFloat(formData.BMI),
        parseFloat(formData.Age),
        parseFloat(formData.HighChol),
        parseFloat(formData.CholCheck),
        parseFloat(formData.Income),
        parseFloat(formData.PhysHlth),
      ],
      prediction: result.prediction,
      probability: result.probability,
    };

    try {
      const res = await fetch("http://localhost:5000/api/suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to get suggestion");
      const json = await res.json();
      setSuggestion(json.suggestion);
    } catch (err) {
      setSuggestion(`Error: ${err.message}`);
    } finally {
      setLoadingSuggestion(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden pb-20 md:pb-0">
      <AnimatedBackground />
      <FloatingIcons />
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent" />

      <Navbar />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-4"
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
              <BarChart3 className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Diabetes Risk Assessment
          </h1>
          <p className="text-white/80 text-lg font-medium max-w-2xl mx-auto">
            Get personalized insights about your diabetes risk with our advanced AI-powered analysis. 
            Please provide accurate information for the most reliable results.
          </p>
        </motion.div>

        {/* Assessment Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* High Blood Pressure */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  High Blood Pressure Status
                </label>
                <select
                  name="HighBP"
                  value={formData.HighBP}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="" className="bg-gray-800 text-white">Select status</option>
                  <option value="0" className="bg-gray-800 text-white">No High Blood Pressure</option>
                  <option value="1" className="bg-gray-800 text-white">High Blood Pressure Diagnosed</option>
                </select>
              </div>

              {/* General Health */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Overall General Health
                </label>
                <select
                  name="GenHlth"
                  value={formData.GenHlth}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="" className="bg-gray-800 text-white">Rate your health</option>
                  <option value="1" className="bg-gray-800 text-white">Excellent Health</option>
                  <option value="2" className="bg-gray-800 text-white">Very Good Health</option>
                  <option value="3" className="bg-gray-800 text-white">Good Health</option>
                  <option value="4" className="bg-gray-800 text-white">Fair Health</option>
                  <option value="5" className="bg-gray-800 text-white">Poor Health</option>
                </select>
              </div>

              {/* BMI */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Body Mass Index (BMI)
                </label>
                <input
                  type="number"
                  name="BMI"
                  step="0.1"
                  placeholder="Enter your BMI (e.g., 25.3)"
                  value={formData.BMI}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                <p className="text-white/60 text-xs">
                  Calculate: Weight (kg) ÷ Height (m)²
                </p>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Age Category
                </label>
                <select
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="" className="bg-gray-800 text-white">Select age range</option>
                  <option value="1" className="bg-gray-800 text-white">18–24 years</option>
                  <option value="2" className="bg-gray-800 text-white">25–29 years</option>
                  <option value="3" className="bg-gray-800 text-white">30–34 years</option>
                  <option value="4" className="bg-gray-800 text-white">35–39 years</option>
                  <option value="5" className="bg-gray-800 text-white">40–44 years</option>
                  <option value="6" className="bg-gray-800 text-white">45–49 years</option>
                  <option value="7" className="bg-gray-800 text-white">50–54 years</option>
                  <option value="8" className="bg-gray-800 text-white">55–59 years</option>
                  <option value="9" className="bg-gray-800 text-white">60–64 years</option>
                  <option value="10" className="bg-gray-800 text-white">65–69 years</option>
                  <option value="11" className="bg-gray-800 text-white">70–74 years</option>
                  <option value="12" className="bg-gray-800 text-white">75–79 years</option>
                  <option value="13" className="bg-gray-800 text-white">80+ years</option>
                </select>
              </div>

              {/* High Cholesterol */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  High Cholesterol Status
                </label>
                <select
                  name="HighChol"
                  value={formData.HighChol}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="" className="bg-gray-800 text-white">Select status</option>
                  <option value="0" className="bg-gray-800 text-white">No High Cholesterol</option>
                  <option value="1" className="bg-gray-800 text-white">High Cholesterol Diagnosed</option>
                </select>
              </div>

              {/* Cholesterol Check */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Cholesterol Check (Past 5 Years)
                </label>
                <select
                  name="CholCheck"
                  value={formData.CholCheck}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="" className="bg-gray-800 text-white">Select status</option>
                  <option value="0" className="bg-gray-800 text-white">No Recent Check</option>
                  <option value="1" className="bg-gray-800 text-white">Checked Within 5 Years</option>
                </select>
              </div>

              {/* Income */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Annual Household Income
                </label>
                <select
                  name="Income"
                  value={formData.Income}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="" className="bg-gray-800 text-white">Select income range</option>
                  <option value="1" className="bg-gray-800 text-white">Less than $10,000</option>
                  <option value="2" className="bg-gray-800 text-white">$10,000–$15,000</option>
                  <option value="3" className="bg-gray-800 text-white">$15,000–$20,000</option>
                  <option value="4" className="bg-gray-800 text-white">$20,000–$25,000</option>
                  <option value="5" className="bg-gray-800 text-white">$25,000–$35,000</option>
                  <option value="6" className="bg-gray-800 text-white">$35,000–$50,000</option>
                  <option value="7" className="bg-gray-800 text-white">$50,000–$75,000</option>
                  <option value="8" className="bg-gray-800 text-white">$75,000 or more</option>
                </select>
              </div>

              {/* Physical Health */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-white font-semibold text-sm">
                  Physical Health Issues (Past 30 Days)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="PhysHlth"
                    min="0"
                    max="30"
                    placeholder="Number of days (0-30)"
                    value={formData.PhysHlth}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Calendar className="w-5 h-5 text-white/50" />
                  </div>
                </div>
                <p className="text-white/60 text-xs">
                  Enter the number of days you experienced poor physical health in the past month (0 = none, 30 = every day)
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/20">
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Your Data...</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-6 h-6" />
                    <span>Generate Risk Assessment</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* High Risk Actions */}
        {showHighRiskActions && result && result.result === "High Risk" && (
          <HighRiskActions
            result={result}
            formData={formData}
            onGetSuggestion={handleGetSuggestion}
            suggestion={suggestion}
            loadingSuggestion={loadingSuggestion}
          />
        )}

        {/* Error Display */}
        {result && result.error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 backdrop-blur-md rounded-2xl p-6 border border-red-800/50"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="font-semibold text-red-400 mb-1">Assessment Error</h3>
                <p className="text-white/90">{result.error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Result Modal */}
      {showModal && result && !result.error && (
        <ResultModal
          result={result}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}