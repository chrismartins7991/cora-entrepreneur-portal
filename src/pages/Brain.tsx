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
    <div className="h-full overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Entrepreneur's Brain</h1>
        <p className="text-sm md:text-base text-white/60">
          Unlock premium courses to enhance your entrepreneurial journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-4 md:pb-0 h-[calc(100%-5rem)] md:h-[calc(100%-4rem)]">
        {courses.map((course) => (
          <GlassCard key={course.id} className="flex flex-col h-auto md:h-fit">
            {/* Course Image */}
            <div className="relative h-32 sm:h-40 mb-3 rounded-lg overflow-hidden">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* Course Info */}
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{course.title}</h3>
            <p className="text-sm text-white/60 mb-3 line-clamp-2">{course.description}</p>

            {/* Course Meta */}
            <div className="flex items-center gap-3 mb-3 text-white/60 text-xs md:text-sm">
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
            <div className="flex items-center justify-between mt-auto">
              <span className="text-white font-bold">${course.price}</span>
              <Button
                onClick={() => handlePurchase(course.id)}
                className="gap-2 text-sm"
                size="sm"
              >
                <Lock className="w-3 h-3" />
                Unlock Course
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
