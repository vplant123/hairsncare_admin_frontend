import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
// import { toast } from "sonner";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";

// Define regex patterns
const regexPatterns = {
  name: /^[a-zA-Z\s]{3,}$/, // Name: letters, spaces, min 3 chars
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Standard email
  phone: /^(\+\d{0,4})?\d*$/, // Phone: optional + and country code, digits (allows partial input)
  experience: /^[0-9]*$/, // Experience: only digits (allows empty and partial input)
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, // Password: min 8 chars, at least one letter and one number
};

const AddDoctor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = !!location.state?.doctor;
  const doctorData = location.state?.doctor;
  const fileInputRef = React.useRef(null); // Add ref for file input
  const awardsFileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    degree: "",
    specialist: "",
    experience: "",
    language: "",
    expertise: "",
    description: "",
    qualification: "",
    awards: [], // Awards should be an array of strings (URLs)
    isSpec: false,
    showOnDashboard: false // Initialize showOnDashboard
  });

  const [profileImage, setProfileImage] = useState(null);
  const [awardsImages, setAwardsImages] = useState([]);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [awardsImagesPreviews, setAwardsImagesPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({}); // State to hold field-specific errors
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility
  const [removedAwards, setRemovedAwards] = useState([]);
  const [removedProfileImage, setRemovedProfileImage] = useState(false);

  useEffect(() => {
    if (isEdit && doctorData) {
      setFormData({
        name: doctorData.name || "",
        phone: doctorData.phone || "",
        email: doctorData.email || "",
        password: "",
        address: doctorData.address || "",
        degree: doctorData.degree || "",
        specialist: doctorData.specialist || "",
        experience: doctorData.experience?.toString() || "",
        language: doctorData.language || "",
        expertise: doctorData.expertise || "",
        description: doctorData.description || "",
        qualification: doctorData.qualification || "",
        awards: doctorData.awards || [],
        isSpec: doctorData.isSpec || false,
        showOnDashboard: doctorData.showOnDashboard || false // Set showOnDashboard from doctorData
      });
      setProfileImage(doctorData.image);
      setProfileImagePreview(doctorData.image);
      if (doctorData?.awards) {
        setAwardsImages(doctorData.awards);
        setAwardsImagesPreviews(doctorData.awards);
      }
    }
  }, [isEdit, doctorData]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    let cleanedValue = value;

    // Filter input based on field and regex
    if (name === 'phone') {
      // Allow digits, and a leading plus sign
      cleanedValue = value.replace(/[^\d+]/g, '').replace(/^(\+.*)\+/g, '$1');
       if (cleanedValue.length > 1 && cleanedValue[0] !== '+') cleanedValue = cleanedValue.replace(/\+/g, ''); // Ensure only one leading + if present

    } else if (name === 'experience') {
      // Allow only digits
      cleanedValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'name' || name === 'degree' || name === 'language') {
       // Don't allow numbers for these fields
       cleanedValue = value.replace(/[0-9]/g, '');
    }

    // Update form data with the potentially cleaned value
    setFormData(prev => ({
      ...prev,
      [name]: cleanedValue,
    }));

    // Validate the cleaned value using regex if a pattern exists
    if (regexPatterns[name]) {
      // Use a stricter test for final validation/error display
      const finalTest = name === 'phone' ? /^(\+\d{1,4})?\d{10,}$/ : // Phone: optional + and country code, min 10 digits for final validation
                        name === 'experience' ? /^[0-9]+$/ : // Experience: only digits, must have at least one
                        regexPatterns[name]; // Use defined regex for others

      if (cleanedValue && !finalTest.test(cleanedValue)) {
        // Set specific error message if validation fails
        setFieldErrors(prev => ({
          ...prev,
          [name]: `Invalid ${name}.`,
        }));
      } else {
        // Clear the error for this field if validation passes or is empty
        setFieldErrors(prev => {
          const newState = { ...prev };
          delete newState[name];
          return newState;
        });
      }
    } else {
       // Clear the error if there's no specific regex for this field (e.g., Textarea)
       setFieldErrors(prev => {
         const newState = { ...prev };
         delete newState[name];
         return newState;
       });
    }
  };

  const handleCheckboxChange = field => checked => {
    setFormData(prev => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfileImage(file);
          setProfileImagePreview(reader.result);
        } else if (type === "awards") {
          setAwardsImages([...awardsImages, file]);
          setAwardsImagesPreviews([...awardsImagesPreviews, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async file => {
    const formData = new FormData();
    formData.append("image", file);

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

    console.log(imageResponse);

    if (imageResponse.status != 200) {
      throw new Error("Image upload failed");
    }

    const data = await imageResponse.json();
    console.log(data);
    return data.imageUrl;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Form submission started");

    // Perform final validation before submitting
    const errors = {};
    // Stricter regex for final validation
    const finalRegexPatterns = {
       name: /^[a-zA-Z\s]{3,}$/,
       email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
       phone: /^(\+\d{1,4})?\d{10,}$/,
       experience: /^[0-9]+$/,
       password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    };

    Object.keys(finalRegexPatterns).forEach(fieldName => {
      if (formData[fieldName] && !finalRegexPatterns[fieldName].test(formData[fieldName])) {
        errors[fieldName] = `Invalid ${fieldName}.`;
      }
    });

    // Also check required fields that might not have regex (e.g., description, qualification)
    if (!formData.description.trim()) errors.description = "Description is required.";
    if (!formData.qualification.trim()) errors.qualification = "Qualifications are required.";
    // Add other required fields without specific regex here if any

    // Add password validation for new doctors
    if (!isEdit && !formData.password) {
      errors.password = "Password is required for new doctors";
    } else if (formData.password && !finalRegexPatterns.password.test(formData.password)) {
      errors.password = "Password must be at least 8 characters long and contain at least one letter and one number";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Validation errors detected:", errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
        className:"bg-white"
      });
      setIsSubmitting(false); // Ensure button is not stuck on 'Saving...'
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedProfileImage = formData.image;
      console.log("Initial formData.image:", uploadedProfileImage);

      let uploadedAwardsImages = [];

      // Check profile image type
      if (
        profileImage &&
        typeof profileImage !== "string" &&
        profileImage instanceof File
      ) {
        console.log("Uploading profile image:", profileImage);
        uploadedProfileImage = await uploadImage(profileImage);
        console.log("Uploaded profile image URL:", uploadedProfileImage);
      } else {
        console.log("Profile image is not a File or is already a string");
      }

      if (awardsImages.length > 0) {
        console.log("Uploading awards images:", awardsImages);
        uploadedAwardsImages = await Promise.all(
          awardsImages.map(async (award, index) => {
            if (award && award instanceof File) {
              console.log(`Uploading award image ${index + 1}:`, award);
              const uploaded = await uploadImage(award);
              console.log(`Uploaded award image ${index + 1} URL:`, uploaded);
              return uploaded;
            }
            console.log(
              `Award image ${index + 1} is not a File or is null`,
              award
            );
            return null;
          })
        );
      } else {
        console.log("No awards images to upload");
      }

      const filteredUploadedAwards = uploadedAwardsImages.filter(Boolean);
      console.log("Filtered uploaded awards images:", filteredUploadedAwards);

      const payload = {
        ...formData,
        image: removedProfileImage ? null : (uploadedProfileImage || doctorData?.image),
        awards: [
          ...(doctorData?.awards?.filter(a => !removedAwards.includes(a)) || []),
          ...filteredUploadedAwards
        ],
        showOnDashboard: formData.showOnDashboard
      };

      if (isEdit && doctorData?._id) {
        payload.id = doctorData._id;
        console.log("Edit mode enabled, payload id set:", payload.id);
      } else {
        console.log("Add mode enabled");
      }

      console.log("Final payload to send:", payload);

      const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/admin`;
      const url = isEdit ? `${baseUrl}/edit-doctor` : `${baseUrl}/addDoctor`;
      console.log("API URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      // Check if response is HTML or JSON
      const rawResponse = await response.text();
      let responseData;
      
      try {
        responseData = JSON.parse(rawResponse);
      } catch (err) {
        console.error("Error parsing response:", err);
        throw new Error("Invalid server response");
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || "Failed to save doctor profile";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
          className: "bg-white"
        });
        throw new Error(errorMessage);
      }

      toast({
        title: "Success",
        description: isEdit ? "Doctor updated successfully!" : "Doctor added successfully!",
        className: "bg-white"
      });
      
      // Navigate to doctor management with state to trigger refresh
      navigate("/doctors", { 
        state: { 
          refresh: true,
          message: isEdit ? "Doctor updated successfully!" : "Doctor added successfully!"
        }
      });

    } catch (err) {
      console.error("Submission error caught:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to save doctor profile. Please try again.",
        variant: "destructive",
        className:"bg-white"
      });
    } finally {
      setIsSubmitting(false);
      console.log("Form submission ended, setIsSubmitting(false)");
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    setRemovedProfileImage(true);
    setFormData(prev => ({
      ...prev,
      image: ""
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAwardImage = (indexToRemove) => {
    setAwardsImagesPreviews(prevPreviews => {
      const removed = prevPreviews[indexToRemove];
      // If it's a URL (string), add to removedAwards
      if (typeof removed === 'string' && removed.startsWith('http')) {
        setRemovedAwards(prev => [...prev, removed]);
      }
      return prevPreviews.filter((_, index) => index !== indexToRemove);
    });
    setAwardsImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.filter((_, index) => index !== indexToRemove)
    }));
    if (awardsFileInputRef.current) {
      awardsFileInputRef.current.value = "";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/doctors")}
          className="bg-white border-gray-300"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Doctor" : "Add New Doctor"}
        </h1>
      </div>

      <Card className="bg-white ">
        <CardHeader>
          <CardTitle>
            {isEdit ? "Edit Doctor Details" : "Doctor Information"}
          </CardTitle>
          <CardDescription>
            {isEdit
              ? "Update the doctor's information below"
              : "Fill in the doctor's information below"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="image">Profile Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload(e, "profile")}
                    ref={fileInputRef}
                  />
                  {(profileImagePreview) && (
                    <div className="mt-2 relative inline-block">
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveProfileImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        title="Remove image"
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
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">
                    Password {!isEdit && "(Required)"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!isEdit}
                      placeholder={
                        isEdit
                          ? "Leave blank to keep current password"
                          : "Enter password"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.password}
                    </p>
                  )}
                  {!isEdit && (
                    <p className="text-sm text-gray-500 mt-1">
                      Password must be at least 8 characters long and contain at
                      least one letter and one number
                    </p>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="specialist">Specialist</Label>
                  <Input
                    id="specialist"
                    name="specialist"
                    value={formData.specialist}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min={1}
                    max={100}
                    required
                  />
                  {fieldErrors.experience && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.experience}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="expertise">Expertise</Label>
                  <Input
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="my-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              {fieldErrors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.description}
                </p>
              )}
            </div>

            <div className="my-2">
              <Label htmlFor="qualification">Qualifications</Label>
              <Textarea
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                required
              />
              {fieldErrors.qualification && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.qualification}
                </p>
              )}
            </div>

            <div className="my-2">
              <Label htmlFor="awards">Awards & Certifications</Label>
              <Input
                id="awards"
                type="file"
                accept="image/*"
                ref={awardsFileInputRef}
                onChange={e => handleImageUpload(e, "awards")}
                disabled={awardsImagesPreviews.length > 0}
              />
              {awardsImagesPreviews.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-3">
                  {awardsImagesPreviews.map((award, index) => (
                    <div key={index} className="relative">
                      <img
                        src={award}
                        alt={`Award preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-0 right-0 h-6 w-6 rounded-full -mt-2 -mr-2 flex items-center justify-center"
                        onClick={() => handleRemoveAwardImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="my-2 space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="showOnDashboard"
                  checked={formData.showOnDashboard}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({
                      ...prev,
                      showOnDashboard: checked
                    }));
                  }}
                />
                <Label htmlFor="showOnDashboard">Show on Dashboard</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isSpec"
                  checked={formData.isSpec}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({
                      ...prev,
                      isSpec: checked
                    }));
                  }}
                />
                <Label htmlFor="isSpec">Is Specialist</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/doctor-management")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : isEdit
                    ? "Update Doctor"
                    : "Add Doctor"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AddDoctor;
