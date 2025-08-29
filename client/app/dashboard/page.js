   "use client";

    import { useEffect, useState } from "react";
    import { motion } from "framer-motion";
    import { Activity, TrendingUp, Calendar, AlertCircle, User, History, BarChart3, Heart, ChevronRight, Zap, Sparkles, Shield, Clock, LogOut, Menu, X, Home } from "lucide-react";

    
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
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

      const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: Home, active: true },
        { name: "New Prediction", href: "/predict", icon: BarChart3 },
        { name: "Records", href: "/history", icon: History },
        { name: "Profile", href: "/profile", icon: User },
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
          {/* Desktop Navbar */}
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

    export default function DashboardPage() {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        async function fetchDashboard() {
          try {
            const res = await fetch("http://localhost:5000/api/dashboard", {
              method: "GET",
              credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch");
            const json = await res.json();
            setData(json);
          } catch (err) {
            console.error("Error:", err);
          } finally {
            setLoading(false);
          }
        }
        fetchDashboard();
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
                    Loading Health Dashboard
                  </motion.h2>
                  <p className="text-slate-300 text-lg">Preparing your personalized alleys...</p>
                </div>
              </motion.div>
            </div>
          </div>
        );
      }

      if (!data) {
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
                <h2 className="text-2xl font-bold text-white mb-3">Dashboard Unavailable</h2>
                <p className="text-white/70">Unable to load your health dashboard. Please try again.</p>
              </motion.div>
            </div>
          </div>
        );
      }

      const getRiskColor = (result) => {
        return result === "High Risk" ? "text-red-400" : "text-green-400";
      };

      const getRiskBgColor = (result) => {
        return result === "High Risk"
          ? "bg-red-900/70 border-red-800/70 text-red-300"
          : "bg-green-900/70 border-green-800/70 text-green-300";
      };

      const getRiskIconBg = (result) => {
        return result === "High Risk" ? "bg-red-900/40" : "bg-green-900/40";
      };

      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden pb-20 md:pb-0">
          <AnimatedBackground />
          <FloatingIcons />

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
                      Welcome back,
                    </span>
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-1 break-words">
                      {data.user.username}
                    </span>
                  </motion.h1>
                  <p className="text-white/80 text-sm sm:text-base md:text-lg font-medium max-w-xl mx-auto sm:mx-0">
                    Your personalized health insights 
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
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            >
              {[
                {
                  label: "Total Predictions",
                  value: data.recent_predictions.length,
                  subtitle: "Lifetime predictions",
                  icon: BarChart3,
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  label: "Latest Status",
                  value: data.recent_predictions[0] ? data.recent_predictions[0].result : "No Data",
                  subtitle: "Most recent result",
                  icon: Activity,
                  gradient: data.recent_predictions[0] && data.recent_predictions[0].result === "High Risk" ? "from-red-600 to-red-500" : "from-green-600 to-green-500",
                  isRisk: true
                },
                {
                  label: "Risk Probability",
                  value: data.recent_predictions[0] ? `${(data.recent_predictions[0].probability * 100).toFixed(1)}%` : "--",
                  subtitle: "Latest assessment",
                  icon: TrendingUp,
                  gradient: "from-purple-500 to-indigo-500"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                  }}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">{stat.label}</p>
                      <p className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 ${stat.isRisk && stat.value !== "No Data" ? getRiskColor(stat.value) : "text-white"}`}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-white/60 font-medium">{stat.subtitle}</p>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} bg-opacity-20 border border-white/10 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

    
            {data.recent_predictions.length > 0 ? (
              <motion.div
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl flex items-center justify-center mr-4 border border-emerald-500/30">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                    </div>
                    Recent Predictions
                  </h2>
                  <motion.a
                    href="/history"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center text-sm group self-start sm:self-auto"
                    whileHover={{ scale: 1.05 }}
                  >
                    View Detailed Insights
                    <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/5">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10">
                      <thead className="bg-white/10">
                        <tr>
                          {["Date", "Result", "Probability"].map((header) => (
                            <th key={header} className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs font-bold text-white/70 uppercase tracking-wider">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white/5 divide-y divide-white/5">
                        {data.recent_predictions.map((p) => (
                          <motion.tr
                            key={p.id}
                            className="hover:bg-white/10 transition-colors duration-200"
                            whileHover={{ scale: 1.01 }}
                          >
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-white/90 break-words">
                              {formatDate(p.created_at)}
                            </td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${getRiskBgColor(p.result)}`}>
                                {p.result}
                              </span>
                            </td>
                            <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-white">
                              {(p.probability * 100).toFixed(1)}%
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {data.recent_predictions.length >= 5 && (
                  <div className="text-center mt-6 sm:mt-8">
                    <motion.a
                      href="/history"
                      className="inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20 hover:border-white/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View All Predictions
                      <TrendingUp className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5 ml-2 sm:ml-3" />
                    </motion.a>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 text-center border border-white/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5"></div>
                <div className="relative">
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
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-cyan-500/30"
                  >
                    <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400" />
                  </motion.div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Ready to Begin Your Health Journey?</h2>
                  <p className="text-white/70 mb-6 sm:mb-8 md:mb-10 max-w-lg mx-auto text-sm sm:text-base md:text-lg font-medium">
                    Get personalized diabetes risk assessments powered by advanced AI technology. Start monitoring your health today with precision and care.
                  </p>
                  <motion.a
                    href="/predict"
                    className="group inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-3xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-bold text-sm sm:text-base md:text-lg"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(6, 182, 212, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BarChart3 className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 mr-2 sm:mr-3" />
                    Start Your First Assessment
                    <ChevronRight className="w-4 sm:w-5 md:w-5 h-4 sm:h-5 md:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      );
    }