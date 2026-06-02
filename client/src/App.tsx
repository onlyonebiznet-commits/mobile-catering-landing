import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { useGTM, useGTMScrollTracking } from "./hooks/useGTM";
import { initializeButtonTracking } from "./utils/ga4-events";


function Router() {
  // GTM 초기화 및 페이지 뷰 추적
  useGTM();
  // GTM 스크롬 깊이 추적
  useGTMScrollTracking();
  // GA4 버튼 클릭 추적 초기화
  React.useEffect(() => {
    initializeButtonTracking();
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
