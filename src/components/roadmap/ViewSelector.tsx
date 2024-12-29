import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Map, BarChart2, Gauge, FileText } from "lucide-react";

interface ViewSelectorProps {
  currentView: 'cockpit' | 'neuron' | 'mindmap' | 'list' | 'notes';
  onViewChange: (view: 'cockpit' | 'neuron' | 'mindmap' | 'list' | 'notes') => void;
}

export function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap pb-2">
      <div className="flex gap-2 px-2">
        <Button
          variant={currentView === "cockpit" ? "default" : "outline"}
          onClick={() => onViewChange("cockpit")}
          className="flex-shrink-0 text-xs sm:text-sm"
        >
          <Gauge className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Cockpit View
        </Button>
        <Button
          variant={currentView === "neuron" ? "default" : "outline"}
          onClick={() => onViewChange("neuron")}
          className="flex-shrink-0 text-xs sm:text-sm"
        >
          <Brain className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Neuron View
        </Button>
        <Button
          variant={currentView === "mindmap" ? "default" : "outline"}
          onClick={() => onViewChange("mindmap")}
          className="flex-shrink-0 text-xs sm:text-sm"
        >
          <Map className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Mind Map View
        </Button>
        <Button
          variant={currentView === "list" ? "default" : "outline"}
          onClick={() => onViewChange("list")}
          className="flex-shrink-0 text-xs sm:text-sm"
        >
          <BarChart2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          List View
        </Button>
        <Button
          variant={currentView === "notes" ? "default" : "outline"}
          onClick={() => onViewChange("notes")}
          className="flex-shrink-0 text-xs sm:text-sm"
        >
          <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Notes View
        </Button>
      </div>
    </ScrollArea>
  );
}