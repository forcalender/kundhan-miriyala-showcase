
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SecurityProvider } from "@/contexts/SecurityContext";
import NoScriptFallback from "@/components/NoScriptFallback";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import AllBlogPosts from "./pages/AllBlogPosts";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes default
    },
  },
});

const App = () => (
  <>
    <NoScriptFallback />
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <SecurityProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/projects" element={<AllProjects />} />
                  <Route path="/blog" element={<AllBlogPosts />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </SecurityProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </>
);

export default App;
