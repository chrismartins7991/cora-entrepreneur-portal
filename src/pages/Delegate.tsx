import { GlassCard } from "@/components/GlassCard";

export default function Delegate() {
  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <GlassCard className="max-w-lg text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium mb-4">
          Coming Soon
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Delegate</h1>
        <p className="text-xl text-white/60 mb-2">
          We're working hard to bring you the Delegate feature.
          Stay tuned for updates!
        </p>
        <p className="text-sm text-white/40">
          This feature will be available in future versions of CORA.
        </p>
      </GlassCard>
    </div>
  );
}