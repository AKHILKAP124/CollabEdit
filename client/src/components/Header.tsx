import { Button } from "@/components/ui/button"
import { Moon, Sun, Blocks, Menu } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeToogle from "@/components/ui/ThemeToogle"

export default function Header({ openAuthModal }: { openAuthModal: (tab: 'login' | 'signup') => void }) {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigate = useNavigate();

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card-glass backdrop-blur-glass border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/")
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center space-x-1 group cursor-pointer">
            <Blocks className="h-8 w-8 text-primary group-hover:rotate-3" />
            <span className="text-xl font-medium text-foreground">CollabEdit</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToogle />

            <Button
              onClick={() => { openAuthModal('signup') }}
              className="hidden md:inline-flex">
              Get Started
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                onClick={() => { openAuthModal('signup') }}
                className="w-full mt-4">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}