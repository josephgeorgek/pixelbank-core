import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ActivateAccount from "./pages/ActivateAccount";
import VerifyNumber from "./pages/VerifyNumber";
import SetPassword from "./pages/SetPassword";
import ActivateHardwareToken from "./pages/ActivateHardwareToken";
import ActivationSuccess from "./pages/ActivationSuccess";
import ResetPassword from "./pages/ResetPassword";
import ResetVerifyNumber from "./pages/ResetVerifyNumber";
import CreateNewPassword from "./pages/CreateNewPassword";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Account Activation Flow */}
          <Route path="/activate-account" element={<ActivateAccount />} />
          <Route path="/verify-number" element={<VerifyNumber />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/activate-hardware-token" element={<ActivateHardwareToken />} />
          <Route path="/activation-success" element={<ActivationSuccess />} />
          
          {/* Password Reset Flow */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-verify-number" element={<ResetVerifyNumber />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          
          <Route path="/help" element={<Help />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
