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
import toast from "react-hot-toast";

interface Review {
  id: string;
  customerName: string;
  comment: string;
  rating: number;
  productName: string;
}

const Reviews = () => {
  const [allreviews, setAllReviews] = useState<Review[]>([]);
  const token = localStorage.getItem("token");

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/getReviewAll",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);

      setAllReviews(data?.data || []);
    } catch (error) {
      console.log("Error while fetching reviews:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/deleteReview/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      await handleFetchData();
      if (!response.ok) {
        const errorText = await response.text();

        console.error("Delete failed:", errorText);
        toast.success("Review Delete Successfully");
        return;
      }

      // Remove deleted review from local state
      setAllReviews(prev => prev.filter(review => review.id !== id));
    } catch (error) {
      toast.error("Review Deletion Unsuccessfully");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Customer Reviews</h1>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allreviews.map(review => (
                <TableRow key={review._id}>
                  <TableCell>{review.name}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {review.comment}
                  </TableCell>
                  <TableCell>{review.rating} / 5</TableCell>
                  <TableCell>{review?.productId?.name}</TableCell>
                  <TableCell>
                    {review.isDeleted ? "Visible" : "Not Visible"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(review._id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
