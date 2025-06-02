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
import { Switch } from "@/components/ui/switch";
import toast, { Toaster } from "react-hot-toast";

interface Review {
  _id: string;
  name?: string;
  comment: string;
  rating: number;
  productId?: { name?: string };
  isDeleted?: boolean;
}

const Reviews = () => {
  const [allreviews, setAllReviews] = useState<Review[]>([]);
  const token = localStorage.getItem("token");

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/getReviewAll`,
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

  const handleToggleStatus = async (reviewId: string, newIsDeletedStatus: boolean) => {
    console.log(`Attempting to update status for review ${reviewId} via delete endpoint. New isDeleted status: ${newIsDeletedStatus}`);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/deleteReview/${reviewId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to toggle status:", errorData);
        toast.error(errorData.message || "Failed to update status via delete endpoint");
        handleFetchData();
        return;
      }

      const result = await response.json();
      console.log("Status updated successfully via delete endpoint:", result);
      toast.success(newIsDeletedStatus ? "Review set to inactive" : "Review set to active");

      handleFetchData();
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Error updating review status");
      handleFetchData();
    }
  };

  return (
    <DashboardLayout>
      <Toaster />
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
                <TableHead>Status</TableHead>
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
                    <Switch
                      checked={!review.isDeleted}
                      onCheckedChange={(isChecked) => handleToggleStatus(review._id, !isChecked)}
                      aria-label={review.isDeleted ? "Activate review" : "Deactivate review"}
                    />
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
