import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TenantPage from "./pages/TenantPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { TenantProvider } from "@/context/TenantContext";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <TenantProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Corporate Home */}
            <Route path="/" element={<Index />} />
            
            {/* Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Dynamic Tenant Routes: /tuxtla, /boca, /interlomas, etc. */}
            <Route path="/:tenantId" element={<TenantPage />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </TenantProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
