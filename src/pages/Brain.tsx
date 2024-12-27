import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Lock, PlayCircle, Clock, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  price: number;
  imageUrl: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Business Model Innovation",
    description: "Learn how to create and validate innovative business models that disrupt markets.",
    duration: "6 hours",
    lessons: 12,
    price: 199,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Growth Hacking Mastery",
    description: "Discover proven strategies to scale your startup rapidly with minimal budget.",
    duration: "8 hours",
    lessons: 15,
    price: 249,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Startup Finance Essentials",
    description: "Master the fundamentals of financial management for early-stage startups.",
    duration: "5 hours",
    lessons: 10,
    price: 179,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Leadership & Team Building",
    description: "Build and lead high-performing teams in fast-paced startup environments.",
    duration: "7 hours",
    lessons: 14,
    price: 229,
    imageUrl: "/placeholder.svg"
  }
];

export default function Brain() {
  const { toast } = useToast();

  const handlePurchase = (courseId: string) => {
    console.log("Attempting to purchase course:", courseId);
    toast({
      title: "Purchase Required",
      description: "This course is currently locked. Purchase to gain access.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Entrepreneur's Brain</h1>
        <p className="text-white/60">
          Unlock premium courses to enhance your entrepreneurial journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <GlassCard key={course.id} className="relative overflow-hidden group">
            {/* Course Image */}
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white/80" />
              </div>
            </div>

            {/* Course Info */}
            <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
            <p className="text-white/60 mb-4 line-clamp-2">{course.description}</p>

            {/* Course Meta */}
            <div className="flex items-center gap-4 mb-4 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {course.lessons} lessons
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">${course.price}</span>
              <Button
                onClick={() => handlePurchase(course.id)}
                className="gap-2"
              >
                <Lock className="w-4 h-4" />
                Unlock Course
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}