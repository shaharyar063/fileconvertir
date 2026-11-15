import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import SlugRouter from "./pages/SlugRouter";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/use-theme";
import { TrailingSlashRedirect } from "./components/TrailingSlashRedirect";

const App = () => (
  <ThemeProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/privacy/" element={<Privacy />} />
          <Route path="/:slug/" element={<SlugRouter />} />
          <Route path="/:slug" element={<TrailingSlashRedirect />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
