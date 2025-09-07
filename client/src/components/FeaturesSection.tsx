import { Card } from "@/components/ui/card"
import { Users, Terminal, Video, Zap } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Code simultaneously with your team. See changes instantly, share cursors, and collaborate like never before."
  },
  {
    icon: Terminal,
    title: "Integrated Terminal",
    description: "Full-featured terminal right in your editor. Run commands, manage packages, and deploy directly from the interface."
  },
  {
    icon: Video,
    title: "Video & Chat",
    description: "Built-in video calls and chat. Discuss code face-to-face without leaving your development environment."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with instant sync. Experience seamless performance even with large codebases."
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to code together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From real-time collaboration to integrated tools, CodeEditor provides 
            everything your team needs to build amazing software.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to experience the future of collaborative coding?
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Join thousands of developers already using CodeEditor</span>
          </div>
        </div>
      </div>
    </section>
  )
}