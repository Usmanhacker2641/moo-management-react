
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFarmData, Cow } from "@/context/FarmDataContext";
import { useToast } from "@/hooks/use-toast";

interface EditCowModalProps {
  isOpen: boolean;
  onClose: () => void;
  cow: Cow;
}

const EditCowModal = ({ isOpen, onClose, cow }: EditCowModalProps) => {
  const { updateCow } = useFarmData();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    weight: "",
    tagNumber: "",
    dob: "",
  });

  // Set initial form data when cow prop changes
  useEffect(() => {
    if (cow) {
      setFormData({
        name: cow.name,
        breed: cow.breed,
        weight: cow.weight.toString(),
        tagNumber: cow.tagNumber,
        dob: cow.dob,
      });
    }
  }, [cow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.breed || !formData.weight || !formData.tagNumber || !formData.dob) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All fields are required",
      });
      return;
    }

    updateCow(cow.id, {
      name: formData.name,
      breed: formData.breed,
      weight: Number(formData.weight),
      tagNumber: formData.tagNumber,
      dob: formData.dob,
    });

    toast({
      title: "Cow updated",
      description: "Cow details have been updated successfully.",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Cow</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Cow Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter cow name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="Enter breed"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (KG)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tagNumber">Tag Number</Label>
              <Input
                id="tagNumber"
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange}
                placeholder="Enter tag number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-farm-green hover:bg-green-600">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCowModal;
