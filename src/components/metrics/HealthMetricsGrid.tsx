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
    <div className="grid grid-cols-3 gap-4">
      <GlassCard className="flex flex-col items-center justify-center p-4 backdrop-blur-lg">
        <h3 className="text-sm font-semibold mb-2 text-cora-lightBlue">Stress Level</h3>
        <ProgressCircle value={metrics.stress} className="animate-pulse scale-75" />
      </GlassCard>

      <GlassCard className="flex flex-col items-center justify-center p-4 backdrop-blur-lg">
        <h3 className="text-sm font-semibold mb-2 text-cora-lightBlue">Hydration</h3>
        <ProgressCircle value={metrics.hydration} className="animate-pulse scale-75" />
      </GlassCard>

      <GlassCard className="flex flex-col items-center justify-center p-4 backdrop-blur-lg">
        <h3 className="text-sm font-semibold mb-2 text-cora-lightBlue">Energy Level</h3>
        <ProgressCircle value={metrics.energy} className="animate-pulse scale-75" />
      </GlassCard>
    </div>
  );
}