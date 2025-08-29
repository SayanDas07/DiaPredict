'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Eye, EyeOff, Lock, User, Mail, ArrowLeft, AlertCircle, CheckCircle, Loader, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + (typeof window !== 'undefined' ? window.innerWidth : 800)) % (typeof window !== 'undefined' ? window.innerWidth : 800),
        y: (particle.y + particle.speedY + (typeof window !== 'undefined' ? window.innerHeight : 600)) % (typeof window !== 'undefined' ? window.innerHeight : 600),
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-purple-300 rounded-full opacity-15"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: particle.id * 0.15,
          }}
        />
      ))}
    </div>
  );
};

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    passwordMatch: true,
    emailValid: true,
    usernameValid: true,
    passwordValid: true,
  });

  const router = useRouter();

  // Validation functions
  const validateEmail = (email) => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const validateUsername = (username) => {
    const usernameRegex = /^\w{3,20}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear message when user starts typing
    if (message) {
      setMessage('');
      setMessageType('');
    }

    // Real-time validation
    const newValidationErrors = { ...validationErrors };

    if (name === 'email') {
      newValidationErrors.emailValid = value === '' || validateEmail(value);
    }

    if (name === 'username') {
      newValidationErrors.usernameValid = value === '' || validateUsername(value);
    }

    if (name === 'password') {
      newValidationErrors.passwordValid = value === '' || validatePassword(value);
      newValidationErrors.passwordMatch = value === form.confirmPassword || form.confirmPassword === '';
    }

    if (name === 'confirmPassword') {
      newValidationErrors.passwordMatch = value === form.password || value === '';
    }

    setValidationErrors(newValidationErrors);
  };

  const handleSubmit = async () => {
    // Frontend validation before sending to backend
    if (!validateEmail(form.email)) {
      setMessage('Only Gmail addresses are allowed');
      setMessageType('error');
      return;
    }

    if (!validateUsername(form.username)) {
      setMessage('Username must be 3-20 characters and contain only letters, numbers, or underscores');
      setMessageType('error');
      return;
    }

    if (!validatePassword(form.password)) {
      setMessage('Password must be at least 6 characters long and include uppercase, lowercase, number, and special character');
      setMessageType('error');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch("https://diapredict-sxlr.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setMessageType('success');
        setTimeout(() => (router.push("/login")), 2000);
      } else {
        setMessage(data.error || "Registration failed. Please try again.");
        setMessageType('error');
      }
    } catch (err) {
      setMessage("Network error. Please check your connection and try again.");
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      form.username && 
      form.email && 
      form.password && 
      form.confirmPassword &&
      validationErrors.emailValid &&
      validationErrors.usernameValid &&
      validationErrors.passwordValid &&
      validationErrors.passwordMatch
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center p-4">
      <AnimatedBackground />
      

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-500/5 to-transparent" />

      {/* Back to home button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white/80 hover:text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </motion.button>


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
              Join DiabetesPredict AI
            </h1>
            <p className="text-white/70">
              Create your account to start your health journey
            </p>
          </motion.div>

          {/* Alert Messages */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={`mb-6 p-4 rounded-xl backdrop-blur-sm ${
                  messageType === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : 'bg-red-500/20 border border-red-500/30'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {messageType === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                  <p className={`text-sm ${messageType === 'success' ? 'text-green-200' : 'text-red-200'}`}>
                    {message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Fields */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/50" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                    !validationErrors.usernameValid ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-purple-500'
                  }`}
                  placeholder="your_username_example"
                />
              </div>
              {!validationErrors.usernameValid && form.username && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-xs mt-1 flex items-center space-x-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>Username must be 3-20 characters (letters, numbers, underscore only)</span>
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/50" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                    !validationErrors.emailValid ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-purple-500'
                  }`}
                  placeholder="your.name@gmail.com"
                />
              </div>
              {!validationErrors.emailValid && form.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-xs mt-1 flex items-center space-x-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>Only Gmail addresses are allowed</span>
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                    !validationErrors.passwordValid ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-purple-500'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!validationErrors.passwordValid && form.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-xs mt-1 flex items-center space-x-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>Password requirements not met</span>
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/50" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                    !validationErrors.passwordMatch ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-purple-500'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!validationErrors.passwordMatch && form.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-xs mt-1 flex items-center space-x-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>Passwords do not match</span>
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !isFormValid()}
                whileHover={!loading && isFormValid() ? { 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.6)",
                } : {}}
                whileTap={!loading && isFormValid() ? { scale: 0.98 } : {}}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  loading || !isFormValid()
                    ? 'bg-gray-500/50 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:shadow-2xl'
                } text-white shadow-xl`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Password Requirements */}
          <motion.div variants={itemVariants} className="mt-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="text-white/90 text-sm font-semibold mb-2">Requirements:</h4>
              <ul className="text-white/60 text-xs space-y-1">
                <li className={`flex items-center space-x-2 ${validationErrors.usernameValid ? 'text-white/60' : 'text-red-300'}`}>
                  <span>• Username: 3-20 characters (letters, numbers, _ only)</span>
                </li>
                <li className={`flex items-center space-x-2 ${validationErrors.emailValid ? 'text-white/60' : 'text-red-300'}`}>
                  <span>• Email: Must be a Gmail address (@gmail.com)</span>
                </li>
                <li className={`flex items-center space-x-2 ${validationErrors.passwordValid ? 'text-white/60' : 'text-red-300'}`}>
                  <span>• Password: 6+ chars, upper/lower case, number, special char</span>
                </li>
                <li className={`flex items-center space-x-2 ${validationErrors.passwordMatch ? 'text-white/60' : 'text-red-300'}`}>
                  <span>• Passwords must match</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div variants={itemVariants} className="mt-8 text-center space-y-4">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-white/70 text-sm">
              Already have an account?{' '}
              <button 
                onClick={() => router.push('/login')}
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors bg-none border-none cursor-pointer"
              >
                Sign in here
              </button>
            </p>
            <p className="text-white/50 text-xs">
              By creating an account, you agree to our{' '}
              <Link className="text-blue-400 hover:text-blue-300 transition-colors bg-none border-none cursor-pointer" href="/terms">Terms of Service
              </Link>
              
              {' '}and{' '}
              <Link className="text-blue-400 hover:text-blue-300 transition-colors bg-none border-none cursor-pointer" href="/privacy">Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-16 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-2xl"
        />
      </motion.div>
    </div>
  );
}