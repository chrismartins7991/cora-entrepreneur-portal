import { useRef } from 'react';
import { HologramScene } from '@/components/hologram/HologramScene';
import { HealthMetricsGrid } from '@/components/metrics/HealthMetricsGrid';

export default function Entrepreneur() {
  const containerRef = useRef<HTMLDivElement>(null);

  const healthMetrics = {
    stress: 65,
    hydration: 82,
    energy: 75,
  };

  return (
    <div className="min-h-screen w-full relative overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Entrepreneur Dashboard</h1>
        
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Hologram container with adjusted dimensions */}
          <div className="relative w-full max-w-2xl aspect-[4/3]">
            <div 
              ref={containerRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at center, rgba(13,71,161,0.1) 0%, rgba(0,0,0,0) 70%)',
              }}
            >
              <HologramScene containerRef={containerRef} />
            </div>
          </div>

          {/* Health Metrics Grid moved up and closer */}
          <div className="w-full max-w-4xl -mt-8">
            <HealthMetricsGrid metrics={healthMetrics} />
          </div>
        </div>

        <div className="mt-8 text-center text-white/80">
          <p>Your personal AI assistant for business growth</p>
        </div>
      </div>
    </div>
  );
}
