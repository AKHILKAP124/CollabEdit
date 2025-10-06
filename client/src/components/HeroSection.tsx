import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import heroImage from "@/assets/hero-bg.jpg"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="CodeEditor Hero Background"
          className="w-full h-full object-cover opacity-60 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-80 dark:opacity-60" />
        <div className="absolute inset-0 bg-background/60 dark:bg-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="text-sm font-medium text-primary">✨ Now with AI-powered coding assistance</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tigh">
            Collaborate.{" "}
            <span className="bg-hero-gradient bg-clip-text text-primary">
              Code.
            </span>{" "}
            Create.
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate collaborative coding environment. Code together in real-time, 
            share ideas instantly, and build amazing projects with your team.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300 text-lg px-8 py-6 group">
              Start Coding Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>50,000+ developers coding live</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div>Free plan • No credit card required</div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div>⭐ 4.9/5 from 2,000+ reviews</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-primary-glow/20 rounded-full blur-xl animate-pulse hidden lg:block"></div>
    </section>
  )
}