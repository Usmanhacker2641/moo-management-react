
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";

interface Worker {
  id: string;
  name: string;
  role: string;
  hoursWorked: number;
  wage: number;
  notes: string;
  date: string;
}

const WorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [wage, setWage] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Load workers from localStorage on component mount
  useEffect(() => {
    const savedWorkers = localStorage.getItem("workers");
    if (savedWorkers) {
      setWorkers(JSON.parse(savedWorkers));
    }
  }, []);

  // Save workers to localStorage whenever the workers state changes
  useEffect(() => {
    localStorage.setItem("workers", JSON.stringify(workers));
  }, [workers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !role || !hoursWorked || !wage) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editingId) {
      // Update existing worker
      const updatedWorkers = workers.map(worker => 
        worker.id === editingId 
          ? { 
              ...worker, 
              name, 
              role, 
              hoursWorked: parseFloat(hoursWorked), 
              wage: parseFloat(wage), 
              notes 
            } 
          : worker
      );
      setWorkers(updatedWorkers);
      toast.success("Worker record updated successfully");
    } else {
      // Add new worker
      const newWorker: Worker = {
        id: Date.now().toString(),
        name,
        role,
        hoursWorked: parseFloat(hoursWorked),
        wage: parseFloat(wage),
        notes,
        date: new Date().toISOString().split('T')[0]
      };
      setWorkers([...workers, newWorker]);
      toast.success("Worker record added successfully");
    }
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setHoursWorked("");
    setWage("");
    setNotes("");
    setEditingId(null);
  };

  const handleEdit = (worker: Worker) => {
    setName(worker.name);
    setRole(worker.role);
    setHoursWorked(worker.hoursWorked.toString());
    setWage(worker.wage.toString());
    setNotes(worker.notes || "");
    setEditingId(worker.id);
  };

  const handleDelete = (id: string) => {
    setWorkers(workers.filter(worker => worker.id !== id));
    toast.success("Worker record deleted successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <DashboardHeader title="Workers Management" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Worker Record" : "Add Worker Record"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Worker Name</Label>
                <Input 
                  id="name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter worker name" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role"
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  placeholder="Enter worker role" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="hours">Hours Worked</Label>
                <Input 
                  id="hours"
                  type="number" 
                  value={hoursWorked} 
                  onChange={(e) => setHoursWorked(e.target.value)} 
                  placeholder="Enter hours worked" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="wage">Hourly Wage</Label>
                <Input 
                  id="wage"
                  type="number" 
                  value={wage} 
                  onChange={(e) => setWage(e.target.value)} 
                  placeholder="Enter hourly wage" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes"
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  placeholder="Additional notes..." 
                  rows={3} 
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button type="submit">
                  {editingId ? "Update Record" : "Save Record"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Worker Records</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Hours</th>
                    <th className="p-3">Wage</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-3 text-center text-gray-500">
                        No worker records found. Add a new record to get started.
                      </td>
                    </tr>
                  ) : (
                    workers.map((worker) => (
                      <tr key={worker.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{worker.name}</td>
                        <td className="p-3">{worker.role}</td>
                        <td className="p-3">{worker.hoursWorked}</td>
                        <td className="p-3">${worker.wage.toFixed(2)}/hr</td>
                        <td className="p-3">{worker.date}</td>
                        <td className="p-3 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit(worker)}
                          >
                            <Edit size={18} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(worker.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {workers.length > 0 && (
              <div className="mt-4 text-right text-sm text-gray-500">
                Total records: {workers.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;
