export default function Dashboards() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Dashboards</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Dashboard 1</h2>
            <p className="text-white/60">Overview of key metrics and performance.</p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Dashboard 2</h2>
            <p className="text-white/60">Detailed analytics and insights.</p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Dashboard 3</h2>
            <p className="text-white/60">User engagement and activity tracking.</p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Dashboard 4</h2>
            <p className="text-white/60">Sales performance and trends.</p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Dashboard 5</h2>
            <p className="text-white/60">Marketing campaign effectiveness.</p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Dashboard 6</h2>
            <p className="text-white/60">Customer feedback and satisfaction.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
