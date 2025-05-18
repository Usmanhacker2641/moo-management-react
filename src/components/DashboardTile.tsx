
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardTileProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  to: string;
  iconColor?: string;
}

const DashboardTile = ({ title, subtitle, icon: Icon, to, iconColor = "text-farm-green" }: DashboardTileProps) => {
  return (
    <Link to={to} className="w-full">
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col items-center text-center">
        <div className={cn("mb-2", iconColor)}>
          <Icon size={32} />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </Link>
  );
};

export default DashboardTile;
