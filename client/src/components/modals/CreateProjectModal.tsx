import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, User, Code, Zap, Globe, Palette } from "lucide-react";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "playground" | "project";
}

const templates = [
  { id: "react", name: "React.js", icon: Code, description: "Modern React with TypeScript" },
  { id: "nextjs", name: "Next.js", icon: Zap, description: "Full-stack React framework" },
  { id: "vue", name: "Vue.js", icon: Globe, description: "Progressive JavaScript framework" },
  { id: "vanilla", name: "Vanilla JS", icon: Code, description: "Pure HTML, CSS & JavaScript" },
  { id: "tailwind", name: "Tailwind CSS", icon: Palette, description: "Utility-first CSS framework" },
];

export function CreateProjectModal({ open, onOpenChange, type }: CreateProjectModalProps) {
  const [projectType, setProjectType] = useState("personal");
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");

  const handleCreate = () => {
    // Handle project creation logic here
    console.log({ projectType, name, template, type });
    onOpenChange(false);
    // Reset form
    setProjectType("personal");
    setName("");
    setTemplate("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Create New {type === "playground" ? "Playground" : "Project"}
          </DialogTitle>
          <DialogDescription>
            Set up your new {type} with the perfect template and collaboration settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Project Type</Label>
            <RadioGroup value={projectType} onValueChange={setProjectType}>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                <RadioGroupItem value="personal" id="personal" />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gradient-blue rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="personal" className="font-medium cursor-pointer">
                      Personal Project
                    </Label>
                    <p className="text-xs text-muted-foreground">Work on your own</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                <RadioGroupItem value="collaborative" id="collaborative" />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gradient-purple rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="collaborative" className="font-medium cursor-pointer">
                      Collaborative Room
                    </Label>
                    <p className="text-xs text-muted-foreground">Real-time collaboration</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              {type === "playground" ? "Playground" : "Project"} Name
            </Label>
            <Input
              id="name"
              placeholder={`Enter ${type} name...`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Choose Template</Label>
            <div className="grid grid-cols-1 gap-2">
              {templates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setTemplate(tmpl.id)}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    template === tmpl.id
                      ? "border-primary bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-surface rounded-lg flex items-center justify-center">
                    <tmpl.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{tmpl.name}</p>
                    <p className="text-xs text-muted-foreground">{tmpl.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            disabled={!name || !template}
            className="bg-gradient-brand text-white"
          >
            Create {type === "playground" ? "Playground" : "Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
      </Dialog>
  );
}