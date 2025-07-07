import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || {});
  const [loading, setLoading] = useState(false);
  const [benefits, setBenefits] = useState(
    Array.isArray(product.benefits)
      ? product.benefits.map((b) => ({
          title: b.title || "",
          desc: b.desc || "",
        }))
      : [{ title: "", desc: "" }]
  );
  const [ingredients, setIngredients] = useState(
    Array.isArray(product.ingredient)
      ? product.ingredient.map((i) => ({
          title: i.title || "",
          desc: i.desc || "",
        }))
      : [{ title: "", desc: "" }]
  );
  const [faq, setFaq] = useState(
    Array.isArray(product.faq)
      ? product.faq.map((f) => ({
          title: f.title || "",
          desc: f.desc || "",
        }))
      : [{ title: "", desc: "" }]
  );
  const [highlights, setHighlights] = useState(product.highlights || "");
  const [longDes, setLongDes] = useState(product.longDes || "");
  const [shortDes, setShortDes] = useState(product.shortDes || "");
  const [benefitsMain, setBenefitsMain] = useState(product.benefitsMain || "");
  const [ingredientMain, setIngredientMain] = useState(
    product.ingredientMain || ""
  );
  const [kit, setKit] = useState(Array.isArray(product.kit) ? product.kit : []);
  const [src, setSrc] = useState(Array.isArray(product.src) ? product.src : []);
  const [filter, setFilter] = useState(
    Array.isArray(product.filter) ? product.filter : []
  );
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});

  // Helper function to format date for HTML date input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    console.log("Original date string:", dateString);
    const date = new Date(dateString);
    console.log("Parsed date:", date);
    if (isNaN(date.getTime())) {
      console.log("Invalid date detected");
      return "";
    }
    const formattedDate = date.toISOString().split('T')[0];
    console.log("Formatted date for input:", formattedDate);
    return formattedDate;
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
  ];

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
      hsn: "HSN number",

    };

    // Check each required field
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!product[field] || String(product[field]).trim() === "") {
        newErrors[field] = `${label} is required`;
      }
    });

    // Validate numeric fields
    if (product.price && (isNaN(product.price) || Number(product.price) <= 0)) {
      newErrors.price = "Price must be a positive number";
    }

    if (product.stock && (isNaN(product.stock) || Number(product.stock) < 0)) {
      newErrors.stock = "Stock must be a non-negative number";
    }

    if (product.discount && (isNaN(product.discount) || Number(product.discount) < 0)) {
      newErrors.discount = "Discount must be a non-negative number";
    }

    if (product.gst && (isNaN(product.gst) || Number(product.gst) < 0)) {
      newErrors.gst = "GST must be a non-negative number";
    }

    // Validate dimensions
    if (product.weight && (isNaN(product.weight) || Number(product.weight) <= 0)) {
      newErrors.weight = "Weight must be a positive number";
    }

    if (product.height && (isNaN(product.height) || Number(product.height) <= 0)) {
      newErrors.height = "Height must be a positive number";
    }

    if (product.width && (isNaN(product.width) || Number(product.width) <= 0)) {
      newErrors.width = "Width must be a positive number";
    }

    // Validate expiry date
    if (product.expiryDate) {
      const selectedDate = new Date(product.expiryDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      if (selectedDate < tomorrow) {
        newErrors.expiryDate = "Expiry date must be at least tomorrow";
      }
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
        className: "bg-white"
      });
      return false;
    }

    return true;
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

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImageFiles((prev) => [...prev, ...newImages]);
    }
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      if (!isValid()) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to continue.");
      }

      if (!product._id) {
        throw new Error("Product ID is missing.");
      }

      let imageUrls = [...src];
      if (imageFiles.length > 0) {
        console.log(`Uploading ${imageFiles.length} image(s)...`);
        const uploadPromises = imageFiles.map((file) => uploadImage(file));
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls];
        console.log("Image URLs:", imageUrls);
      } else {
        console.log("No new images to upload");
      }

      const updatedProduct = {
        _id: product._id,
        newName: product.name,
        newPrice: Number(product.price),
        newDescription: product.description,
        category: product.category,
        subCategory: product.subCategory,
        gst: product.gst ? Number(product.gst) : undefined,
        expiryDate: product.expiryDate,
        batchNo: product.batchNo,
        hsn: product.hsn,
        mfgName: product.mfgName,
        weight: product.weight ? Number(product.weight) : undefined,
        height: product.height ? Number(product.height) : undefined,
        width: product.width ? Number(product.width) : undefined,
        metaTitle: product.seoMetaTitle,
        metaDesc: product.seoMetaDesc,
        metaSlug: product.metaSlug,
        metaCanonical: product.canonical,
        productDisplay: product.productDisplay,
        benefits: benefits.filter((b) => b.title || b.desc),
        ingredient: ingredients.filter((i) => i.title || i.desc),
        faq: faq.filter((f) => f.title || f.desc),
        highlights,
        longDes,
        shortDes,
        benefitsMain,
        ingredientMain,
        stock: product.stock ? Number(product.stock) : undefined,
        discount: product.discount ? Number(product.discount) : undefined,
        filter,
        kit,
        src: imageUrls,
      };

      console.log("Product data being sent:", updatedProduct);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/update-product`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      console.log("Response Status:", response.status);
      console.log("Response Headers:", [...response.headers.entries()]);

      const data = await response.json();
    

      if (data.success) {
        toast({
          title: "Product Updated",
          description: `${updatedProduct.newName} has been updated successfully.`,
          className: "bg-white"
        });
        setProduct({});
        setBenefits([{ title: "", desc: "" }]);
        setIngredients([{ title: "", desc: "" }]);
        setFaq([{ title: "", desc: "" }]);
        setHighlights("");
        setLongDes("");
        setShortDes("");
        setBenefitsMain("");
        setIngredientMain("");
        setKit([]);
        setSrc([]);
        setFilter([]);
        setImageFiles([]);
        setErrors({});
        navigate("/products");
      } else {
        throw new Error(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
        className: "bg-white"
      });
    } finally {
      setLoading(false);
    }
  };

  const addBenefit = () => setBenefits([...benefits, { title: "", desc: "" }]);
  const removeBenefit = (index) =>
    setBenefits(benefits.filter((_, i) => i !== index));
  const updateBenefit = (index, field, value) => {
    const newBenefits = [...benefits];
    newBenefits[index][field] = value;
    setBenefits(newBenefits);
  };

  const addIngredient = () =>
    setIngredients([...ingredients, { title: "", desc: "" }]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));
  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addFaq = () => setFaq([...faq, { title: "", desc: "" }]);
  const removeFaq = (index) => setFaq(faq.filter((_, i) => i !== index));
  const updateFaq = (index, field, value) => {
    const newFaq = [...faq];
    newFaq[index][field] = value;
    setFaq(newFaq);
  };

  const addKit = () => setKit([...kit, ""]);
  const removeKit = (index) => setKit(kit.filter((_, i) => i !== index));
  const updateKit = (index, value) => {
    const newKit = [...kit];
    newKit[index] = value;
    setKit(newKit);
  };

  const addFilter = () => setFilter([...filter, ""]);
  const removeFilter = (index) =>
    setFilter(filter.filter((_, i) => i !== index));
  const updateFilter = (index, value) => {
    const newFilter = [...filter];
    newFilter[index] = value;
    setFilter(newFilter);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={product?.category}
                  onValueChange={value =>
                    setProduct({ ...product, category: value })
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
              </div>

              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                  value={product?.name || ""}
                  onChange={e =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  min="0"
                  value={product?.price || ""}
                  onChange={e =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label>Sub Category</Label>
                <Select
                  value={product?.subCategory}
                  onValueChange={value =>
                    setProduct({ ...product, subCategory: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="tablets">Tablets</SelectItem>
                    <SelectItem value="syrup">Syrup</SelectItem>
                    <SelectItem value="sachets">Sachets</SelectItem>
                    <SelectItem value="hair-solution">Hair Solution</SelectItem>
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
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={formatDateForInput(product?.expiryDate)}
                  onChange={e =>
                    setProduct({ ...product, expiryDate: e.target.value })
                  }
                  min={formatDateForInput(
                    new Date(new Date().setDate(new Date().getDate() + 1))
                  )}
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label>Batch No</Label>
                <Input
                  value={product?.batchNo || ""}
                  onChange={e =>
                    setProduct({ ...product, batchNo: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>HSN Number</Label>
                <Input
                  value={product?.hsn || ""}
                  onChange={e =>
                    setProduct({ ...product, hsn: e.target.value })
                  }
                  placeholder="Enter HSN number"
                  required
                  className="hover:border-primary transition-colors"
                />
                {errors.hsnNo && (
                  <p className="text-red-500 text-sm">{errors.hsnNo}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Manufacturer Name</Label>
                <Input
                  value={product?.mfgName || ""}
                  onChange={e =>
                    setProduct({ ...product, mfgName: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Weight (in grams)</Label>
                <Input
                  type="number"
                  min="0"
                  value={product?.weight || ""}
                  onChange={e =>
                    setProduct({ ...product, weight: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label>Height (in cm)</Label>
                <Input
                  type="number"
                  min="0"
                  value={product?.height || ""}
                  onChange={e =>
                    setProduct({ ...product, height: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Width (in cm)</Label>
                <Input
                  type="number"
                  min="0"
                  value={product?.width || ""}
                  onChange={e =>
                    setProduct({ ...product, width: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={product?.metaSlug || ""}
                  onChange={e =>
                    setProduct({ ...product, metaSlug: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={product?.discount || ""}
                  onChange={e =>
                    setProduct({ ...product, discount: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label>Stock</Label>
                <Input
                  type="number"
                  min="0"
                  value={product?.stock || ""}
                  onChange={e =>
                    setProduct({ ...product, stock: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Canonical URL</Label>
                <Input
                  type="text"
                  value={product?.metaCanonical || ""}
                  onChange={e =>
                    setProduct({ ...product, metaCanonical: e.target.value })
                  }
                  className="hover:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>GST (%)</Label>
              <Input
                type="number"
                min="0"
                value={product?.gst || ""}
                onChange={e => setProduct({ ...product, gst: e.target.value })}
                className="hover:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label>SEO Meta Title</Label>
              <Input
                value={product?.metaTitle || ""}
                onChange={e =>
                  setProduct({ ...product, seoMetaTitle: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label>SEO Meta Description</Label>
              <Textarea
                value={product?.metaDesc || ""}
                onChange={e =>
                  setProduct({ ...product, seoMetaDesc: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <div className="mt-2">
                <ReactQuill
                  value={product?.description || ""}
                  onChange={content =>
                    setProduct({ ...product, description: content })
                  }
                  theme="snow"
                  placeholder="Type product description here..."
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Long Description</Label>
              <div className="mt-2">
                <ReactQuill
                  value={longDes}
                  onChange={content => setLongDes(content)}
                  theme="snow"
                  placeholder="Type long description here..."
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Short Description</Label>
              <div className="mt-2">
                <ReactQuill
                  value={shortDes}
                  onChange={content => setShortDes(content)}
                  theme="snow"
                  placeholder="Type short description here..."
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Main Benefits</Label>
              <div className="mt-2">
                <ReactQuill
                  value={benefitsMain}
                  onChange={content => setBenefitsMain(content)}
                  theme="snow"
                  placeholder="Type main benefits here..."
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Main Ingredients</Label>
              <div className="mt-2">
                <ReactQuill
                  value={ingredientMain}
                  onChange={content => setIngredientMain(content)}
                  theme="snow"
                  placeholder="Type main ingredients here..."
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Benefits</Label>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={benefit.title}
                      onChange={e =>
                        updateBenefit(index, "title", e.target.value)
                      }
                      className="hover:border-primary transition-colors"
                    />
                    <ReactQuill
                      value={benefit.desc}
                      onChange={content =>
                        updateBenefit(index, "desc", content)
                      }
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeBenefit(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <Button onClick={addBenefit}>Add Benefit</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ingredients</Label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={ingredient.title}
                      onChange={e =>
                        updateIngredient(index, "title", e.target.value)
                      }
                      className="hover:border-primary transition-colors"
                    />
                    <Textarea
                      value={ingredient.desc}
                      onChange={e =>
                        updateIngredient(index, "desc", e.target.value)
                      }
                      className="hover:border-primary transition-colors"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeIngredient(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <Button onClick={addIngredient}>Add Ingredient</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>FAQ</Label>
              {faq.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={item.title}
                      onChange={e => updateFaq(index, "title", e.target.value)}
                      className="hover:border-primary transition-colors"
                    />
                    <Textarea
                      value={item.desc}
                      onChange={e => updateFaq(index, "desc", e.target.value)}
                      className="hover:border-primary transition-colors"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFaq(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <Button onClick={addFaq}>Add FAQ</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kit Items</Label>
              {kit.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    className="flex-1 hover:border-primary transition-colors"
                    value={item}
                    onChange={e => updateKit(index, e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeKit(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <Button onClick={addKit}>Add Kit Item</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Filter Tags</Label>
              {filter.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 border p-4 rounded-md relative"
                >
                  <Button
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => removeFilter(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Input
                    value={item}
                    onChange={e => updateFilter(index, e.target.value)}
                    className="hover:border-primary transition-colors"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <Button onClick={addFilter}>Add Filter</Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="productDisplay"
                checked={product?.productDisplay || false}
                onCheckedChange={checked =>
                  setProduct({ ...product, productDisplay: checked })
                }
                className="hover:border-primary transition-colors"
              />
              <Label
                htmlFor="productDisplay"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Display on Product Section
              </Label>
            </div>

            <div className="space-y-2">
              <Label>Upload Images</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hover:border-primary transition-colors cursor-pointer"
              />

              {imageFiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Selected Images:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            setImageFiles(prev =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {src.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Existing Images:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {src.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Existing ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            setSrc(prev => prev.filter((_, i) => i !== index));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
                onClick={handleSaveEdit}
                className="hover:bg-primary/90 transition-colors"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditProduct;
