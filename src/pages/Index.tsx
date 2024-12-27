export default function Index() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to CORA</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white">Feature 1</h2>
            <p className="text-white/60">Description of feature 1.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white">Feature 2</h2>
            <p className="text-white/60">Description of feature 2.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white">Feature 3</h2>
            <p className="text-white/60">Description of feature 3.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-white">Feature 4</h2>
            <p className="text-white/60">Description of feature 4.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
