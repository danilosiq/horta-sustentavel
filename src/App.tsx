import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { MakeRecipe } from "./pages/MakeRecipe";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import Producer from "./pages/Producer";
import Recipes from "./pages/Recipes";

import { ProtectedBaseRoute } from "./components/Protected-route";
import { GreenCalendarIntro } from "./pages/GreenCalendarIntro";
import { GreenCalendarPrompt } from "./pages/GreenCalendarPrompt";
import { GuideIntro } from "./pages/GuideIntro";
import { GuidePrompt } from "./pages/GuidePrompt";
import { OngsScreen } from "./pages/Ongs";
import { ViewUser } from "./pages/ViewUser";
import { AuthProvider } from "./providers/auth-provider";

const AppContent = () => {
  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname.includes("make-recipe")) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route
          path="/producer"
          element={
            <ProtectedBaseRoute>
              <Producer />
            </ProtectedBaseRoute>
          }
        />

        <Route path="/ongs" element={<OngsScreen />} />

        <Route path="/:id" element={<ViewUser />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/make-recipe" element={<MakeRecipe />} />
        <Route path="/guide" element={<GuideIntro />} />
        <Route path="/guide-prompt" element={<GuidePrompt />} />
        <Route path="/green-calendar-intro" element={<GreenCalendarIntro />} />
        <Route
          path="/green-calendar-prompt"
          element={<GreenCalendarPrompt />}
        />
      </Routes>
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
