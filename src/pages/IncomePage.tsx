
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";
import ActionButtons from "@/components/ActionButtons";
import { useFarmData, Income } from "@/context/FarmDataContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const IncomePage = () => {
  const { incomes, addIncome, updateIncome, deleteIncome } = useFarmData();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
  });

  const handleEdit = (income: Income) => {
    setSelectedIncome(income);
    setFormData({
      source: income.source,
      amount: income.amount.toString(),
      date: income.date,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteIncome(id);
    toast({
      title: "Income entry deleted",
      description: "The income entry has been removed successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.source || !formData.amount || !formData.date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All fields are required",
      });
      return;
    }

    addIncome({
      source: formData.source,
      amount: Number(formData.amount),
      date: formData.date,
    });

    toast({
      title: "Income added",
      description: "New income has been added successfully.",
    });

    // Reset form and close modal
    setFormData({
      source: "",
      amount: "",
      date: "",
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedIncome) return;
    
    // Basic validation
    if (!formData.source || !formData.amount || !formData.date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All fields are required",
      });
      return;
    }

    updateIncome(selectedIncome.id, {
      source: formData.source,
      amount: Number(formData.amount),
      date: formData.date,
    });

    toast({
      title: "Income updated",
      description: "The income entry has been updated successfully.",
    });

    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Farm income" />
      
      <div className="container p-4 flex-1 pb-20">
        <div className="space-y-4">
          {incomes.map((income) => (
            <div key={income.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-farm-green">
                  <SourceIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Revenue Source</h3>
                  <p>{income.source}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-farm-orange">
                  <MoneyIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Income Amount</h3>
                  <p>{income.amount}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-black">
                  <CalendarIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Date</h3>
                  <p>{new Date(income.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-2">
                <ActionButtons 
                  onEdit={() => handleEdit(income)} 
                  onDelete={() => handleDelete(income.id)} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 right-4 left-4">
        <Button 
          className="w-full bg-farm-green hover:bg-green-600" 
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="mr-2" size={18} />
          Add income in the farm
        </Button>
      </div>

      {/* Add Income Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Income</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="source">Revenue Source</Label>
                <Input
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Enter revenue source"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-farm-green hover:bg-green-600">Add Income</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Income Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Income</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-source">Revenue Source</Label>
                <Input
                  id="edit-source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Enter revenue source"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-farm-green hover:bg-green-600">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Simple icon components
const SourceIcon = () => <div className="w-6 h-6 flex items-center justify-center">📝</div>;
const MoneyIcon = () => <div className="w-6 h-6 flex items-center justify-center">💰</div>;
const CalendarIcon = () => <div className="w-6 h-6 flex items-center justify-center">📅</div>;

export default IncomePage;
