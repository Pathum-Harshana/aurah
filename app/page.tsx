"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MoodTracker from "@/components/MoodTracker";
import MoodChart from "@/components/MoodChart";

export default function Home() {
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    fetchMoodData();
  }, []);

  const fetchMoodData = async () => {
    // Fetches the last 7 logs for the current user
    const { data, error } = await supabase
      .from('mood_logs')
      .select('mood_score')
      .order('created_at', { ascending: true })
      .limit(7);

    if (data) {
      setScores(data.map(log => log.mood_score));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-black text-blue-600 italic">AuraHub</h1>
          <p className="text-slate-500 font-medium">Group 09 | Wayamba University Wellbeing</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Component to input data */}
          <MoodTracker onUpdate={fetchMoodData} /> 
          
          {/* Component to visualize data */}
          <MoodChart scores={scores} />
        </div>
      </div>
    </main>
  );
}