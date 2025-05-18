
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CattlePage from "./pages/CattlePage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomePage from "./pages/IncomePage";
import ReportsPage from "./pages/ReportsPage";
import FeedsPage from "./pages/FeedsPage";
import MilkProductionPage from "./pages/MilkProductionPage";
import WorkersPage from "./pages/WorkersPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/cattle" element={<CattlePage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/income" element={<IncomePage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/feeds" element={<FeedsPage />} />
                <Route path="/milk-production" element={<MilkProductionPage />} />
                <Route path="/workers" element={<WorkersPage />} />
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <Route path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
