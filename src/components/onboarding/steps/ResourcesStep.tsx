import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function ResourcesStep() {
  const [tools, setTools] = useState<string[]>([]);
  const [newTool, setNewTool] = useState("");
  const [hasStrategy, setHasStrategy] = useState(false);

  const handleAddTool = async () => {
    if (newTool.trim()) {
      const updatedTools = [...tools, newTool.trim()];
      setTools(updatedTools);
      setNewTool("");
      
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ existing_tools: updatedTools })
          .eq("id", (await supabase.auth.getUser()).data.user?.id);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating tools:", error);
      }
    }
  };

  const handleRemoveTool = async (index: number) => {
    const updatedTools = tools.filter((_, i) => i !== index);
    setTools(updatedTools);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ existing_tools: updatedTools })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating tools:", error);
    }
  };

  const handleStrategyChange = async (checked: boolean) => {
    setHasStrategy(checked);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ has_strategy: checked })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating strategy status:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Resource Assessment</h2>
        <p className="text-white/60">Let's understand what resources you already have</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>What tools/software are you currently using?</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tool (e.g., Slack, Trello)"
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddTool();
                }
              }}
            />
            <button
              onClick={handleAddTool}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Add
            </button>
          </div>
          
          {tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"
                >
                  <span className="text-sm text-white">{tool}</span>
                  <button
                    onClick={() => handleRemoveTool(index)}
                    className="text-white/60 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="strategy">Do you have a clear business strategy in place?</Label>
          <Switch
            id="strategy"
            checked={hasStrategy}
            onCheckedChange={handleStrategyChange}
          />
        </div>
      </div>
    </div>
  );
}