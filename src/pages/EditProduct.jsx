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

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || {});
  const [loading, setLoading] = useState(false);
  const [benefits, setBenefits] = useState(
    Array.isArray(product.benefits)
      ? product.benefits.map(b => ({
          title: b.title || "",
          desc: b.desc || "",
        }))
      : [{ title: "", desc: "" }]
  );
  const [ingredients, setIngredients] = useState(
    Array.isArray(product.ingredient)
      ? product.ingredient.map(i => ({
          title: i.title || "",
          desc: i.desc || "",
        }))
      : [{ title: "", desc: "" }]
  );
  const [faq, setFaq] = useState(
    Array.isArray(product.faq)
      ? product.faq.map(f => ({
          title: f.title || "",
          desc: f.desc || "",
        }))
      : [{ title: "", desc: "" }]
  );
  const [highlights, setHighlights] = useState(product.highlights || "");
  const [longDes, setLongDes] = useState(product.longDes || "");
  const [kit, setKit] = useState(Array.isArray(product.kit) ? product.kit : []);
  const [src, setSrc] = useState(Array.isArray(product.src) ? product.src : []);
  const [filter, setFilter] = useState(
    Array.isArray(product.filter) ? product.filter : []
  );
  const [imageFiles, setImageFiles] = useState([]); // Store selected image files

  // Function to upload a single image
  const uploadImage = async file => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const imageResponse = await fetch(
        `https://apihair.txogavideo.in/api/v1/hair-tests/upload-image`,
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

  // Handle image selection
  const handleImageUpload = e => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImageFiles(prev => [...prev, ...newImages]);
    }
  };

  //   const handleSaveEdit = async () => {

  //     setLoading(true);
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         throw new Error("Please login to continue.");
  //       }
  //       console.log("Token found:", token);

  //       if (!product._id) {
  //         throw new Error("Product ID is missing.");
  //       }
  //       console.log("Product ID verified:", product._id);

  //       // Upload images if any
  //       let imageUrls = [...src];
  //       if (imageFiles.length > 0) {
  //         console.log(`Uploading ${imageFiles.length} image(s)...`);
  //         const uploadPromises = imageFiles.map((file) => uploadImage(file));
  //         const newImageUrls = await Promise.all(uploadPromises);
  //         imageUrls = [...imageUrls, ...newImageUrls];
  //         console.log("Image URLs:", imageUrls);
  //       } else {
  //         console.log("No new images to upload");
  //       }

  //       // Prepare updated product
  //       const updatedProduct = {
  //         _id: product._id,
  //         newName: product.name,
  //         newPrice: product.price,
  //         newDescription: product.description,
  //         category: product.category,
  //         subCategory: product.subCategory,
  //         gst: product.gst,
  //         expiryDate: product.expiryDate,
  //         batchNo: product.batchNo,
  //         mfgName: product.mfgName,
  //         weight: product.weight,
  //         height: product.height,
  //         width: product.width,
  //         metaTitle: product.seoMetaTitle,
  //         metaDesc: product.seoMetaDesc,
  //         metaSlug: product.slug,
  //         metaCanonical: product.canonical,
  //         productDisplay: product.productDisplay,
  //         benefits: benefits.filter((b) => b.title || b.desc),
  //         ingredient: ingredients.filter((i) => i.title || i.desc),
  //         faq: faq.filter((f) => f.title || f.desc),
  //         highlights,
  //         longDes,
  //         stock: product.stock,
  //         discount: product.discount,
  //         filter,
  //         kit,
  //         src: imageUrls, // Use uploaded image URLs
  //       };

  //       // Log the entire product object
  //       console.log("Product data being sent:", updatedProduct);

  //       // Log individual fields
  //       console.log("Product ID:", updatedProduct._id);
  //       console.log("Product Name:", updatedProduct.newName);
  //       console.log("Category:", updatedProduct.category);
  //       console.log("Price:", updatedProduct.newPrice);
  //       console.log("Description:", updatedProduct.newDescription);
  //       console.log("Long Description:", updatedProduct.longDes);
  //       console.log("Ingredients:", updatedProduct.ingredient);
  //       console.log("Benefits:", updatedProduct.benefits);
  //       console.log("FAQ:", updatedProduct.faq);
  //       console.log("Highlights:", updatedProduct.highlights);
  //       console.log("Stock:", updatedProduct.stock);
  //       console.log("Discount:", updatedProduct.discount);
  //       console.log("Sub Category:", updatedProduct.subCategory);
  //       console.log("Filter:", updatedProduct.filter);
  //       console.log("GST:", updatedProduct.gst);
  //       console.log("Expiry Date:", updatedProduct.expiryDate);
  //       console.log("Batch No:", updatedProduct.batchNo);
  //       console.log("Manufacturer Name:", updatedProduct.mfgName);
  //       console.log("Weight:", updatedProduct.weight);
  //       console.log("Height:", updatedProduct.height);
  //       console.log("Width:", updatedProduct.width);
  //       console.log("Slug:", updatedProduct.metaSlug);
  //       console.log("Canonical URL:", updatedProduct.metaCanonical);
  //       console.log("SEO Meta Title:", updatedProduct.metaTitle);
  //       console.log("SEO Meta Description:", updatedProduct.metaDesc);
  //       console.log("Product Display:", updatedProduct.productDisplay);
  //       console.log("Kit:", updatedProduct.kit);
  //       console.log("Src:", updatedProduct.src);
  //       console.log(
  //         "Image Files:",
  //         imageFiles.map((file) => file.name)
  //       );

  //       // Log headers
  //       console.log("Request Headers:", {
  //         Authorization: `Bearer ${token}`,
  //       });

  //       // Log API endpoint
  //       console.log(
  //         "API Endpoint:",
  //         "https://apihair.txogavideo.in/api/v1/admin/update-product"
  //       );

  //       // Prepare FormData
  //       const formData = new FormData();
  //       formData.append("product", JSON.stringify(updatedProduct));

  //       // Log FormData contents
  //       console.log("FormData product JSON:", JSON.stringify(updatedProduct));

  //       const response = await fetch(
  //         `https://apihair.txogavideo.in/api/v1/admin/update-product`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //           body: formData,
  //         }
  //       );

  //       // Log response details
  //       console.log("Response Status:", response.status);
  //       console.log("Response Headers:", [...response.headers.entries()]);

  //       const data = await response.json();
  //       console.log("Response Data:", data);

  //       if (data.success) {
  //         toast({
  //           title: "Product Updated",
  //           description: `${updatedProduct.newName} has been updated successfully.`,
  //         });
  //         navigate("/products");
  //       } else {
  //         throw new Error(data.message || "Failed to update product");
  //       }
  //     } catch (error) {
  //       console.error("Error updating product:", error);
  //       toast({
  //         title: "Error",
  //         description: error.message || "Failed to update product",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // Handlers for structured fields

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to continue.");
      }
      console.log("Token found:", token);

      if (!product._id) {
        throw new Error("Product ID is missing.");
      }
      console.log("Product ID verified:", product._id);

      // Upload images if any
      let imageUrls = [...src];
      if (imageFiles.length > 0) {
        console.log(`Uploading ${imageFiles.length} image(s)...`);
        const uploadPromises = imageFiles.map(file => uploadImage(file));
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls];
        console.log("Image URLs:", imageUrls);
      } else {
        console.log("No new images to upload");
      }

      // Prepare updated product
      const updatedProduct = {
        _id: product._id,
        newName: product.name,
        newPrice: product.price,
        newDescription: product.description,
        category: product.category,
        subCategory: product.subCategory,
        gst: product.gst,
        expiryDate: product.expiryDate,
        batchNo: product.batchNo,
        mfgName: product.mfgName,
        weight: product.weight,
        height: product.height,
        width: product.width,
        metaTitle: product.seoMetaTitle,
        metaDesc: product.seoMetaDesc,
        metaSlug: product.slug,
        metaCanonical: product.canonical,
        productDisplay: product.productDisplay,
        benefits: benefits.filter(b => b.title || b.desc),
        ingredient: ingredients.filter(i => i.title || i.desc),
        faq: faq.filter(f => f.title || f.desc),
        highlights,
        longDes,
        stock: product.stock,
        discount: product.discount,
        filter,
        kit,
        src: imageUrls, // Use uploaded image URLs
      };

      // Log the product data
      console.log("Product data being sent:", updatedProduct);

      // Send the product data as JSON
      const response = await fetch(
        `https://apihair.txogavideo.in/api/v1/admin/update-product`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure JSON content type
          },
          body: JSON.stringify(updatedProduct), // Send as JSON
        }
      );

      // Log response details
      console.log("Response Status:", response.status);
      console.log("Response Headers:", [...response.headers.entries()]);

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.success) {
        toast({
          title: "Product Updated",
          description: `${updatedProduct.newName} has been updated successfully.`,
        });
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
      });
    } finally {
      setLoading(false);
    }
  };

  const addBenefit = () => setBenefits([...benefits, { title: "", desc: "" }]);
  const removeBenefit = index =>
    setBenefits(benefits.filter((_, i) => i !== index));
  const updateBenefit = (index, field, value) => {
    const newBenefits = [...benefits];
    newBenefits[index][field] = value;
    setBenefits(newBenefits);
  };

  const addIngredient = () =>
    setIngredients([...ingredients, { title: "", desc: "" }]);
  const removeIngredient = index =>
    setIngredients(ingredients.filter((_, i) => i !== index));
  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addFaq = () => setFaq([...faq, { title: "", desc: "" }]);
  const removeFaq = index => setFaq(faq.filter((_, i) => i !== index));
  const updateFaq = (index, field, value) => {
    const newFaq = [...faq];
    newFaq[index][field] = value;
    setFaq(newFaq);
  };

  const addKit = () => setKit([...kit, ""]);
  const removeKit = index => setKit(kit.filter((_, i) => i !== index));
  const updateKit = (index, value) => {
    const newKit = [...kit];
    newKit[index] = value;
    setKit(newKit);
  };

  const addFilter = () => setFilter([...filter, ""]);
  const removeFilter = index => setFilter(filter.filter((_, i) => i !== index));
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
            {/* Category */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Category
              </Label>
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

            {/* Product Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Product Name
              </Label>
              <Input
                value={product?.name || ""}
                onChange={e => setProduct({ ...product, name: e.target.value })}
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Price
              </Label>
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

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Description
              </Label>
              <Textarea
                value={product?.description || ""}
                onChange={e =>
                  setProduct({ ...product, description: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Long Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Long Description
              </Label>
              <Textarea
                value={longDes}
                onChange={e => setLongDes(e.target.value)}
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Benefits
              </Label>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="space-y-2 border p-4 rounded-md relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeBenefit(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={benefit.title}
                      onChange={e =>
                        updateBenefit(index, "title", e.target.value)
                      }
                      className="hover:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={benefit.desc}
                      onChange={e =>
                        updateBenefit(index, "desc", e.target.value)
                      }
                      className="hover:border-primary transition-colors"
                    />
                  </div>
                </div>
              ))}  <br />
              <Button onClick={addBenefit} className="mt-2">
                Add Benefit
              </Button>
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Ingredients
              </Label>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="space-y-2 border p-4 rounded-md relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeIngredient(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={ingredient.title}
                      onChange={e =>
                        updateIngredient(index, "title", e.target.value)
                      }
                      className="hover:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={ingredient.desc}
                      onChange={e =>
                        updateIngredient(index, "desc", e.target.value)
                      }
                      className="hover:border-primary transition-colors"
                    />
                  </div>
                </div>
              ))} <br />
              <Button onClick={addIngredient} className="mt-2">
                Add Ingredient
              </Button>
            </div>

            {/* FAQ */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                FAQ
              </Label>
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 border p-4 rounded-md relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFaq(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={item.title}
                      onChange={e => updateFaq(index, "title", e.target.value)}
                      className="hover:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Textarea
                      value={item.desc}
                      onChange={e => updateFaq(index, "desc", e.target.value)}
                      className="hover:border-primary transition-colors"
                    />
                  </div>
                </div>
              ))} <br />
              <Button onClick={addFaq} className="mt-2">
                Add FAQ
              </Button>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Highlights
              </Label>
              <Textarea
                value={highlights}
                onChange={e => setHighlights(e.target.value)}
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Kit */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Kit
              </Label>
              {kit.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 border p-4 rounded-md relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeKit(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Input
                    value={item}
                    onChange={e => updateKit(index, e.target.value)}
                    className="hover:border-primary transition-colors"
                  />
                </div>
              ))} <br />
              <Button onClick={addKit} className="mt-2">
                Add Kit Item
              </Button>
            </div>

            {/* Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Filter
              </Label>
              {filter.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 border p-4 rounded-md relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
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
              ))} <br />
              <Button onClick={addFilter} className="mt-2">
                Add Filter
              </Button>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Stock
              </Label>
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

            {/* Discount */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Discount (%)
              </Label>
              <Input
                type="number"
                min="0"
                value={product?.discount || ""}
                onChange={e =>
                  setProduct({ ...product, discount: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Sub Category */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Sub Category
              </Label>
              <Select
                value={product?.subCategory}
                onValueChange={value =>
                  setProduct({ ...product, subCategory: value })
                }
              >
                <SelectTrigger className="hover:border-primary transition-colors">
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

            {/* GST */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                GST
              </Label>
              <Input
                type="number"
                value={product?.gst || ""}
                onChange={e => setProduct({ ...product, gst: e.target.value })}
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Expiry Date
              </Label>
              <Input
                type="date"
                value={product?.expiryDate || ""}
                onChange={e =>
                  setProduct({ ...product, expiryDate: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Batch No */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Batch No
              </Label>
              <Input
                value={product?.batchNo || ""}
                onChange={e =>
                  setProduct({ ...product, batchNo: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Manufacturer Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Manufacturer Name
              </Label>
              <Input
                value={product?.mfgName || ""}
                onChange={e =>
                  setProduct({ ...product, mfgName: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Weight (in grams)
              </Label>
              <Input
                type="number"
                value={product?.weight || ""}
                onChange={e =>
                  setProduct({ ...product, weight: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Height (in cm)
              </Label>
              <Input
                type="number"
                value={product?.height || ""}
                onChange={e =>
                  setProduct({ ...product, height: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Width */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Width (in cm)
              </Label>
              <Input
                type="number"
                value={product?.width || ""}
                onChange={e =>
                  setProduct({ ...product, width: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Slug
              </Label>
              <Input
                value={product?.slug || ""}
                onChange={e => setProduct({ ...product, slug: e.target.value })}
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Canonical URL */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Canonical URL
              </Label>
              <Input
                value={product?.canonical || ""}
                onChange={e =>
                  setProduct({ ...product, canonical: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* SEO Meta Title */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                SEO Meta Title
              </Label>
              <Input
                value={product?.seoMetaTitle || ""}
                onChange={e =>
                  setProduct({ ...product, seoMetaTitle: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* SEO Meta Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                SEO Meta Description
              </Label>
              <Textarea
                value={product?.seoMetaDesc || ""}
                onChange={e =>
                  setProduct({ ...product, seoMetaDesc: e.target.value })
                }
                className="hover:border-primary transition-colors"
              />
            </div>

            {/* Product Display */}
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

            {/* Product Image */}
            <div className="space-y-2">
              <Label className="text-sm font-medium hover:text-primary transition-colors">
                Upload Images
              </Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hover:border-primary transition-colors cursor-pointer"
              />
              
              {/* Selected Images Preview */}
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
                            setImageFiles(prev => prev.filter((_, i) => i !== index));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Existing Images Preview */}
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

            {/* Buttons */}
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
