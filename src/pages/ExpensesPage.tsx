
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";
import ActionButtons from "@/components/ActionButtons";
import { useFarmData, Expense } from "@/context/FarmDataContext";
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

const ExpensesPage = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useFarmData();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setFormData({
      name: expense.name,
      amount: expense.amount.toString(),
      date: expense.date,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    toast({
      title: "Expense deleted",
      description: "The expense has been removed successfully.",
    });
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.amount || !formData.date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All fields are required",
      });
      return;
    }

    addExpense({
      name: formData.name,
      amount: Number(formData.amount),
      date: formData.date,
    });

    toast({
      title: "Expense added",
      description: "New expense has been added successfully.",
    });

    // Reset form and close modal
    setFormData({
      name: "",
      amount: "",
      date: "",
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedExpense) return;
    
    // Basic validation
    if (!formData.name || !formData.amount || !formData.date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All fields are required",
      });
      return;
    }

    updateExpense(selectedExpense.id, {
      name: formData.name,
      amount: Number(formData.amount),
      date: formData.date,
    });

    toast({
      title: "Expense updated",
      description: "The expense has been updated successfully.",
    });

    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Farm expenses" />
      
      <div className="container p-4 flex-1 pb-20">
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-farm-green">
                  <InputIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Input Name</h3>
                  <p>{expense.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-farm-orange">
                  <ChartIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Cost</h3>
                  <p>{expense.amount}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-black">
                  <CalendarIcon />
                </span>
                <div>
                  <h3 className="font-semibold">Date</h3>
                  <p>{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-2">
                <ActionButtons 
                  onEdit={() => handleEdit(expense)} 
                  onDelete={() => handleDelete(expense.id)} 
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
          Add input expense
        </Button>
      </div>

      {/* Add Expense Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Input Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleAddChange}
                  placeholder="Enter expense name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleAddChange}
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
                  onChange={handleAddChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-farm-green hover:bg-green-600">Add Expense</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Expense Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Input Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleAddChange}
                  placeholder="Enter expense name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleAddChange}
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
                  onChange={handleAddChange}
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
const InputIcon = () => <div className="w-6 h-6 flex items-center justify-center">📝</div>;
const ChartIcon = () => <div className="w-6 h-6 flex items-center justify-center">📊</div>;
const CalendarIcon = () => <div className="w-6 h-6 flex items-center justify-center">📅</div>;

export default ExpensesPage;
