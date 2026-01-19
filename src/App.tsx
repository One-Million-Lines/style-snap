import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Portraits from "./pages/Portraits";
import Business from "./pages/Business";
import Trending from "./pages/Trending";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/demo/style-snap">
          <div className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm text-primary-foreground text-center py-2 px-4 text-sm">
            Preview of the project for <a href="https://onemillionlines.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-foreground/80">onemillionlines.com</a>
          </div>
          <div className="mt-10">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portraits" element={<Portraits />} />
            <Route path="/business" element={<Business />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/results" element={<Results />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
