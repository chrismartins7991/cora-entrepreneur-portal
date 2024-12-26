import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlassCard } from "@/components/GlassCard";

const automationCategories = {
  Sales: [
    { id: 1, name: 'Lead Generation', description: 'Automate lead generation with targeted campaigns.' },
    { id: 2, name: 'Sales Follow-up', description: 'Automatically follow up with leads and prospects.' },
  ],
  Marketing: [
    { id: 3, name: 'Email Campaigns', description: 'Set up automated email marketing campaigns.' },
    { id: 4, name: 'Social Media Posting', description: 'Schedule and automate social media posts.' },
  ],
  CustomerSuccess: [
    { id: 5, name: 'Customer Feedback', description: 'Automate the collection of customer feedback.' },
    { id: 6, name: 'Support Tickets', description: 'Automatically manage and respond to support tickets.' },
  ],
};

export default function Automate() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Automate Your Business</h1>
        <p className="text-white/60 mb-8">
          Choose from our pre-made automations to streamline your business processes.
        </p>

        <Select defaultValue="Sales">
          <SelectTrigger className="w-[200px] mx-auto mb-8">
            <SelectValue placeholder="Select a sector" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(automationCategories).map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <GlassCard className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Recommended Automations for Sales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationCategories.Sales.map((automation) => (
              <GlassCard key={automation.id}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {automation.name}
                </h3>
                <p className="text-white/60">{automation.description}</p>
              </GlassCard>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}