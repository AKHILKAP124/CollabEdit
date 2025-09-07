import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Star, Zap } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individual developers and small projects",
    features: [
      "Up to 3 collaborators",
      "5 private repositories",
      "Basic chat support",
      "Community templates",
      "Standard sync speed"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$15",
    period: "per user/month",
    description: "Ideal for professional teams and growing companies",
    features: [
      "Unlimited collaborators",
      "Unlimited private repositories",
      "Video calling & screen share",
      "Priority support",
      "Advanced integrations",
      "Custom themes",
      "Lightning sync speed"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Advanced features for large organizations",
    features: [
      "Everything in Pro",
      "SSO & advanced security",
      "Dedicated support manager",
      "Custom integrations",
      "Advanced analytics",
      "SLA guarantee",
      "On-premise deployment"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your team. Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 ${
                plan.popular 
                  ? 'border-primary shadow-glow scale-105' 
                  : 'border-border/50'
              } hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary-glow shadow-glow' 
                    : ''
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.popular && <Zap className="mr-2 h-4 w-4" />}
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            All plans include 14-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}