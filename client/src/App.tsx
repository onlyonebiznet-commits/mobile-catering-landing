import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThankYou from "@/pages/ThankYou";
const Admin = React.lazy(() => import("@/pages/Admin"));
const AdminLogin = React.lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = React.lazy(() => import("@/pages/AdminDashboard"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
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
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          불러오는 중...
        </div>
      }
    >
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
    </React.Suspense>
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
