export default function Brain() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Brain</h1>
        <p className="text-white/60 mb-4">
          Explore the capabilities of Cora AI in enhancing your cognitive processes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Idea Generation</h2>
            <p className="text-white/60">Use Cora AI to brainstorm and generate new ideas.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Research Assistance</h2>
            <p className="text-white/60">Get help with research and data analysis.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Decision Support</h2>
            <p className="text-white/60">Leverage AI to make informed decisions.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Learning Aid</h2>
            <p className="text-white/60">Enhance your learning experience with personalized content.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
