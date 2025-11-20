import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NSFWProvider } from "./contexts/NSFWContext";
<<<<<<< HEAD
import { AuthProvider } from "./contexts/AuthContext";
=======
import { ThemeProvider } from "./contexts/ThemeContext";
>>>>>>> main
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import VoiceAssistantUI from "./pages/VoiceAssistantUI";
import OpusClipGrowth from "./pages/OpusClipGrowth";
import InfoDimensionReduction from "./pages/InfoDimensionReduction";
import ClaudeCodeDoubao from "./pages/ClaudeCodeDoubao";
import XiaohongshuGrowth from "./pages/XiaohongshuGrowth";
import AIUtility from "./pages/AIUtility";
import AIAgent from "./pages/AIAgent";
import AICompanionFeatures from "./pages/AICompanionFeatures";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ImageGenerator from "./pages/ImageGenerator";
import TextToSpeech from "./pages/TextToSpeech";
import IdPhoto from "./pages/IdPhoto";
import Login from "./pages/Login";
import XuanranLayout from "./components/XuanranLayout";
import XuanranHome from "./pages/XuanranHome";
import IntegratedHome from "./pages/IntegratedHome";
import CreateCharacter from "./pages/CreateCharacter";
import XuanranImageGenerator from "./pages/XuanranImageGenerator";
import Roleplay from "./pages/Roleplay";
import ChatPage from "./pages/ChatPage";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
    <AuthProvider>
=======
    <ThemeProvider>
>>>>>>> main
      <NSFWProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
<<<<<<< HEAD
              {/* Login route - outside layout */}
              <Route path="/login" element={<Login />} />
=======
              {/* All routes use XuanranLayout as the main layout */}
              <Route element={<XuanranLayout />}>
                <Route index element={<IntegratedHome />} />
>>>>>>> main

              {/* All routes use XuanranLayout as the main layout */}
              <Route element={<XuanranLayout />}>
                <Route index element={<IntegratedHome />} />

                {/* AI Companion Features */}
                <Route path="/create" element={<CreateCharacter />} />
                <Route path="/generate" element={<XuanranImageGenerator />} />
                <Route path="/roleplay" element={<Roleplay />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/pricing" element={<Pricing />} />

                {/* Blog/Articles */}
                <Route path="/articles" element={<Articles />} />
                <Route path="/article/claude-code-web-skills" element={<ArticleDetail />} />
                <Route path="/article/voice-assistant-ui" element={<VoiceAssistantUI />} />
                <Route path="/article/opusclip-growth" element={<OpusClipGrowth />} />
                <Route path="/article/info-dimension-reduction" element={<InfoDimensionReduction />} />
                <Route path="/article/claude-code-doubao" element={<ClaudeCodeDoubao />} />
                <Route path="/article/xiaohongshu-growth" element={<XiaohongshuGrowth />} />
                <Route path="/article/ai-utility" element={<AIUtility />} />
                <Route path="/article/ai-agent" element={<AIAgent />} />
                <Route path="/article/ai-companion-features" element={<AICompanionFeatures />} />

<<<<<<< HEAD
                {/* Other Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/image-generator" element={<ImageGenerator />} />
                <Route path="/text-to-speech" element={<TextToSpeech />} />
                <Route path="/id-photo" element={<IdPhoto />} />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NSFWProvider>
    </AuthProvider>
=======
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </NSFWProvider>
    </ThemeProvider>
>>>>>>> main
  </QueryClientProvider>
);

export default App;
