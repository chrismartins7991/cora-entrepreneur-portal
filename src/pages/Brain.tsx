import { GlassCard } from "@/components/GlassCard";
import { Book, Lightbulb, Search, Target } from "lucide-react";

export default function Brain() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Brain</h1>
        <p className="text-white/60 mb-8">
          Explore the capabilities of Cora AI in enhancing your cognitive processes.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Lightbulb className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Idea Generation</h2>
                <p className="text-white/60">Use Cora AI to brainstorm and generate innovative ideas.</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Search className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Research Assistance</h2>
                <p className="text-white/60">Get help with research and data analysis.</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Target className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Decision Support</h2>
                <p className="text-white/60">Leverage AI to make informed decisions.</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Courses Section */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <GlassCard key={index} className="flex flex-col">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <Book className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                  <p className="text-white/60 mb-2">{course.description}</p>
                  <span className="text-xs text-indigo-400">{course.duration} • {course.lessons} lessons</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const courses = [
  {
    title: "AI Fundamentals",
    description: "Learn the basics of artificial intelligence and machine learning.",
    duration: "4 weeks",
    lessons: 12
  },
  {
    title: "Data Analysis",
    description: "Master data analysis techniques using modern tools.",
    duration: "6 weeks",
    lessons: 18
  },
  {
    title: "Critical Thinking",
    description: "Develop advanced critical thinking and problem-solving skills.",
    duration: "3 weeks",
    lessons: 9
  },
  {
    title: "Creative Problem Solving",
    description: "Learn innovative approaches to solving complex problems.",
    duration: "5 weeks",
    lessons: 15
  },
  {
    title: "Decision Making",
    description: "Improve your decision-making process with data-driven methods.",
    duration: "4 weeks",
    lessons: 12
  },
  {
    title: "Strategic Planning",
    description: "Master the art of strategic planning and execution.",
    duration: "6 weeks",
    lessons: 18
  }
];