
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFarmData, MilkRecord } from "@/context/FarmDataContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MilkProductionPage = () => {
  const { milkRecords, addMilkRecord } = useFarmData();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("production");
  const [formData, setFormData] = useState({
    amount: "",
    time: "morning",
    date: format(new Date(), "yyyy-MM-dd"),
    comments: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Format month display
  const formattedMonth = format(selectedDate, "MMMM yyyy");
  
  // Get the records for the selected date
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const recordsForSelectedDate = milkRecords.filter(record => record.date === dateStr);
  
  // Calculate totals
  const totalForSelectedDate = recordsForSelectedDate.reduce(
    (sum, record) => sum + record.amount, 0
  );
  
  const totalForMonth = milkRecords.reduce((sum, record) => {
    const recordDate = new Date(record.date);
    const sameMonth = recordDate.getMonth() === selectedDate.getMonth();
    const sameYear = recordDate.getFullYear() === selectedDate.getFullYear();
    
    if (sameMonth && sameYear) {
      return sum + record.amount;
    }
    return sum;
  }, 0);
  
  const allTimeMilk = milkRecords.reduce((sum, record) => sum + record.amount, 0);
  
  const previousDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };
  
  const nextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    
    // Don't allow selecting future dates
    if (next <= new Date()) {
      setSelectedDate(next);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.amount || !formData.time || !formData.date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Amount, time and date are required",
      });
      return;
    }

    addMilkRecord({
      amount: Number(formData.amount),
      time: formData.time,
      date: formData.date,
      comments: formData.comments || "",
    });

    toast({
      title: "Milk record added",
      description: "New milk record has been added successfully.",
    });

    // Reset form and close modal
    setFormData({
      amount: "",
      time: "morning",
      date: format(new Date(), "yyyy-MM-dd"),
      comments: "",
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Milk production" />
      
      <div className="container p-4 flex-1 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="production" className="flex-1">
              <div className="flex items-center justify-center">
                <span className="mr-2">💧</span>
                <span>Milk production</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex-1">
              <div className="flex items-center justify-center">
                <span className="mr-2">🩺</span>
                <span>Health records</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="reproduction" className="flex-1">
              <div className="flex items-center justify-center">
                <span className="mr-2">📅</span>
                <span>Reproduction events</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="production" className="space-y-4">
            {/* Date selector */}
            <div className="flex items-center justify-between bg-gray-200 p-3 rounded-lg">
              <Button 
                variant="outline"
                size="sm"
                className="bg-gray-200 border-0 hover:bg-gray-300"
                onClick={previousDay}
              >
                <span className="text-xl">←</span>
              </Button>
              <span className="font-semibold">
                {format(selectedDate, "d MMMM yyyy")}
              </span>
              <Button 
                variant="outline"
                size="sm"
                className="bg-gray-200 border-0 hover:bg-gray-300"
                onClick={nextDay}
              >
                <span className="text-xl">→</span>
              </Button>
            </div>
            
            {/* Calendar week view (simplified) */}
            <div className="overflow-x-auto">
              <div className="inline-flex min-w-full">
                {["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"].map((day, i) => {
                  const date = new Date(selectedDate);
                  date.setDate(date.getDate() - date.getDay() + i);
                  const isSelected = date.getDate() === selectedDate.getDate() && 
                                     date.getMonth() === selectedDate.getMonth() &&
                                     date.getFullYear() === selectedDate.getFullYear();
                  
                  return (
                    <div 
                      key={day} 
                      className={`flex-1 text-center p-2 min-w-[70px] ${
                        isSelected ? "bg-gray-200" : ""
                      }`}
                    >
                      <div className="text-xs text-gray-500">{day}</div>
                      <div>{date.getDate()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Milk production summary */}
            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center text-farm-orange mb-2">
                <span className="mr-2">💧</span>
                <div className="text-sm">
                  <p>Total milk for {format(selectedDate, "dd/MM/yyyy")}: {totalForSelectedDate}lts</p>
                  <p>Total milk for {formattedMonth}: {totalForMonth}lts</p>
                  <p>All time milk: {allTimeMilk}lts</p>
                </div>
              </div>
            </div>
            
            {/* Daily milk records */}
            <div className="space-y-3">
              {recordsForSelectedDate.map(record => (
                <div key={record.id} className="bg-white p-4 border rounded-lg">
                  <div className="font-semibold mb-1">Amount: {record.amount}lts</div>
                  <div className="text-gray-500 text-sm">Time: {record.time}</div>
                  <div className="text-gray-500 text-sm">Comments: {record.comments}</div>
                  <div className="text-right text-gray-500 text-xs">
                    {new Date(record.date).toLocaleDateString()}
                  </div>
                </div>
              ))}

              {recordsForSelectedDate.length === 0 && (
                <div className="bg-white p-4 border rounded-lg text-center text-gray-500">
                  No milk records for this date
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4">
            <div className="bg-white p-4 border rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Health Records</h3>
              <p className="text-gray-500">
                This feature will be available in a future update.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reproduction" className="space-y-4">
            <div className="bg-white p-4 border rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Reproduction Events</h3>
              <p className="text-gray-500">
                This feature will be available in a future update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="fixed bottom-4 right-4 left-4">
        <Button 
          className="w-full bg-farm-green hover:bg-green-600" 
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="mr-2" size={18} />
          Record intake
        </Button>
      </div>

      {/* Add Milk Record Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Milk Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (Liters)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.1"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter milk amount"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Select 
                  value={formData.time} 
                  onValueChange={(value) => handleSelectChange("time", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="mid-morning">Mid-morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                  </SelectContent>
                </Select>
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
              
              <div className="grid gap-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Good, Fair, Poor, etc."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-farm-green hover:bg-green-600">Add Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MilkProductionPage;
