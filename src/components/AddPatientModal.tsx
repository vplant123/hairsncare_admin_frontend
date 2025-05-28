import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patientData: PatientData) => void;
}

interface PatientData {
  name: string;
  email: string;
  age: string;
  phone: string;
  orders: string;
  orderAmount: string;
  completedHairTest: string;
  hairTestAmount: string;
  lastLogin: string;
  cartItems: string;
  status: string;
}

export default function AddPatientModal({
  isOpen,
  onClose,
  onSubmit,
}: AddPatientModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PatientData>({
    name: "",
    email: "",
    age: "",
    phone: "",
    orders: "0",
    orderAmount: "0",
    completedHairTest: "No",
    hairTestAmount: "0",
    lastLogin: new Date().toISOString().split("T")[0],
    cartItems: "0",
    status: "Active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }

    onSubmit(formData);
    onClose();

    // Reset form
    setFormData({
      name: "",
      email: "",
      age: "",
      phone: "",
      orders: "0",
      orderAmount: "0",
      completedHairTest: "No",
      hairTestAmount: "0",
      lastLogin: new Date().toISOString().split("T")[0],
      cartItems: "0",
      status: "Active",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email ID *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="0"
                max="150"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(XXX) XXX-XXXX"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="orders">Orders</Label>
              <Input
                id="orders"
                name="orders"
                type="number"
                value={formData.orders}
                onChange={handleChange}
                placeholder="Number of orders"
                min="0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="orderAmount">Order Amount ($)</Label>
              <Input
                id="orderAmount"
                name="orderAmount"
                type="number"
                value={formData.orderAmount}
                onChange={handleChange}
                placeholder="Enter order amount"
                min="0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="completedHairTest">Completed Hair Test</Label>
              <Input
                id="completedHairTest"
                name="completedHairTest"
                value={formData.completedHairTest}
                onChange={handleChange}
                placeholder="Yes/No"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="hairTestAmount">Hair Test Amount ($)</Label>
              <Input
                id="hairTestAmount"
                name="hairTestAmount"
                type="number"
                value={formData.hairTestAmount}
                onChange={handleChange}
                placeholder="Enter hair test amount"
                min="0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cartItems">Cart Items</Label>
              <Input
                id="cartItems"
                name="cartItems"
                type="number"
                value={formData.cartItems}
                onChange={handleChange}
                placeholder="Number of items in cart"
                min="0"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Patient</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
