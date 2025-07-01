import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

  const fileInputRef = React.useRef(null);

  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    name: "",
    price: "",
    description: "",
    longDes: "",
    ingredients: [], // Changed to array of objects
    benefits: [], // Changed to array of objects
    faq: [], // Changed to array of objects
    highlights: "",
    stock: "",
    discount: "",
    productType: "",
    image: [],
    filterTag: "",
    gst: "",
    expiryDate: "",
    batchNo: "",
    mfgName: "",
    weight: "",
    height: "",
    width: "",
    hsnNo: "",
    seoMetaSlug: "",
    canonical: "",
    seoMetaTitle: "",
    seoMetaDesc: "",
    productDisplay: false,
    kit: [],
    userReview: [],
    shortDes: "",
    benefitsMain: "",
    ingredientMain: "",
    slug: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);
          const data = await response.json();
          setFormData({
            ...data,
            image: data.src || [],
            filterTag: data.filter ? data.filter.join(", ") : "",
            slug: data.metaSlug || "",
            canonical: data.metaCanonical || "",
            seoMetaTitle: data.metaTitle || "",
            seoMetaDesc: data.metaDesc || "",
            seoMetaSlug: data.metaSlug || "",
            kit: data.kit || [],
            userReview: data.userReview || [],
            shortDes: data.shortDes || "",
            benefitsMain: data.benefitsMain || "",
            ingredientMain: data.ingredientMain || "",
            benefits: data.benefits || [], // Ensure array
            ingredients: data.ingredient || [], // Ensure array
            faq: data.faq || [], // Ensure array
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          toast({
            title: "Error",
            description: "Failed to fetch product data.",
            variant: "destructive",
            className: "bg-white"
          });
        }
      };
      fetchProductData();
    }
  }, [id, isEditMode]);

  // Validation function
  const isValid = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = {
      name: "Product name",
      price: "Price",
      description: "Description",
      category: "Category",
      subCategory: "Sub Category",
      expiryDate: "Expiry date",
      batchNo: "Batch number",
      mfgName: "Manufacturer name",
      weight: "Weight",
      height: "Height",
      width: "Width",
      stock: "Stock",
      hsnNo: "HSN number",
    };

    // Check each required field
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field] || String(formData[field]).trim() === "") {
        newErrors[field] = `${label} is required`;
      }
    });

    // Validate numeric fields
    if (formData.price && (isNaN(formData.price) || Number(formData.price) <= 0)) {
      newErrors.price = "Price must be a positive number";
    }

    if (formData.stock && (isNaN(formData.stock) || Number(formData.stock) < 0)) {
      newErrors.stock = "Stock must be a non-negative number";
    }

    if (formData.discount && (isNaN(formData.discount) || Number(formData.discount) < 0)) {
      newErrors.discount = "Discount must be a non-negative number";
    }

    if (formData.gst && (isNaN(formData.gst) || Number(formData.gst) < 0)) {
      newErrors.gst = "GST must be a non-negative number";
    }

    // Validate dimensions
    if (formData.weight && (isNaN(formData.weight) || Number(formData.weight) <= 0)) {
      newErrors.weight = "Weight must be a positive number";
    }

    if (formData.height && (isNaN(formData.height) || Number(formData.height) <= 0)) {
      newErrors.height = "Height must be a positive number";
    }

    if (formData.width && (isNaN(formData.width) || Number(formData.width) <= 0)) {
      newErrors.width = "Width must be a positive number";
    }

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

    // Image validation for new products
    if (!isEditMode && imageFiles.length === 0 && formData.image.length === 0) {
      newErrors.image = "At least one product image is required";
    }

    setErrors(newErrors);

    // If there are errors, show a toast with the error summary
    if (Object.keys(newErrors).length > 0) {
      const errorMessage = Object.entries(newErrors)
        .map(([field, message]) => `• ${message}`)
        .join('\n');
      
      toast({
        title: "Validation Errors",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    return true;
  };

  const handleChange = (e, field) => {
    if (typeof e === "string") {
      setFormData((prev) => ({
        ...prev,
        [field]: e,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Handlers for structured fields
  const addItem = (field) => {
    if (field === "kit") {
      setFormData((prev) => ({
        ...prev,
        kit: [...prev.kit, ""],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], { title: "", desc: "" }],
      }));
    }
  };
  const updateItem = (field, index, key, value) => {
    if (field === "kit") {
      const newKit = [...formData.kit];
      newKit[index] = value;
      setFormData((prev) => ({
        ...prev,
        kit: newKit,
      }));
    } else {
      const updated = [...formData[field]];
      updated[index][key] = value;
      setFormData((prev) => ({ ...prev, [field]: updated }));
    }
  };
  const removeItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImageFiles((prev) => [...prev, ...newImages]);
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const removeSelectedImage = (indexToRemove) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImage = async (file) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");
    setIsLoading(true);

    if (!isValid()) {
      console.log("Form validation failed");
      setIsLoading(false);
      return;
    }
    console.log("Form validation passed");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to continue.");
      }

      let imageUrls = [...formData.image];
      if (imageFiles.length > 0) {
        console.log(`Uploading ${imageFiles.length} image(s)...`);
        const uploadPromises = imageFiles.map((file) => uploadImage(file));
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls];
        console.log("Image URLs:", imageUrls);
      } else {
        console.log("No new images to upload");
      }

      const dataToSend = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        kit: formData.kit,
        src: imageUrls,
        longDes: formData.longDes,
        stock: formData.stock ? parseFloat(formData.stock) : 0, // Align with schema
        userReview: formData.userReview,
        discount: formData.discount ? parseFloat(formData.discount) : 0, // Align with schema
        shortDes: formData.shortDes,
        highlights: formData.highlights,
        benefitsMain: formData.benefitsMain,
        ingredientMain: formData.ingredientMain,
        productDisplay: formData.productDisplay,
        category: formData.category,
        subCategory: formData.subCategory,
        gst: formData.gst ? parseFloat(formData.gst) : 0, // Align with schema
        expiryDate: formData.expiryDate || undefined,
        batchNo: formData.batchNo,
        hsnNo: formData.hsnNo,
        mfgName: formData.mfgName,
        width: formData.width ? parseFloat(formData.width) : 0, // Align with schema
        height: formData.height ? parseFloat(formData.height) : 0, // Align with schema
        weight: formData.weight ? parseFloat(formData.weight) : 0, // Align with schema
        productDisplay: formData.productDisplay,
        metaTitle: formData.seoMetaTitle,
        metaDesc: formData.seoMetaDesc,
        seoMetaSlug: formData.seoMetaSlug,
        metaCanonical: formData.canonical,
        benefits: formData.benefits, // Now an array of objects
        ingredient: formData.ingredients, // Now an array of objects
        faq: formData.faq, // Now an array of objects
        filter: formData.filterTag
          ? formData.filterTag.split(",").map((tag) => tag.trim())
          : [],
        metaSlug: formData.slug,
      };
      console.log("Prepared data:", dataToSend);

      console.log("Stringifying data...");
      const jsonData = JSON.stringify(dataToSend);
      console.log("Stringified data:", jsonData);

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

      const rawResponse = await response.text();
      if (response.ok) {
        let data;
        try {
          data = JSON.parse(rawResponse);
          console.log("Response data:", data);
        } catch (err) {
          console.error("Error parsing JSON response:", err);
          throw new Error("Unexpected server response. Please try again.");
        }

        console.log("Product operation successful");
        toast({
          title: "Success",
          description: "Product added successfully",
          variant: "success",
        });

        // Reset form
        console.log("Resetting form...");
        setFormData({
          category: "",
          subCategory: "",
          name: "",
          price: "",
          description: "",
          longDes: "",
          ingredients: [],
          benefits: [],
          faq: [],
          highlights: "",
          stock: "",
          discount: "",
          productType: "",
          image: [],
          filterTag: "",
          gst: "",
          expiryDate: "",
          batchNo: "",
          mfgName: "",
          weight: "",
          height: "",
          width: "",
          slug: "",
          canonical: "",
          seoMetaTitle: "",
          seoMetaDesc: "",
          productDisplay: false,
          kit: [],
          userReview: [],
          shortDes: "",
          benefitsMain: "",
          ingredientMain: "",
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
        className: "bg-white"
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
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                     required
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
                    onChange={(e) => handleChange(e, "name")}
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
                    onChange={(e) => handleChange(e, "price")}
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
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, subCategory: value }))
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
                    onChange={(e) => handleChange(e, "expiryDate")}
                    min={
                      new Date(new Date().setDate(new Date().getDate() + 1))
                        .toISOString()
                        .split("T")[0]
                    }
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
                    onChange={(e) => handleChange(e, "batchNo")}
                    placeholder="Enter batch number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>HSN Number</Label>
                  <Input
                    name="hsnNo"
                    value={formData.hsnNo}
                    onChange={(e) => handleChange(e, "hsnNo")}
                    placeholder="Enter HSN number"
                    required
                  />
                  {errors.hsnNo && (
                    <p className="text-red-500 text-sm">{errors.hsnNo}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Manufacturer Name</Label>
                  <Input
                    name="mfgName"
                    value={formData.mfgName}
                    onChange={(e) => handleChange(e, "mfgName")}
                    placeholder="Enter manufacturer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight (in grams)</Label>
                  <Input
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleChange(e, "weight")}
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
                    onChange={(e) => handleChange(e, "height")}
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
                    onChange={(e) => handleChange(e, "width")}
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
                    onChange={(e) => handleChange(e, "slug")}
                    placeholder="Enter slug"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input
                    name="canonical"
                    value={formData.canonical}
                    onChange={(e) => handleChange(e, "canonical")}
                    placeholder="Enter canonical URL"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount (Rs)</Label>
                  <Input
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => handleChange(e, "discount")}
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
                    onChange={(e) => handleChange(e, "stock")}
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
                  onChange={(e) => handleChange(e, "gst")}
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
                  onChange={(e) => handleChange(e, "seoMetaTitle")}
                  placeholder="Enter SEO meta title"
                />
              </div>

              <div className="space-y-2">
                <Label>SEO Meta Description</Label>
                <Textarea
                  name="seoMetaDesc"
                  value={formData.seoMetaDesc}
                  onChange={(e) => handleChange(e, "seoMetaDesc")}
                  placeholder="Enter SEO meta description"
                />
              </div>

              <div className="space-y-2">
                <Label>Filter Tags (comma-separated)</Label>
                <Input
                  name="filterTag"
                  value={formData.filterTag}
                  onChange={(e) => handleChange(e, "filterTag")}
                  placeholder="Enter filter tags (e.g., hair, skin)"
                />
                <div className="flex justify-end mt-2">
                  <Button type="button" onClick={() => addItem("filterTag")}>
                    Add Filter Tag
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Short Description</Label>
                <ReactQuill
                  value={formData.shortDes}
                  onChange={(value) => handleChange(value, "shortDes")}
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
                  onChange={(value) => handleChange(value, "description")}
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
                  onChange={(value) => handleChange(value, "longDes")}
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
                  onChange={(value) => handleChange(value, "ingredientMain")}
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
                {formData.ingredients.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          updateItem("ingredients", index, "title", e.target.value)
                        }
                        placeholder="Ingredient title"
                      />
                      <Input
                        value={item.desc}
                        onChange={(e) =>
                          updateItem("ingredients", index, "desc", e.target.value)
                        }
                        placeholder="Ingredient description"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem("ingredients", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="flex justify-end mt-2">
                  <Button type="button" onClick={() => addItem("ingredients")}>
                    Add Ingredient
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Main Benefits</Label>
                <ReactQuill
                  value={formData.benefitsMain}
                  onChange={(value) => handleChange(value, "benefitsMain")}
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
                {formData.benefits.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          updateItem("benefits", index, "title", e.target.value)
                        }
                        placeholder="Benefit title"
                      />
                      <Input
                        value={item.desc}
                        onChange={(e) =>
                          updateItem("benefits", index, "desc", e.target.value)
                        }
                        placeholder="Benefit description"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem("benefits", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="flex justify-end mt-2">
                  <Button type="button" onClick={() => addItem("benefits")}>
                    Add Benefit
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>FAQ</Label>
                {formData.faq.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          updateItem("faq", index, "title", e.target.value)
                        }
                        placeholder="FAQ question"
                      />
                      <Input
                        value={item.desc}
                        onChange={(e) =>
                          updateItem("faq", index, "desc", e.target.value)
                        }
                        placeholder="FAQ answer"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem("faq", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="flex justify-end mt-2">
                  <Button type="button" onClick={() => addItem("faq")}>
                    Add FAQ
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Highlights</Label>
                <ReactQuill
                  value={formData.highlights}
                  onChange={(value) => handleChange(value, "highlights")}
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
                <Label>Kit Items</Label>
                {formData.kit.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      className="flex-1"
                      value={item}
                      onChange={(e) =>
                        updateItem("kit", index, "", e.target.value)
                      }
                      placeholder="Enter kit item"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem("kit", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="flex justify-end mt-2">
                  <Button type="button" onClick={() => addItem("kit")}>
                    Add Kit Item
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="productDisplay"
                  checked={!!formData.productDisplay}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      productDisplay: checked === true,
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
                  ref={fileInputRef}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}

                {imageFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Selected Images:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imageFiles.map((file, index) => (
                        <div
                          key={index}
                          className="relative w-24 h-24 rounded-md overflow-hidden"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Selected preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                            onClick={() => removeSelectedImage(index)}
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
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isEditMode && formData.image.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Existing Images:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.image.map((url, index) => (
                        <div
                          key={index}
                          className="relative w-24 h-24 rounded-md overflow-hidden"
                        >
                          <img
                            src={url}
                            alt={`Existing image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
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
