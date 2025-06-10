import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Sparkles, Code, Zap, Rocket } from 'lucide-react';
import axios from "axios";
import { BACKEND_URL } from '../config';

export function Home() {
  const [prompt, setPrompt] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder', { state: { prompt } });
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6 relative">
              <div className="relative">
                <Wand2 className="w-16 h-16 text-cyan-400 drop-shadow-2xl" />
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 tracking-tight">
              Website Builder AI
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your imagination into reality with our cutting-edge AI website builder
            </p>

            {/* Feature Icons */}
            <div className="flex justify-center space-x-8 mb-12">
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-sm text-gray-400">Smart Code</span>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">Lightning Fast</span>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-sm text-gray-400">Ready to Launch</span>
              </div>
            </div>
          </div>

          {/* Main Form Container */}
          <div className="relative">
            {/* Glassmorphism Container */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-3">
                    Describe Your Vision
                  </label>
                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="I want to create a modern e-commerce website for selling handmade jewelry with a minimalist design, dark color scheme, and smooth animations..."
                      className="w-full h-40 p-6 bg-black/50 text-gray-100 border border-white/20 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none placeholder-gray-500 backdrop-blur-sm transition-all duration-300 text-lg leading-relaxed"
                      onFocus={() => setIsHovered(true)}
                      onBlur={() => setIsHovered(false)}
                    />
                    <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl"></div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 active:translate-y-0"
                >
                  <span className="relative flex items-center justify-center">
                    Generate My Website
                    <Wand2 className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </button>
              </form>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-500/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"></div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Powered by advanced AI • No coding required • Professional results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}