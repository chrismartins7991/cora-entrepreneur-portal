import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BusinessProfileStep() {
  const [formData, setFormData] = useState({
    business_name: "",
    industry: "",
    business_stage: "",
    team_size: "",
    business_model: "",
  });

  const handleChange = async (field: string, value: string) => {
    console.log("BusinessProfileStep: Updating field", { field, value });
    
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user?.id) throw new Error("No user ID found");

      const { error } = await supabase
        .from("profiles")
        .update({ [field]: field === 'team_size' ? parseInt(value) : value })
        .eq("id", user.user.id);

      if (error) {
        console.error(`Error updating ${field}:`, error);
        throw error;
      }
      
      console.log(`BusinessProfileStep: Successfully updated ${field}`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Business Profile</h2>
        <p className="text-white/60">Tell us about your business</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business_name">Business Name</Label>
          <Input
            id="business_name"
            placeholder="Enter your business name"
            value={formData.business_name}
            onChange={(e) => handleChange("business_name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select
            value={formData.industry}
            onValueChange={(value) => handleChange("industry", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_stage">Business Stage</Label>
          <Select
            value={formData.business_stage}
            onValueChange={(value) => handleChange("business_stage", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your business stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea Stage</SelectItem>
              <SelectItem value="pre-revenue">Pre-revenue</SelectItem>
              <SelectItem value="revenue">Generating Revenue</SelectItem>
              <SelectItem value="scaling">Scaling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="team_size">Team Size</Label>
          <Input
            id="team_size"
            type="number"
            placeholder="Enter team size"
            value={formData.team_size}
            onChange={(e) => handleChange("team_size", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_model">Business Model</Label>
          <Select
            value={formData.business_model}
            onValueChange={(value) => handleChange("business_model", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your business model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2b">B2B</SelectItem>
              <SelectItem value="b2c">B2C</SelectItem>
              <SelectItem value="marketplace">Marketplace</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}