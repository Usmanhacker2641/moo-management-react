
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <div className="flex space-x-2 justify-end">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-white border-gray-200 hover:bg-gray-50" 
        onClick={onDelete}
      >
        <Trash size={16} className="text-red-500" />
        <span className="sr-only">Delete</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-white border-gray-200 hover:bg-gray-50" 
        onClick={onEdit}
      >
        <Edit size={16} className="text-farm-green" />
        <span className="sr-only">Edit</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
