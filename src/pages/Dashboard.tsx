
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTile from "@/components/DashboardTile";
import { Link } from "react-router-dom";
import { 
  ClipboardList, 
  DollarSign, 
  FileText, 
  Users, 
  BarChart3, 
  Wheat 
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Dairy Farm Dashboard" showBackButton={false} />
      
      <div className="container p-4 flex-1">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Dairy Cattle Management System
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <DashboardTile
            title="Cattle"
            subtitle="Cow profiles"
            icon={Users}
            to="/cattle"
            iconColor="text-farm-orange"
          />
          
          <DashboardTile
            title="Expenses"
            subtitle="Total inputs"
            icon={DollarSign}
            to="/expenses"
            iconColor="text-farm-green"
          />
          
          <DashboardTile
            title="Income"
            subtitle="Revenue records"
            icon={BarChart3}
            to="/income"
            iconColor="text-farm-light-green"
          />
          
          <DashboardTile
            title="Reports"
            subtitle="Farm summary"
            icon={FileText}
            to="/reports"
            iconColor="text-farm-orange"
          />
          
          <DashboardTile
            title="Workers"
            subtitle="Labor records"
            icon={Users}
            to="/workers"
            iconColor="text-farm-orange"
          />
          
          <DashboardTile
            title="Feeds"
            subtitle="Formulation"
            icon={Wheat}
            to="/feeds"
            iconColor="text-farm-green"
          />
        </div>
        
        <div className="mt-8">
          <Link 
            to="/milk-production"
            className="block w-full p-4 bg-farm-green hover:bg-green-600 text-white rounded-lg text-center font-semibold transition-colors"
          >
            Milk Production
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
