import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  className?: string;
}

export function ProgressCircle({ value, className }: ProgressCircleProps) {
  return (
    <div className={cn("relative h-24 w-24", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-cora-purple/20 backdrop-blur-sm" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{value}%</span>
      </div>
      <div
        className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-t from-cora-purple to-transparent opacity-50"
        style={{
          clipPath: `polygon(0 ${100 - value}%, 100% ${100 - value}%, 100% 100%, 0 100%)`,
        }}
      />
    </div>
  );
}