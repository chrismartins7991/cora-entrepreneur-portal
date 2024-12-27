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
    <div className="min-h-screen w-full relative">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Entrepreneur Dashboard</h1>
        
        {/* Hologram container with fixed dimensions and centered positioning */}
        <div className="relative w-full max-w-2xl mx-auto aspect-square mb-8">
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

        {/* Health Metrics Grid */}
        <HealthMetricsGrid metrics={healthMetrics} />

        <div className="mt-8 text-center text-white/80">
          <p>Your personal AI assistant for business growth</p>
        </div>
      </div>
    </div>
  );
}