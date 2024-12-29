import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep?: boolean;
  canProceed?: boolean;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isLastStep = false,
  canProceed = true,
}: OnboardingLayoutProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = (currentStep / totalSteps) * 100;

  const handleFinish = async () => {
    console.log("OnboardingLayout: Starting onboarding completion...");
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update({
          is_onboarded: true,
          onboarding_completed_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      console.log("OnboardingLayout: Onboarding completed successfully");
      
      toast.success("Welcome aboard! 🎉", {
        description: "Your profile has been set up successfully.",
      });
      
      navigate("/roadmap");
    } catch (error) {
      console.error("OnboardingLayout: Error completing onboarding:", error);
      toast.error("Error", {
        description: "Failed to complete onboarding. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="mx-auto max-w-3xl">
        <Progress value={progress} className="mb-8" />
        
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {children}
          
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            
            <div className="ml-auto">
              {!isLastStep ? (
                <Button
                  onClick={onNext}
                  disabled={!canProceed || isSubmitting}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={!canProceed || isSubmitting}
                >
                  {isSubmitting ? "Finishing..." : "Finish"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}