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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
      setTotalPages(Math.ceil((data?.data?.length || 0) / pageSize));
    } catch (error) {
      console.log("Error while fetching reviews:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [pageSize]);

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

  // Calculate pagination
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = allreviews.slice(indexOfFirstItem, indexOfLastItem);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
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
              {currentItems.map(review => (
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

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Show</p>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600">entries</p>
          </div>

          <div className="flex items-center gap-2">
            {/* <p className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, allreviews.length)} of {allreviews.length} entries
            </p> */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {getPageNumbers().map((pageNum, index) => (
                  <PaginationItem key={index}>
                    {pageNum === '...' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => setCurrentPage(Number(pageNum))}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
