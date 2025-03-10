
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Supported locales
const SUPPORTED_LOCALES = [
  'pt-BR', // Brazilian Portuguese (BRL)
  'en-US', // US English (USD)
  'en-GB', // British English (GBP)
  'es-AR', // Argentinian Spanish (ARS)
  'tr-TR', // Turkish (TRY)
  'de-DE', // German (EUR)
  'fr-FR', // French (EUR)
  'it-IT', // Italian (EUR)
  'es-ES', // Spanish (EUR)
  'ja-JP', // Japanese (JPY)
  'ko-KR', // Korean (KRW)
  'zh-CN', // Chinese (CNY)
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to en-US */}
          <Route path="/" element={<Navigate to="/en-US" replace />} />
          
          {/* Add routes for each supported locale */}
          {SUPPORTED_LOCALES.map(locale => (
            <Route key={locale} path={`/${locale}`} element={<Index />} />
          ))}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
