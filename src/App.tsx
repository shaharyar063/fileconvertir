import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import SlugRouter from "./pages/SlugRouter";
import FormatPage from "./pages/FormatPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/use-theme";
import { TrailingSlashRedirect } from "./components/TrailingSlashRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/to-:format/" element={<FormatPage />} />
            <Route path="/to-:format" element={<TrailingSlashRedirect prefix="to-" />} />
            <Route path="/:slug/" element={<SlugRouter />} />
            <Route path="/:slug" element={<TrailingSlashRedirect />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
