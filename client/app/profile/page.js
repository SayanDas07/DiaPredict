"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Calendar, AlertCircle, User, History, BarChart3, Heart, ChevronRight, Zap, Sparkles, Shield, Clock, LogOut, Menu, X, Home, Mail, UserCheck, Settings, Edit3, Save, RefreshCw, PieChart, LineChart, Target, Gauge, ArrowUp, ArrowDown, CheckCircle, XCircle, Brain, Lightbulb, Eye, TrendingDown } from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart as RechartsBarChart, Bar, Area, AreaChart, RadialBarChart, RadialBar, Pie } from 'recharts';

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


const Navbar = () => {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "New Prediction", href: "/predict", icon: BarChart3 },
    { name: "Records", href: "/history", icon: History },
    { name: "Profile", href: "/profile", icon: User, active: true },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/";
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

const FloatingIcons = () => {
  const icons = [User, Heart, Shield, Settings];

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


const RiskDistributionChart = ({ data }) => {
  const COLORS = {
    'High Risk': '#EF4444',
    'Low Risk': '#22C55E',
  };

  const pieData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value: value,
    color: COLORS[key]
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/20">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-cyan-400">{data.value} predictions</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            formatter={(value) => <span className="text-white">{value}</span>}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};


const RiskTrendChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/20">
          <p className="text-white font-medium">{`Assessment ${label}`}</p>
          <p className="text-cyan-400">{`Risk Score: ${(payload[0].value * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="index" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            domain={[0, 1]}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="probability"
            stroke="#06B6D4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#riskGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


const BMIDistributionChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/20">
          <p className="text-white font-medium">{`BMI: ${label}`}</p>
          <p className="text-green-400">{`Frequency: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="bmi" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            fill="#22C55E"
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Health Score Gauge Component
const HealthScoreGauge = ({ score }) => {
  const data = [
    { name: 'Score', value: score, fill: score >= 70 ? '#22C55E' : score >= 40 ? '#F59E0B' : '#EF4444' }
  ];

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={data}>
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            fill={data[0].fill}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-3xl font-bold fill-white"
          >
            {score}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch profile
        const profileRes = await fetch("http://localhost:5000/api/profile", { 
          credentials: "include" 
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        // Fetch history for insights
        const historyRes = await fetch("http://localhost:5000/api/history", { 
          credentials: "include" 
        });
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setHistory(historyData);

          // Process data for insights
          if (historyData.predictions && historyData.predictions.length > 0) {
            const processedInsights = processInsights(historyData.predictions);
            setInsights(processedInsights);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const processInsights = (predictions) => {
    // Risk distribution
    const riskDistribution = {
      'High Risk': predictions.filter(p => p.result === 'High Risk').length,
      'Low Risk': predictions.filter(p => p.result === 'Low Risk').length,
    };

    // Risk trend over time
    const riskTrend = predictions.map((p, index) => ({
      index: index + 1,
      probability: p.probability,
      result: p.result,
      date: p.created_at
    }));

    // BMI distribution
    const bmiCounts = {};
    predictions.forEach(p => {
      const bmi = Math.round(p.bmi);
      bmiCounts[bmi] = (bmiCounts[bmi] || 0) + 1;
    });
    
    const bmiDistribution = Object.entries(bmiCounts)
      .map(([bmi, count]) => ({ bmi: parseInt(bmi), count }))
      .sort((a, b) => a.bmi - b.bmi);

    // Average risk score
    const avgRiskScore = predictions.reduce((sum, p) => sum + p.probability, 0) / predictions.length;
    
    // Health trends
    const recentPredictions = predictions.slice(-5);
    const recentAvgRisk = recentPredictions.reduce((sum, p) => sum + p.probability, 0) / recentPredictions.length;
    const olderPredictions = predictions.slice(0, -5);
    const olderAvgRisk = olderPredictions.length > 0 
      ? olderPredictions.reduce((sum, p) => sum + p.probability, 0) / olderPredictions.length 
      : recentAvgRisk;

    const riskTrend_direction = recentAvgRisk > olderAvgRisk ? 'increasing' : 'decreasing';
    
    // Health score calculation (0-100)
    const healthScore = Math.round((1 - avgRiskScore) * 100);

    // Risk factors analysis
    const highBPCount = predictions.filter(p => p.high_bp === 1).length;
    const highCholCount = predictions.filter(p => p.high_chol === 1).length;
    
    return {
      riskDistribution,
      riskTrend,
      bmiDistribution,
      avgRiskScore,
      healthScore,
      riskTrend_direction,
      recentAvgRisk,
      olderAvgRisk,
      totalPredictions: predictions.length,
      highBPPercentage: (highBPCount / predictions.length) * 100,
      highCholPercentage: (highCholCount / predictions.length) * 100,
      insights: generateHealthInsights(predictions, avgRiskScore, riskTrend_direction)
    };
  };

  const generateHealthInsights = (predictions, avgRisk, trend) => {
    const insights = [];
    
    if (avgRisk < 0.3) {
      insights.push({
        type: 'positive',
        icon: CheckCircle,
        title: 'Excellent Risk Profile',
        description: 'Your average diabetes risk is low. Keep maintaining your healthy lifestyle!'
      });
    } else if (avgRisk > 0.7) {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'High Risk Pattern',
        description: 'Consider consulting with a healthcare provider about preventive measures.'
      });
    }

    if (trend === 'decreasing') {
      insights.push({
        type: 'positive',
        icon: TrendingDown,
        title: 'Improving Health Trend',
        description: 'Your recent assessments show decreasing risk - great progress!'
      });
    } else if (trend === 'increasing') {
      insights.push({
        type: 'warning',
        icon: TrendingUp,
        title: 'Rising Risk Trend',
        description: 'Recent assessments show increasing risk. Consider lifestyle adjustments.'
      });
    }

    const avgBMI = predictions.reduce((sum, p) => sum + p.bmi, 0) / predictions.length;
    if (avgBMI > 30) {
      insights.push({
        type: 'info',
        icon: Target,
        title: 'BMI Focus Area',
        description: `Your average BMI is ${avgBMI.toFixed(1)}. Weight management could help reduce risk.`
      });
    }

    return insights;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent" />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-20 h-20 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
              <div className="absolute inset-0 w-20 h-20 border-2 border-purple-400/20 rounded-full animate-ping mx-auto" />
            </motion.div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <motion.h2
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-2xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Loading Profile & Insights
              </motion.h2>
              <p className="text-slate-300 text-lg">Analyzing your health data...</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 max-w-md mx-4"
          >
            <AlertCircle className="mx-auto h-16 w-16 text-red-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-3">Profile Unavailable</h2>
            <p className="text-white/70">Unable to load your profile information. Please try again.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden pb-20 md:pb-0">
      <AnimatedBackground />
      <FloatingIcons />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent" />

      <Navbar />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-center sm:text-left flex-1">
              <motion.h1
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Your Health Profile
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-1 break-words">
                  {profile.user.username}
                </span>
              </motion.h1>
              <p className="text-white/80 text-sm sm:text-base md:text-lg font-medium max-w-xl mx-auto sm:mx-0">
                Your Comprehensive health insights! 
              </p>
            </div>
            <motion.div
              className="flex justify-center sm:justify-end flex-shrink-0"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <User className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Information Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {/* Account Information Card */}
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
            }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mr-3 border border-blue-500/30">
                  <UserCheck className="w-5 h-5 text-blue-400" />
                </div>
                Account Info
              </h3>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Username</label>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                  <User className="w-5 h-5 text-white/60" />
                  <span className="text-white font-medium">{profile.user.username}</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Email</label>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                  <Mail className="w-5 h-5 text-white/60" />
                  <span className="text-white font-medium">{profile.user.email}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Health Statistics Card */}
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
            }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl flex items-center justify-center mr-3 border border-emerald-500/30">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
              </div>
              Health Stats
            </h3>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Total Predictions</label>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-white/60" />
                    <span className="text-white font-medium">Assessments</span>
                  </div>
                  <span className="text-2xl font-bold text-cyan-400">{profile.stats.prediction_count}</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Last Assessment</label>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-white/60" />
                    <span className="text-white font-medium">Recent</span>
                  </div>
                  <span className="text-lg font-bold text-purple-400">{formatDate(profile.stats.last_prediction_date)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Health Score Card */}
          {insights && (
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
              }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mr-3 border border-yellow-500/30">
                  <Gauge className="w-5 h-5 text-yellow-400" />
                </div>
                Health Score
              </h3>

              <div className="text-center">
                <HealthScoreGauge score={insights.healthScore} />
                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {insights.riskTrend_direction === 'decreasing' ? (
                      <ArrowDown className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowUp className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`font-medium ${insights.riskTrend_direction === 'decreasing' ? 'text-green-400' : 'text-red-400'}`}>
                      {insights.riskTrend_direction === 'decreasing' ? 'Improving' : 'Needs Attention'}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Based on {insights.totalPredictions} assessments
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Health Insights Section */}
        {insights && (
          <>
            {/* Key Insights Cards */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl flex items-center justify-center mr-3 border border-purple-500/30">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                AI-Powered Health Insights
              </h2>
              
              {insights.insights.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insights.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                        insight.type === 'positive' 
                          ? 'border-green-500/30 hover:border-green-500/50' 
                          : insight.type === 'warning'
                          ? 'border-red-500/30 hover:border-red-500/50'
                          : 'border-blue-500/30 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          insight.type === 'positive' 
                            ? 'bg-green-500/20 border border-green-500/30' 
                            : insight.type === 'warning'
                            ? 'bg-red-500/20 border border-red-500/30'
                            : 'bg-blue-500/20 border border-blue-500/30'
                        }`}>
                          <insight.icon className={`w-6 h-6 ${
                            insight.type === 'positive' 
                              ? 'text-green-400' 
                              : insight.type === 'warning'
                              ? 'text-red-400'
                              : 'text-blue-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-2">{insight.title}</h4>
                          <p className="text-white/80 text-sm leading-relaxed">{insight.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                  <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">More Data Needed</h3>
                  <p className="text-white/70">Complete more assessments to unlock personalized insights!</p>
                </div>
              )}
            </motion.div>

            {/* Analytics Dashboard */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mr-3 border border-cyan-500/30">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                Health Analytics Dashboard
              </h2>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Distribution Chart */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <PieChart className="w-6 h-6 text-purple-400 mr-3" />
                    Risk Distribution
                  </h3>
                  <RiskDistributionChart data={insights.riskDistribution} />
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-400">{insights.riskDistribution['High Risk']}</p>
                      <p className="text-white/60 text-sm">High Risk</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">{insights.riskDistribution['Low Risk']}</p>
                      <p className="text-white/60 text-sm">Low Risk</p>
                    </div>
                  </div>
                </motion.div>

                {/* Risk Trend Chart */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <LineChart className="w-6 h-6 text-cyan-400 mr-3" />
                    Risk Trend Over Time
                  </h3>
                  <RiskTrendChart data={insights.riskTrend} />
                  <div className="mt-4 text-center">
                    <p className="text-white/80 text-sm">
                      Average Risk Score: <span className="text-cyan-400 font-bold">{(insights.avgRiskScore * 100).toFixed(1)}%</span>
                    </p>
                  </div>
                </motion.div>

                {/* BMI Distribution Chart */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <BarChart3 className="w-6 h-6 text-green-400 mr-3" />
                    BMI Distribution
                  </h3>
                  <BMIDistributionChart data={insights.bmiDistribution} />
                  <div className="mt-4 text-center">
                    <p className="text-white/80 text-sm">
                      Most Common BMI: <span className="text-green-400 font-bold">
                        {insights.bmiDistribution.reduce((max, curr) => curr.count > max.count ? curr : max, insights.bmiDistribution[0])?.bmi || 'N/A'}
                      </span>
                    </p>
                  </div>
                </motion.div>

                {/* Health Metrics Summary */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Heart className="w-6 h-6 text-red-400 mr-3" />
                    Health Metrics Summary
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span className="text-white/80">High Blood Pressure</span>
                      </div>
                      <span className="text-red-400 font-bold">{insights.highBPPercentage.toFixed(0)}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span className="text-white/80">High Cholesterol</span>
                      </div>
                      <span className="text-yellow-400 font-bold">{insights.highCholPercentage.toFixed(0)}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        <span className="text-white/80">Overall Health Score</span>
                      </div>
                      <span className="text-cyan-400 font-bold">{insights.healthScore}/100</span>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/30">
                      <div className="flex items-center space-x-3 mb-2">
                        <Eye className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 font-semibold">Quick Insight</span>
                      </div>
                      <p className="text-white/80 text-sm">
                        {insights.riskTrend_direction === 'decreasing' 
                          ? "Your recent health trend is positive! Keep up the good work with your current lifestyle choices."
                          : "Consider reviewing your recent lifestyle choices. Small improvements can make a big difference in your health outcomes."
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}

        {/* No Data State */}
        {!insights && profile.stats.prediction_count === 0 && (
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-500/30">
              <BarChart3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Health Data Yet</h3>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Complete your first health assessment to unlock personalized insights and analytics!
            </p>
            <motion.a
              href="/predict"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-6 h-6" />
              <span>Start Health Assessment</span>
              <ChevronRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}