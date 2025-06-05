import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

function AddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const fileInputRef = React.useRef(null); // Create a ref for the file input

  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    name: "",
    price: "",
    description: "",
    longDes: "",
    ingredients: "", // Maps to ingredient (array in backend)
    benefits: "", // Maps to benefits (array in backend)
    faq: "", // Maps to faq (array in backend)
    highlights: "",
    stock: "",
    discount: "",
    productType: "",
    image: [], // Maps to src in backend
    filterTag: "", // Maps to filter
    gst: "",
    expiryDate: "",
    batchNo: "",
    mfgName: "",
    weight: "",
    height: "",
    width: "",
    slug: "", // Maps to metaSlug
    canonical: "", // Maps to metaCanonical
    seoMetaTitle: "", // Maps to metaTitle
    seoMetaDesc: "", // Maps to metaDesc
    productDisplay: false,
    kit: [], // Added to match schema
    userReview: [], // Added to match schema
    shortDes: "", // Added to match schema
    benefitsMain: "", // Added to match schema
    ingredientMain: "", // Added to match schema
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]); // Store selected image files
  const [errors, setErrors] = useState({}); // Store validation errors

  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);
          const data = await response.json();
          setFormData({
            ...data,
            image: data.src || [], // Map src to image
            filterTag: data.filter ? data.filter.join(", ") : "", // Convert array to comma-separated string
            slug: data.metaSlug || "",
            canonical: data.metaCanonical || "",
            seoMetaTitle: data.metaTitle || "",
            seoMetaDesc: data.metaDesc || "",
            kit: data.kit || [],
            userReview: data.userReview || [],
            shortDes: data.shortDes || "",
            benefitsMain: data.benefitsMain || "",
            ingredientMain: data.ingredientMain || "",
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          toast({
            title: "Error",
            description: "Failed to fetch product data.",
            variant: "destructive",
          });
        }
      };
      fetchProductData();
    }
  }, [id, isEditMode]);

  // Validation function
  const isValid = () => {
    const newErrors = {};

    // Required fields per schema
    const requiredFields = ["name", "price", "description", "expiryDate"];
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} is required`;
      }
    });

    // Validate expiry date
    if (formData.expiryDate) {
      const selectedDate = new Date(formData.expiryDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (selectedDate < tomorrow) {
        newErrors.expiryDate = "Expiry date must be at least tomorrow";
      }
    }

    // Optional fields with validation
    if (formData.price && (isNaN(formData.price) || formData.price <= 0)) {
      newErrors.price = "Price must be a valid positive number";
    }
    if (formData.stock && (isNaN(formData.stock) || formData.stock < 0)) {
      newErrors.stock = "Stock must be a valid non-negative number";
    }
    if (
      formData.discount &&
      (isNaN(formData.discount) ||
        formData.discount < 0 ||
        formData.discount > 100)
    ) {
      newErrors.discount = "Discount must be a number between 0 and 100";
    }
    if (formData.weight && (isNaN(formData.weight) || formData.weight <= 0)) {
      newErrors.weight = "Weight must be a valid positive number";
    }
    if (formData.height && (isNaN(formData.height) || formData.height <= 0)) {
      newErrors.height = "Height must be a valid positive number";
    }
    if (formData.width && (isNaN(formData.width) || formData.width <= 0)) {
      newErrors.width = "Width must be a valid positive number";
    }
    if (formData.gst && (isNaN(formData.gst) || formData.gst < 0)) {
      newErrors.gst = "GST must be a valid non-negative number";
    }

    // Image validation
    if (!isEditMode && imageFiles.length === 0 && formData.image.length === 0) {
      newErrors.image = "At least one product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e, field) => {
    if (typeof e === "string") {
      setFormData(prev => ({
        ...prev,
        [field]: e,
      }));
    } else {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error for the field being edited
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleImageUpload = e => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImageFiles(prev => [...prev, ...newImages]);
      setErrors(prev => ({ ...prev, image: "" }));
    }
  };

  const removeSelectedImage = (indexToRemove) => {
    setImageFiles(prev => prev.filter((_, i) => i !== indexToRemove));
    // Reset the file input value after removing an image
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImage = async file => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const imageResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/hair-tests/upload-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!imageResponse.ok) {
        throw new Error("Image upload failed");
      }

      const data = await imageResponse.json();
      return data.imageUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Form submission started");
    setIsLoading(true);

    // Validate form
    console.log("Validating form...");
    if (!isValid()) {
      console.log("Form validation failed");
      setIsLoading(false);
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    console.log("Form validation passed");

    try {
      // Check token
      console.log("Checking authentication token...");
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to continue.");
      }
      console.log("Token found:", token);

      // Upload images
      console.log("Processing images...");
      let imageUrls = [...formData.image];
      if (imageFiles.length > 0) {
        console.log(`Uploading ${imageFiles.length} image(s)...`);
        const uploadPromises = imageFiles.map(file => uploadImage(file));
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls];
        console.log("Image URLs:", imageUrls);
      } else {
        console.log("No new images to upload");
      }

      // Prepare data
      console.log("Preparing data for submission...");
      const dataToSend = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description, // HTML content as a string
        kit: formData.kit,
        image: imageUrls,
        longDes: formData.longDes, // HTML content as a string
        stock: formData.stock,
        userReview: formData.userReview,
        discount: formData.discount ? parseFloat(formData.discount) : "",
        shortDes: formData.shortDes, // HTML content as a string
        highlights: formData.highlights, // HTML content as a string
        benefitsMain: formData.benefitsMain, // HTML content as a string
        ingredientMain: formData.ingredientMain, // HTML content as a string
        productDisplay: formData.productDisplay,
        category: formData.category,
        subCategory: formData.subCategory,
        gst: formData.gst ? parseFloat(formData.gst) : "",
        expiryDate: formData.expiryDate || undefined,
        batchNo: formData.batchNo,
        mfgName: formData.mfgName,
        width: formData.width ? parseFloat(formData.width) : "",
        height: formData.height ? parseFloat(formData.height) : "",
        weight: formData.weight ? parseFloat(formData.weight) : "",
        metaTitle: formData.seoMetaTitle,
        metaDesc: formData.seoMetaDesc,
        metaSlug: formData.slug,
        metaCanonical: formData.canonical,

        // Other fields with potential HTML content
        // benefits: formData.benefits ? JSON.parse(formData.benefits) : [],
        // ingredient: formData.ingredients
        //   ? JSON.parse(formData.ingredients)
        //   : [],
        // faq: formData.faq ? JSON.parse(formData.faq) : [],

        // filter: formData.filterTag
        //   ? formData.filterTag.split(",").map((tag) => tag.trim())
        //   : [],
      };
      console.log("Prepared data:", dataToSend);

      // Stringify data
      console.log("Stringifying data...");
      const jsonData = JSON.stringify(dataToSend);
      console.log("Stringified data:", jsonData);

      // Send data to API
      console.log("Sending request to API...");
      const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/addproduct`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: jsonData,
        }
      );

      // Check if response is HTML or JSON
      const rawResponse = await response.text(); // Get the raw response as text
      if (response.ok) {
        let data;
        try {
          data = JSON.parse(rawResponse); // Try to parse as JSON
          console.log("Response data:", data);
        } catch (err) {
          console.error("Error parsing JSON response:", err);
          throw new Error("Unexpected server response. Please try again.");
        }

        // Continue with the success flow if JSON response is valid
        console.log("Product operation successful");
        toast({
          title: "Success",
          description: `Product ${
            isEditMode ? "updated" : "added"
          } successfully.`,
        });

        // Reset form
        console.log("Resetting form...");
        setFormData({
          // reset form data here
        });
        setImageFiles([]);
        setErrors({});
        console.log("Form reset complete");

        console.log("Navigating to products page...");
        navigate("/products");
      } else {
        console.error("Server response error:", rawResponse);
        throw new Error(rawResponse || "Failed to add/update product");
      }
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} product:`,
        error
      );
      toast({
        title: "Error",
        description:
          error.message ||
          `Failed to ${
            isEditMode ? "update" : "add"
          } product. Please try again.`,
        variant: "destructive",
      });
    } finally {
      console.log("Submission process complete");
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? "Edit Product" : "Add Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={value =>
                      setFormData(prev => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="oral">Oral</SelectItem>
                      <SelectItem value="topical">
                        Topical (External Use)
                      </SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={e => handleChange(e, "name")}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={e => handleChange(e, "price")}
                    placeholder="Enter price"
                    min="0"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Sub Category</Label>
                  <Select
                    value={formData.subCategory}
                    onValueChange={value =>
                      setFormData(prev => ({ ...prev, subCategory: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="tablets">Tablets</SelectItem>
                      <SelectItem value="syrup">Syrup</SelectItem>
                      <SelectItem value="sachets">Sachets</SelectItem>
                      <SelectItem value="hair-solution">
                        Hair Solution
                      </SelectItem>
                      <SelectItem value="serum">Serum</SelectItem>
                      <SelectItem value="oil">Oil</SelectItem>
                      <SelectItem value="gel">Gel</SelectItem>
                      <SelectItem value="mask">Mask</SelectItem>
                      <SelectItem value="cream">Cream & Ointments</SelectItem>
                      <SelectItem value="shampoo">Shampoo</SelectItem>
                      <SelectItem value="conditioner">Conditioner</SelectItem>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="spray">Spray</SelectItem>
                      <SelectItem value="foam">Foam</SelectItem>
                      <SelectItem value="fider">Fider</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subCategory && (
                    <p className="text-red-500 text-sm">{errors.subCategory}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={e => handleChange(e, "expiryDate")}
                    min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                    required
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Batch No</Label>
                  <Input
                    name="batchNo"
                    value={formData.batchNo}
                    onChange={e => handleChange(e, "batchNo")}
                    placeholder="Enter batch number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Manufacturer Name</Label>
                  <Input
                    name="mfgName"
                    value={formData.mfgName}
                    onChange={e => handleChange(e, "mfgName")}
                    placeholder="Enter manufacturer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight (in grams)</Label>
                  <Input
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={e => handleChange(e, "weight")}
                    placeholder="Enter weight"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm">{errors.weight}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Height (in cm)</Label>
                  <Input
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={e => handleChange(e, "height")}
                    placeholder="Enter height"
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm">{errors.height}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Width (in cm)</Label>
                  <Input
                    name="width"
                    type="number"
                    value={formData.width}
                    onChange={e => handleChange(e, "width")}
                    placeholder="Enter width"
                  />
                  {errors.width && (
                    <p className="text-red-500 text-sm">{errors.width}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    name="slug"
                    value={formData.slug}
                    onChange={e => handleChange(e, "slug")}
                    placeholder="Enter slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input
                    name="canonical"
                    value={formData.canonical}
                    onChange={e => handleChange(e, "canonical")}
                    placeholder="Enter canonical URL"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount (%)</Label>
                  <Input
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={e => handleChange(e, "discount")}
                    placeholder="Enter discount percentage"
                    min="0"
                    max="100"
                  />
                  {errors.discount && (
                    <p className="text-red-500 text-sm">{errors.discount}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={e => handleChange(e, "stock")}
                    placeholder="Enter stock quantity"
                    min="0"
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm">{errors.stock}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>GST (%)</Label>
                <Input
                  name="gst"
                  type="number"
                  value={formData.gst}
                  onChange={e => handleChange(e, "gst")}
                  placeholder="Enter GST percentage"
                  min="0"
                />
                {errors.gst && (
                  <p className="text-red-500 text-sm">{errors.gst}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>SEO Meta Title</Label>
                <Input
                  name="seoMetaTitle"
                  value={formData.seoMetaTitle}
                  onChange={e => handleChange(e, "seoMetaTitle")}
                  placeholder="Enter SEO meta title"
                />
              </div>

              <div className="space-y-2">
                <Label>SEO Meta Description</Label>
                <Textarea
                  name="seoMetaDesc"
                  value={formData.seoMetaDesc}
                  onChange={e => handleChange(e, "seoMetaDesc")}
                  placeholder="Enter SEO meta description"
                />
              </div>

              <div className="space-y-2">
                <Label>Filter Tags (comma-separated)</Label>
                <Input
                  name="filterTag"
                  value={formData.filterTag}
                  onChange={e => handleChange(e, "filterTag")}
                  placeholder="Enter filter tags (e.g., hair, skin)"
                />
              </div>

              <div className="space-y-2">
                <Label>Short Description</Label>
                <ReactQuill
                  value={formData.shortDes}
                  onChange={value => handleChange(value, "shortDes")}
                  theme="snow"
                  placeholder="Type short description here..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <ReactQuill
                  value={formData.description}
                  onChange={value => handleChange(value, "description")}
                  theme="snow"
                  placeholder="Type product description here..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Long Description</Label>
                <ReactQuill
                  value={formData.longDes}
                  onChange={value => handleChange(value, "longDes")}
                  theme="snow"
                  placeholder="Type long description here..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Main Ingredients</Label>
                <ReactQuill
                  value={formData.ingredientMain}
                  onChange={value => handleChange(value, "ingredientMain")}
                  theme="snow"
                  placeholder="Type main ingredients here..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Ingredients</Label>
                <ReactQuill
                  value={formData.ingredients}
                  onChange={value => handleChange(value, "ingredients")}
                  theme="snow"
                  placeholder="Type ingredients here (format as JSON array if structured)..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Main Benefits</Label>
                <ReactQuill
                  value={formData.benefitsMain}
                  onChange={value => handleChange(value, "benefitsMain")}
                  theme="snow"
                  placeholder="Type main benefits here..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Benefits</Label>
                <ReactQuill
                  value={formData.benefits}
                  onChange={value => handleChange(value, "benefits")}
                  theme="snow"
                  placeholder="Type benefits here (format as JSON array if structured)..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>FAQ</Label>
                <ReactQuill
                  value={formData.faq}
                  onChange={value => handleChange(value, "faq")}
                  theme="snow"
                  placeholder="Type FAQ here (format as JSON array if structured)..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Highlights</Label>
                <ReactQuill
                  value={formData.highlights}
                  onChange={value => handleChange(value, "highlights")}
                  theme="snow"
                  placeholder="Type highlights here..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ align: [] }],
                      ["bold", "italic", "underline"],
                      ["link"],
                      [{ color: [] }, { background: [] }],
                      ["blockquote", "code-block"],
                      ["image"],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Kit Items (comma-separated)</Label>
                <Input
                  name="kit"
                  value={formData.kit.join(", ")}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      kit: e.target.value.split(",").map(item => item.trim()),
                    }))
                  }
                  placeholder="Enter kit items (e.g., item1, item2)"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="productDisplay"
                  checked={formData.productDisplay}
                  onCheckedChange={checked =>
                    setFormData(prev => ({
                      ...prev,
                      productDisplay: checked,
                    }))
                  }
                />
                <Label htmlFor="productDisplay">
                  Display on Product Section
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  ref={fileInputRef} // Assign the ref to the input
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}

                {/* Preview for newly selected images */}
                {imageFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Selected Images:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imageFiles.map((file, index) => (
                        <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Selected preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                            onClick={() => removeSelectedImage(index)} // Use the new remove function
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview for existing images in edit mode */}
                {isEditMode && formData.image.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Existing Images:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.image.map((url, index) => (
                         <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden">
                          <img
                            src={url}
                            alt={`Existing image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                           {/* Add delete functionality for existing images if needed */}
                         </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-start gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="mr-2">Loading...</span>
                      <span className="animate-spin">⚡</span>
                    </>
                  ) : isEditMode ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/products")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default AddProduct;
