import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import VoiceAssistantUI from "./pages/VoiceAssistantUI";
import OpusClipGrowth from "./pages/OpusClipGrowth";
import AIUtility from "./pages/AIUtility";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ImageGenerator from "./pages/ImageGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/claude-code-web-skills" element={<ArticleDetail />} />
          <Route path="/article/voice-assistant-ui" element={<VoiceAssistantUI />} />
          <Route path="/article/opusclip-growth" element={<OpusClipGrowth />} />
          <Route path="/article/ai-utility" element={<AIUtility />} />
          <Route path="/about" element={<About />} />
          <Route path="/image-generator" element={<ImageGenerator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
