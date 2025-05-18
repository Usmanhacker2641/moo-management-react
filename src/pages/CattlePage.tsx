
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";
import { useFarmData } from "@/context/FarmDataContext";
import ActionButtons from "@/components/ActionButtons";
import AddCowModal from "@/components/AddCowModal";
import EditCowModal from "@/components/EditCowModal";
import { Cow } from "@/context/FarmDataContext";
import { useToast } from "@/hooks/use-toast";

const CattlePage = () => {
  const { cows, deleteCow } = useFarmData();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCow, setSelectedCow] = useState<Cow | null>(null);

  const handleEdit = (cow: Cow) => {
    setSelectedCow(cow);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteCow(id);
    toast({
      title: "Cow deleted",
      description: "The cow record has been removed successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Cow profiles" />
      
      <div className="container p-4 flex-1">
        <div className="space-y-4 mb-20">
          {cows.map((cow) => (
            <div key={cow.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-farm-green">
                  <ClipboardIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Cow name</h3>
                  <p>{cow.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-black">
                  <ShareIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Breed</h3>
                  <p>{cow.breed}</p>
                </div>
              </div>

              <div className="border-t my-2"></div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-farm-orange">
                  <BarChartIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Weight</h3>
                  <p>{cow.weight}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-farm-orange">
                  <TagIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Tag number</h3>
                  <p>{cow.tagNumber}</p>
                </div>
              </div>

              <div className="border-t my-2"></div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-black">
                  <CalendarIcon />
                </span>
                <div>
                  <h3 className="font-semibold">DOB</h3>
                  <p>{new Date(cow.dob).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-2">
                <ActionButtons 
                  onEdit={() => handleEdit(cow)} 
                  onDelete={() => handleDelete(cow.id)} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-4 right-4 left-4">
          <Button 
            className="w-full bg-farm-green hover:bg-green-600" 
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mr-2" size={18} />
            Add cow
          </Button>
        </div>
      </div>

      <AddCowModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      
      {selectedCow && (
        <EditCowModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          cow={selectedCow} 
        />
      )}
    </div>
  );
};

// Simple icon components
const ClipboardIcon = () => <div className="w-6 h-6 flex items-center justify-center">📋</div>;
const ShareIcon = () => <div className="w-6 h-6 flex items-center justify-center">🔄</div>;
const BarChartIcon = () => <div className="w-6 h-6 flex items-center justify-center">📊</div>;
const TagIcon = () => <div className="w-6 h-6 flex items-center justify-center">🏷️</div>;
const CalendarIcon = () => <div className="w-6 h-6 flex items-center justify-center">📅</div>;

export default CattlePage;
