export default function Delegate() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Delegate</h1>
        <p className="text-white/60 mb-4">
          Here you can delegate tasks and manage your team effectively.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Task 1</h2>
            <p className="text-white/60">Description of task 1.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Task 2</h2>
            <p className="text-white/60">Description of task 2.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Task 3</h2>
            <p className="text-white/60">Description of task 3.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Task 4</h2>
            <p className="text-white/60">Description of task 4.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
