import React, { useState, useEffect } from "react";
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
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const AddDoctor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.isEdit;
  const doctorData = location.state?.doctor;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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
  });

  const [profileImage, setProfileImage] = useState(null);
  const [awardsImages, setAwardsImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && doctorData) {
      setFormData({
        name: doctorData.name || "",
        phone: doctorData.phone || "",
        email: doctorData.email || "",
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
      });
      setProfileImage(doctorData.image);
      if (doctorData?.awards) setAwardsImages(doctorData.awards);
    }
  }, [isEdit, doctorData]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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
      if (type === "profile") {
        setProfileImage(file);
      } else if (type === "awards") {
        setAwardsImages([...awardsImages, file]);
      }
    }
  };

  const uploadImage = async file => {
    const formData = new FormData();
    formData.append("image", file);

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
        image: uploadedProfileImage,
        awards: [...(doctorData?.awards || []), ...filteredUploadedAwards],
      };

      if (isEdit && doctorData?._id) {
        payload.id = doctorData._id;
        console.log("Edit mode enabled, payload id set:", payload.id);
      } else {
        console.log("Add mode enabled");
      }

      console.log("Final payload to send:", payload);

      const baseUrl = "https://apihair.txogavideo.in/api/v1/admin";
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(
          `Server responded with status: ${response.status} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);

      toast.success(
        isEdit ? "Doctor updated successfully!" : "Doctor added successfully!"
      );
      console.log("Navigation to doctor management");
      navigate("/doctors");
    } catch (err) {
      console.error("Submission error caught:", err);
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log("Form submission ended, setIsSubmitting(false)");
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
                </div>

                <div>
                  <Label htmlFor="image">Profile Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload(e, "profile")}
                  />
                  {isEdit && doctorData?.image && (
                    <div className="mt-2">
                      <img
                        src={doctorData.image}
                        alt="Current profile"
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
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
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
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

            <div className="my-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
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
            </div>

            <div className="my-2">
              <Label htmlFor="awards">Awards & Certifications</Label>
              <Input
                id="awards"
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e, "awards")}
              />
              {isEdit && doctorData?.awards && (
                <div className="mt-2 gap-3 flex">
                  {doctorData?.awards.map((award, index) => (
                    <img
                      key={index}
                      src={award}
                      alt={`Award ${index}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="my-2 space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="showOnDashboard"
                  checked={formData.showOnDashboard}
                  onCheckedChange={handleCheckboxChange("showOnDashboard")}
                />
                <Label htmlFor="showOnDashboard">Show on Dashboard</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isSpec"
                  checked={formData.isSpec}
                  onCheckedChange={handleCheckboxChange("isSpec")}
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
