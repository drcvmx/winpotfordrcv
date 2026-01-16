import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TenantPage from "./pages/TenantPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { TenantProvider } from "@/context/TenantContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TenantProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Corporate Home */}
            <Route path="/" element={<Index />} />
            
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
