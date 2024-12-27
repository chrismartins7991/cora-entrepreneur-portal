import { GlassCard } from '@/components/GlassCard';
import { ProgressCircle } from '@/components/ProgressCircle';

interface HealthMetrics {
  stress: number;
  hydration: number;
  energy: number;
}

interface HealthMetricsGridProps {
  metrics: HealthMetrics;
}

export const HealthMetricsGrid = ({ metrics }: HealthMetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <GlassCard className="flex flex-col items-center justify-center p-6 backdrop-blur-lg">
        <h3 className="text-lg font-semibold mb-4 text-cora-lightBlue">Stress Level</h3>
        <ProgressCircle value={metrics.stress} className="animate-pulse" />
      </GlassCard>

      <GlassCard className="flex flex-col items-center justify-center p-6 backdrop-blur-lg">
        <h3 className="text-lg font-semibold mb-4 text-cora-lightBlue">Hydration</h3>
        <ProgressCircle value={metrics.hydration} className="animate-pulse" />
      </GlassCard>

      <GlassCard className="flex flex-col items-center justify-center p-6 backdrop-blur-lg">
        <h3 className="text-lg font-semibold mb-4 text-cora-lightBlue">Energy Level</h3>
        <ProgressCircle value={metrics.energy} className="animate-pulse" />
      </GlassCard>
    </div>
  );
};