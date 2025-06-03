import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ContactRow {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  method: string;
}

const ContactUs: React.FC = () => {
  const [rows, setRows] = useState<ContactRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  const fetchContactDetails = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login to continue.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/contactDetails`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contact details");
      }

      const data = await response.json();
      setRows(data.data || []);
    } catch (error) {
      console.error("Error fetching contact details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch contact details. Please try again.",
        variant: "destructive",
        className:"bg-white"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const handleDeleteClick = (id: string) => {
    setContactToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!contactToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login to continue.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/deleteContact`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: contactToDelete }),
        }
      );
console.log(contactToDelete)
      const data = await response.json();
      console.log("Delete response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete contact");
        
      }

      if (data.success) {
        // Remove the deleted contact from the state
        setRows(prevRows => prevRows.filter(row => row._id !== contactToDelete));
        
        toast({
          title: "Success",
          description: "Contact deleted successfully.",
          className:"bg-white"
        });
        fetchContactDetails();
      } else {
        throw new Error(data.message || "Failed to delete contact");
      }
    } catch (error: any) {
      console.error("Error deleting contact:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete contact. Please try again.",
        variant: "destructive",
        className:"bg-white"
      });
    } finally {
      setDeleteDialogOpen(false);
      setContactToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Contact Submissions</h1>
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : rows.length ? (
                rows.map(row => (
                  <TableRow key={row._id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.message}</TableCell>
                    <TableCell>{row.method}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(row._id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-red-600">Delete Contact</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center">
             
              <p className="text-lg font-medium mb-2">Are you sure you want to delete this contact?</p>
             
            </div>
            <DialogFooter className="flex justify-center gap-4 sm:justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setContactToDelete(null);
                }}
                className="w-24"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="w-24 bg-red-500 hover:bg-red-600  text-white"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ContactUs;
