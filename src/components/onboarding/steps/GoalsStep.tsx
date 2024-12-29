import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GOALS = [
  { id: "revenue", label: "Increase revenue" },
  { id: "customers", label: "Acquire customers" },
  { id: "operations", label: "Scale operations" },
  { id: "product", label: "Launch a new product" },
  { id: "other", label: "Other" },
];

const CHALLENGES = [
  { id: "funding", label: "Limited funding" },
  { id: "acquisition", label: "Difficulty acquiring customers" },
  { id: "efficiency", label: "Operational inefficiencies" },
  { id: "team", label: "Team management issues" },
  { id: "other", label: "Other" },
];

export function GoalsStep() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");

  const handleGoalsChange = async (goalId: string) => {
    const updatedGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter((id) => id !== goalId)
      : [...selectedGoals, goalId].slice(0, 3);
    
    setSelectedGoals(updatedGoals);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ goals: updatedGoals })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating goals:", error);
    }
  };

  const handleChallengesChange = async (challengeId: string) => {
    const updatedChallenges = selectedChallenges.includes(challengeId)
      ? selectedChallenges.filter((id) => id !== challengeId)
      : [...selectedChallenges, challengeId].slice(0, 3);
    
    setSelectedChallenges(updatedChallenges);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ challenges: updatedChallenges })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating challenges:", error);
    }
  };

  const handleTimelineChange = async (value: string) => {
    setTimeline(value);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ goal_timeline: value })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating timeline:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Goals & Challenges</h2>
        <p className="text-white/60">Help us understand your objectives</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>What are your top business goals? (Choose up to 3)</Label>
          {GOALS.map((goal) => (
            <div key={goal.id} className="flex items-center space-x-2">
              <Checkbox
                id={`goal-${goal.id}`}
                checked={selectedGoals.includes(goal.id)}
                onCheckedChange={() => handleGoalsChange(goal.id)}
                disabled={selectedGoals.length >= 3 && !selectedGoals.includes(goal.id)}
              />
              <label
                htmlFor={`goal-${goal.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              >
                {goal.label}
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Label>What challenges are you currently facing? (Choose up to 3)</Label>
          {CHALLENGES.map((challenge) => (
            <div key={challenge.id} className="flex items-center space-x-2">
              <Checkbox
                id={`challenge-${challenge.id}`}
                checked={selectedChallenges.includes(challenge.id)}
                onCheckedChange={() => handleChallengesChange(challenge.id)}
                disabled={selectedChallenges.length >= 3 && !selectedChallenges.includes(challenge.id)}
              />
              <label
                htmlFor={`challenge-${challenge.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              >
                {challenge.label}
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label>How soon do you want to achieve your goals?</Label>
          <Select
            value={timeline}
            onValueChange={handleTimelineChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3 months</SelectItem>
              <SelectItem value="3-6">3-6 months</SelectItem>
              <SelectItem value="6-12">6-12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}