
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Plus, Search, Trash2, UserPlus, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Define worker type
interface Worker {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  salary: number;
  contactNumber: string;
  status: "active" | "inactive";
}

// Form schema for adding/editing worker
const workerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  role: z.string().min(2, { message: "Role must be at least 2 characters" }),
  joinDate: z.string(),
  salary: z.coerce.number().positive({ message: "Salary must be a positive number" }),
  contactNumber: z.string().min(10, { message: "Please enter a valid contact number" }),
  status: z.enum(["active", "inactive"]),
});

const WorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentWorkerId, setCurrentWorkerId] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize form with React Hook Form
  const form = useForm<z.infer<typeof workerFormSchema>>({
    resolver: zodResolver(workerFormSchema),
    defaultValues: {
      name: "",
      role: "",
      joinDate: new Date().toISOString().split("T")[0],
      salary: 0,
      contactNumber: "",
      status: "active",
    },
  });

  // Load workers from localStorage on component mount
  useEffect(() => {
    const savedWorkers = localStorage.getItem("farmWorkers");
    if (savedWorkers) {
      setWorkers(JSON.parse(savedWorkers));
    }
  }, []);

  // Save workers to localStorage whenever the workers array changes
  useEffect(() => {
    localStorage.setItem("farmWorkers", JSON.stringify(workers));
  }, [workers]);

  // Filter workers based on search term
  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission for adding/editing a worker
  const onSubmit = (values: z.infer<typeof workerFormSchema>) => {
    if (isEditMode && currentWorkerId) {
      // Update existing worker
      setWorkers(
        workers.map((worker) =>
          worker.id === currentWorkerId
            ? { ...worker, ...values }
            : worker
        )
      );
      toast({
        title: "Worker Updated",
        description: `${values.name}'s information has been updated.`,
      });
    } else {
      // Add new worker
      const newWorker: Worker = {
        id: Date.now().toString(),
        ...values,
      };
      setWorkers([...workers, newWorker]);
      toast({
        title: "Worker Added",
        description: `${values.name} has been added to the workforce.`,
      });
    }
    handleDialogClose();
  };

  // Handle editing a worker
  const handleEditWorker = (worker: Worker) => {
    setIsEditMode(true);
    setCurrentWorkerId(worker.id);
    form.reset({
      name: worker.name,
      role: worker.role,
      joinDate: worker.joinDate,
      salary: worker.salary,
      contactNumber: worker.contactNumber,
      status: worker.status,
    });
    setIsAddDialogOpen(true);
  };

  // Handle deleting a worker
  const handleDeleteWorker = (workerId: string) => {
    const workerToDelete = workers.find(w => w.id === workerId);
    if (workerToDelete) {
      setWorkers(workers.filter((worker) => worker.id !== workerId));
      toast({
        title: "Worker Removed",
        description: `${workerToDelete.name} has been removed from the records.`,
      });
    }
  };

  // Close dialog and reset form
  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setIsEditMode(false);
    setCurrentWorkerId(null);
    form.reset({
      name: "",
      role: "",
      joinDate: new Date().toISOString().split("T")[0],
      salary: 0,
      contactNumber: "",
      status: "active",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Farm Workers Management" />
      
      <div className="container p-4 flex-1">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-farm-green" />
            <h2 className="text-2xl font-bold">Workers Records</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setIsEditMode(false);
                    setCurrentWorkerId(null);
                    form.reset({
                      name: "",
                      role: "",
                      joinDate: new Date().toISOString().split("T")[0],
                      salary: 0,
                      contactNumber: "",
                      status: "active",
                    });
                  }}
                >
                  <UserPlus className="mr-1" />
                  Add Worker
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {isEditMode ? "Edit Worker" : "Add New Worker"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Farm Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="joinDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Join Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Salary</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="30000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input placeholder="123-456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter className="pt-4">
                      <Button type="button" variant="outline" onClick={handleDialogClose}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {isEditMode ? "Save Changes" : "Add Worker"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {workers.length === 0 ? (
          <Card className="mt-8">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Workers Added Yet</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Start by adding farm workers to keep track of your workforce.
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Your First Worker
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No workers found matching your search
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredWorkers.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell className="font-medium">{worker.name}</TableCell>
                        <TableCell>{worker.role}</TableCell>
                        <TableCell>{worker.joinDate}</TableCell>
                        <TableCell>${worker.salary.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span
                              className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                worker.status === "active" ? "bg-green-500" : "bg-gray-400"
                              }`}
                            />
                            {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditWorker(worker)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteWorker(worker.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredWorkers.length} of {workers.length} workers
            </div>
          </>
        )}

        {workers.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Workforce Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="text-sm text-muted-foreground">Total Workers</div>
                    <div className="text-2xl font-semibold">{workers.length}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-muted-foreground">Active Workers</div>
                    <div className="text-2xl font-semibold">
                      {workers.filter(w => w.status === "active").length}
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <div className="text-sm text-muted-foreground">Monthly Salary Total</div>
                    <div className="text-2xl font-semibold">
                      ${workers
                        .filter(w => w.status === "active")
                        .reduce((sum, worker) => sum + worker.salary, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkersPage;
