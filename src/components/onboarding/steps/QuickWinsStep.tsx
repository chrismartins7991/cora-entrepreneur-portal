import { Check } from "lucide-react";

export function QuickWinsStep() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Quick Wins</h2>
        <p className="text-white/60">Here are some immediate actions you can take</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Set Up Your RoadMap</h3>
              <p className="text-sm text-white/60">
                Visualize your journey and track progress towards your goals
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
              <Check className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Explore Automations</h3>
              <p className="text-sm text-white/60">
                Discover ways to streamline your business processes
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
              <Check className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Chat with Cora AI</h3>
              <p className="text-sm text-white/60">
                Get personalized guidance for your business challenges
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}