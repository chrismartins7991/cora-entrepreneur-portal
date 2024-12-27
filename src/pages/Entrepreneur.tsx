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
    <div className="min-h-screen w-full p-4 relative">
      <div 
        ref={containerRef} 
        className="w-full aspect-square max-w-2xl mx-auto mb-8 relative"
        style={{
          background: 'radial-gradient(circle at center, rgba(13,71,161,0.1) 0%, rgba(0,0,0,0) 70%)',
        }}
      >
        <HologramScene containerRef={containerRef} />
      </div>

      <HealthMetricsGrid metrics={healthMetrics} />
    </div>
  );
}