import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Sparkles, 
  Lock, 
  Zap,
  Crown,
  Check
} from "lucide-react";

const AIGenerator = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleLockedFeatureClick = () => {
    setShowUpgradeModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            AI Website Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate stunning websites with the power of AI
          </p>
        </div>

        {/* Locked Feature Card */}
        <Card className="bg-gradient-purple text-white relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Lock className="w-6 h-6 text-white/80" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Premium Feature
            </CardTitle>
            <CardDescription className="text-white/80 text-lg">
              Unlock the power of AI to generate complete websites in seconds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">✨ What you get:</h4>
                <ul className="space-y-1 text-white/90 text-sm">
                  <li>• Complete website generation</li>
                  <li>• Multiple design themes</li>
                  <li>• SEO-optimized code</li>
                  <li>• Mobile-responsive layouts</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">🚀 AI Features:</h4>
                <ul className="space-y-1 text-white/90 text-sm">
                  <li>• Smart content generation</li>
                  <li>• Color palette suggestions</li>
                  <li>• Component library access</li>
                  <li>• One-click deployment</li>
                </ul>
              </div>
            </div>
            
            <Button 
              onClick={handleLockedFeatureClick}
              className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>

        {/* Preview Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="group hover:shadow-lg transition-all cursor-pointer opacity-50">
              <div className="aspect-video bg-gradient-surface rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-muted-foreground">Template {i}</h4>
                <p className="text-sm text-muted-foreground">AI-generated design</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upgrade Modal */}
        <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl">Upgrade to Pro</DialogTitle>
              <DialogDescription className="text-base">
                Unlock AI Website Generator and all premium features
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="bg-gradient-surface rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">$19<span className="text-lg text-muted-foreground">/month</span></div>
                  <div className="text-sm text-muted-foreground">Everything you need to build amazing websites</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  {[
                    "AI Website Generator",
                    "Unlimited Playgrounds", 
                    "Private Repositories",
                    "Advanced Analytics",
                    "Priority Support"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-gradient-brand text-white">
                Upgrade Now
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => setShowUpgradeModal(false)}>
                Maybe Later
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AIGenerator;