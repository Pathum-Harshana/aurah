"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = "/"; // Redirect to home after success
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Welcome Back</h2>
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="email" placeholder="University Email" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="password" placeholder="Password" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setPassword(e.target.value)} required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
            <LogIn size={20} /> Sign In
          </button>
        </div>
      </form>
    </div>
  );
}