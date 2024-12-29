import { Brain, Map, Zap } from "lucide-react";

export function WelcomeStep() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Cora! 👋</h2>
        <p className="text-white/60">
          Let's set up your entrepreneurial journey together. Cora is here to help
          you succeed with powerful tools and intelligent guidance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
            <Map className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="mb-1 font-semibold text-white">RoadMap</h3>
          <p className="text-sm text-white/60">
            Visualize your business journey and track progress
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
            <Zap className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="mb-1 font-semibold text-white">Automate</h3>
          <p className="text-sm text-white/60">
            Streamline your business processes effortlessly
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
            <Brain className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="mb-1 font-semibold text-white">Brain</h3>
          <p className="text-sm text-white/60">
            Access curated knowledge and resources
          </p>
        </div>
      </div>
    </div>
  );
}