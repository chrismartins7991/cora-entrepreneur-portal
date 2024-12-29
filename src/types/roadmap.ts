export interface RoadmapTask {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RoadmapMilestone {
  title: string;
  description: string;
  timeline: string;
  tasks: RoadmapTask[];
}

export interface RoadmapData {
  milestones: RoadmapMilestone[];
}