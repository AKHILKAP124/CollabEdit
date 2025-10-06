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
import { store, persistor } from "./redux/ConfigureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import PreventToLandingPage from "./lib/PreventToLandingPage";
import FileTest from "./pages/FileTest";
import { CodeEditorPage } from "./pages/CodeEditorPage";
import ProtectedRoute from "./lib/ProtectedRoutes";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="codeeditor-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PreventToLandingPage children={<Index />} />} />
                <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard />} />} />
                <Route path="/playgrounds" element={<ProtectedRoute children={<Playgrounds />} />} />
                <Route path="/playground/:id" element={<ProtectedRoute children={<Playground />} />} />
                <Route path="/repositories" element={<ProtectedRoute children={<Repositories />} />} />
                <Route path="/snippets" element={<ProtectedRoute children={<Snippets />} />} />
                <Route path="/test" element={<ProtectedRoute children={<CodeEditorPage />} />} />
                <Route path="/ai-generator" element={<ProtectedRoute children={<AIGenerator />} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;
