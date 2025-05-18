
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const DashboardHeader = ({ title, showBackButton = true }: DashboardHeaderProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="bg-farm-green text-white p-4 rounded-b-lg flex items-center">
      {showBackButton && !isHome && (
        <Link to="/" className="mr-3">
          <ArrowLeft size={24} />
        </Link>
      )}
      <h1 className="text-xl font-semibold flex-1">{title}</h1>
      {isHome && <div className="w-6"></div>}
    </div>
  );
};

export default DashboardHeader;
