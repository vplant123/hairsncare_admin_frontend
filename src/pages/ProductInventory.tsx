import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ProductInventory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/product`
        );
        const data = await response.json();
        console.log("product data ", data);
        if (data.statusCode === 200) {
          setProductsList(data.message);
        } else {
          console.error("API Error:", data);
          toast({
            title: "Error",
            description: "Failed to fetch products",
            variant: "destructive",
          });
          setProductsList([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to fetch products",
          variant: "destructive",
        });
        setProductsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditProduct = product => {
    // Navigate to edit page with product object in location state
    navigate("/products/edit", { state: { product } });
  };

  const handleDeleteProduct = product => {
    // Navigate to delete page with product id in location state
    navigate("/products/delete", { state: { product } });
  };

  const filteredProducts = Array.isArray(productsList)
    ? productsList.filter(product => {
        return (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.sku &&
            product.sku.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      })
    : [];

  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / rowsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Inventory</h1>
          <Button onClick={() => navigate("/products/add")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>All Products</CardTitle>
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product name or SKU..."
                  className="px-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Pagination Controls (Top) */}
            <div className="flex items-center justify-between my-2">
              <div className="flex items-center">
                <span>Rows per page&nbsp;</span>
                <select
                  value={rowsPerPage}
                  onChange={e => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page
                  }}
                  className="border rounded px-2 py-1"
                >
                  {[5, 10, 25, 50].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  {totalProducts === 0
                    ? "0"
                    : `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                        currentPage * rowsPerPage,
                        totalProducts
                      )}`}{" "}
                  of {totalProducts}
                </span>
              
               
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProducts?.map(product => (
                    <TableRow key={product._id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        {product.productDisplay ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteProduct(product)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {/* Pagination Controls (Bottom) */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {totalProducts} total products.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1 || totalPages === 0}
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || totalPages === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Last
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProductInventory;
