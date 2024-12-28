import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function PlugAndFly() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-black p-4 overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
      <h1 className="text-2xl font-bold text-white mb-4">Plug & Fly</h1>
      
      <div className="border border-dashed border-white/20 rounded-lg p-8 mb-6 flex flex-col items-center justify-center min-h-[150px] hover:bg-white/5 transition-colors cursor-pointer">
        <Upload className="w-12 h-12 mb-2 text-white/60" />
        <p className="text-white/60">Drag and drop files here, or click to select files</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <GlassCard>
            <p className="text-white">Project Proposal.docx</p>
          </GlassCard>
          <GlassCard>
            <p className="text-white">Financial Report.xlsx</p>
          </GlassCard>
          <GlassCard>
            <p className="text-white">Logo Design.png</p>
          </GlassCard>
          <GlassCard>
            <p className="text-white">Customer Data.csv</p>
          </GlassCard>
        </div>

        <h2 className="text-lg font-bold text-white mt-8 mb-4">Connect Your Apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Google Drive', 'Shopify', 'Figma'].map((app) => (
            <GlassCard key={app} className="flex items-center justify-center p-8">
              <p className="text-white">{app}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
