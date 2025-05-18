
import { ArrowLeft, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DashboardHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const DashboardHeader = ({ title, showBackButton = true }: DashboardHeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="bg-farm-green text-white p-4 rounded-b-lg flex items-center">
      {showBackButton && !isHome && (
        <Link to="/" className="mr-3">
          <ArrowLeft size={24} />
        </Link>
      )}
      <h1 className="text-xl font-semibold flex-1">{title}</h1>
      <div className="flex items-center gap-4">
        {username && (
          <span className="text-sm hidden md:inline-block">
            Hello, {username}
          </span>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-white hover:bg-white hover:text-farm-green"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
      {isHome && <div className="w-6"></div>}
    </div>
  );
};

export default DashboardHeader;
