import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Users, ArrowRight } from "lucide-react"

const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides, API references, and tutorials to get you started quickly.",
    link: "#",
    color: "blue"
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Complete API documentation with examples and interactive playground.",
    link: "#",
    color: "green"
  },
  {
    icon: Users,
    title: "Community",
    description: "Join our active community of developers. Share ideas, get help, and contribute.",
    link: "#",
    color: "purple"
  }
]

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resources to help you succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to make the most of CodeEditor. From detailed docs 
            to an active community, we've got you covered.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              className="group p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer"
            >
              <div className="text-center">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300`}>
                  <resource.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {resource.description}
                </p>

                {/* CTA */}
                <Button 
                  variant="ghost" 
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group/btn"
                >
                  Explore Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need personalized help?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team of experts is ready to help you integrate CodeEditor 
              into your workflow and maximize your productivity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg">
                Schedule a Demo
              </Button>
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}