import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || {};
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleConfirmDelete = async () => {
    if (!product?._id) {
      toast({
        title: "Error",
        description: "Product ID is missing",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/deleteproduct`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: product._id }),
        }
      );
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Product Deleted",
          description: `${product?.name} has been deleted successfully.`,
        });
        navigate("/products");
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete product",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Delete Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Are you sure you want to delete <strong>{product.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/products")}
                className="hover:bg-primary hover:text-white transition-colors"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white transition-colors"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeleteProduct;
