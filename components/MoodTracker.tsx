"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, CloudRain, Sun } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// 1. Define the "Shape" of the props (This fixes the TS error)
interface MoodTrackerProps {
  onUpdate: () => void;
}

// 2. Tell the component to use these props
export default function MoodTracker({ onUpdate }: MoodTrackerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodOptions = [
    { level: 1, emoji: <CloudRain />, label: "Stressed", color: "text-red-500", bg: "bg-red-50" },
    { level: 3, emoji: <Meh />, label: "Neutral", color: "text-yellow-500", bg: "bg-yellow-50" },
    { level: 5, emoji: <Sun />, label: "Radiant", color: "text-blue-500", bg: "bg-blue-50" },
  ];

  const handleMoodSelect = async (score: number) => {
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('mood_logs')
      .insert([{ mood_score: score }]);

    setIsSubmitting(false);

    if (!error) {
      alert("Aura Logged!");
      onUpdate(); // 3. Call the function passed from the Home page
    }
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-100 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">How's your Aura?</h2>
      <div className="flex justify-around items-center mt-6">
        {moodOptions.map((mood) => (
          <motion.button
            key={mood.level}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            disabled={isSubmitting}
            onClick={() => handleMoodSelect(mood.level)}
            className={`flex flex-col items-center p-4 rounded-2xl ${mood.bg} ${mood.color}`}
          >
            <div className="w-12 h-12 mb-2">{mood.emoji}</div>
            <span className="text-xs font-bold uppercase tracking-wider">{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}