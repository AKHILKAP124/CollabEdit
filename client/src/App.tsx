import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/Playground";
import Playgrounds from "./pages/Playgrounds";
import Repositories from "./pages/Repositories";
import Snippets from "./pages/Snippets";
import AIGenerator from "./pages/AIGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="codeeditor-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/playgrounds" element={<Playgrounds />} />
            <Route path="/playground/:id" element={<Playground />} />
                        <Route path="/repositories" element={<Repositories />} />
                        <Route path="/snippets" element={<Snippets />} />
                        <Route path="/ai-generator" element={<AIGenerator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
