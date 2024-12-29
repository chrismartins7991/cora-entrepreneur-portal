import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = (currentStep / totalSteps) * 100;

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          is_onboarded: true,
          onboarding_completed_at: new Date().toISOString(),
        })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Welcome aboard! 🎉",
        description: "Your profile has been set up successfully.",
      });
      
      navigate("/roadmap");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
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