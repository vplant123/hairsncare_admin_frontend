import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface AssessmentData {
  personal: {
    mobile: string | null;
    ageRange: string;
    gender: string;
    name: string;
    email: string;
    phoneNumber: string;
    "Select your age group": string;
    Gender: {
      src: string;
    };
  };
  Nutritional: Array<
    Array<{
      question: string;
      option:
        | string
        | { src: string; name: string }
        | Array<string | { src: string; name: string }>;
      subquestion?: string;
      suboption?: string | { src: string; name: string };
    }>
  >;
  LifeStyle: Array<
    Array<{
      question: string;
      option:
        | string
        | { src: string; name: string }
        | Array<string | { src: string; name: string }>;
    }>
  >;
  Stress: Array<{
    ques: string;
    option: string | { src: string; name: string };
  }>;
  HairAndScalp: Array<
    Array<{
      question: string;
      option:
        | string
        | { src: string; name: string }
        | Array<string | { src: string; name: string }>;
      subquestions?: Array<{
        subQuestion: string;
        option:
          | string
          | { src: string; name: string }
          | Array<string | { src: string; name: string }>;
      }>;
    }>
  >;
  UploadedImage: Array<{
    imageUrl: string;
  }>;
}

const PatientTestResult = () => {
  const { userId, hairTestId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal-profile");
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null
  );
  const [loadingAssessment, setLoadingAssessment] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({
    hair: null,
    scalp: null,
  });
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoadingAssessment(true);
        const token = localStorage.getItem("token");

        // Log the request details for debugging
        console.log("Fetching patient data with:", {
          userId,
          hairTestId,
          endpoint: `/api/api/v1/doctor/get-hair-test?hairTestId=${hairTestId}`,
        });

        const response = await fetch(
          `/api/api/v1/doctor/get-hair-test?hairTestId=${hairTestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Log the response status
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("Error response:", errorData);
          throw new Error(
            `Failed to fetch patient data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Received data:", data);

        if (data.success) {
          // Check if data.data exists and is an array
          if (Array.isArray(data.data) && data.data.length > 0) {
            setAssessmentData(data.data[0]);
          } else if (data.data && typeof data.data === "object") {
            // If data.data is a single object, use it directly
            setAssessmentData(data.data);
          } else {
            console.error("Unexpected data structure:", data);
            throw new Error("Invalid data structure in response");
          }
        } else {
          console.error("API returned error:", data);
          throw new Error(data.message || "Failed to fetch patient data");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to fetch patient data. Please try again.",
        });
      } finally {
        setLoadingAssessment(false);
      }
    };

    if (userId && hairTestId) {
      fetchPatientData();
    } else {
      console.error("Missing required parameters:", { userId, hairTestId });
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing required parameters. Please check the URL.",
      });
    }
  }, [userId, hairTestId]);

  const handleImageUpload = async (type: "hair" | "scalp", file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("appointmentId", hairTestId);
      formData.append("type", type);

      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://apihair.txogavideo.in/api/v1/doctor/upload-assessment-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setUploadedImages(prev => ({
        ...prev,
        [type]: data.data.imageUrl,
      }));

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image",
      });
    }
  };

  const handleGenerateReport = () => {
    navigate(`/generate-report/${userId}/${hairTestId}`);
  };

  const renderOption = (
    option:
      | string
      | { src: string; name: string }
      | Array<string | { src: string; name: string }>
  ): React.ReactNode => {
    if (Array.isArray(option)) {
      return (
        <div className="flex flex-wrap gap-3 mt-2">
          {option.map((opt, index) => {
            if (typeof opt === "object" && opt !== null && "src" in opt) {
              return (
                <img
                  key={index}
                  src={opt.src}
                  alt={opt.name || "Option"}
                  className="h-12 w-12 object-contain rounded-lg shadow-sm hover:scale-110 transition-transform duration-200"
                />
              );
            }
            return (
              <span
                key={index}
                className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {String(opt)}
              </span>
            );
          })}
        </div>
      );
    }

    if (typeof option === "object" && option !== null && "src" in option) {
      return (
        <img
          src={option.src}
          alt={option.name || "Option"}
          className="h-12 w-12 object-contain rounded-lg shadow-sm hover:scale-110 transition-transform duration-200 inline-block ml-2"
        />
      );
    }

    return (
      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
        {String(option || "Not answered")}
      </span>
    );
  };

  const renderPersonalValue = (value: unknown): React.ReactNode => {
    if (typeof value === "object" && value !== null && "src" in value) {
      const imgValue = value as { src: string };
      return (
        <img
          src={imgValue.src}
          alt="Personal"
          className="h-12 w-12 object-contain rounded-lg shadow-sm hover:scale-110 transition-transform duration-200"
        />
      );
    }
    return (
      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
        {String(value || "Not available")}
      </span>
    );
  };

  const renderTabContent = () => {
    if (loadingAssessment) {
      return (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Loading assessment data...</p>
        </div>
      );
    }

    if (!assessmentData) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          No assessment data available
        </div>
      );
    }

    switch (activeTab) {
      case "personal-profile":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(assessmentData.personal || {}).map(
                  ([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </TableCell>
                      <TableCell>{renderPersonalValue(value)}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </motion.div>
        );

      case "nutritional":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              {assessmentData.Nutritional?.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border rounded-lg p-4">
                  {section.map((item, itemIndex) => (
                    <div key={itemIndex} className="mb-4 last:mb-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <h4 className="font-medium text-sm">
                            {item.question}
                          </h4>
                          <div className="pl-4 border-l-2 border-primary/20">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Answer:{" "}
                              </span>
                              {renderOption(item.option)}
                            </p>
                            {item.subquestion && (
                              <p className="text-sm text-muted-foreground mt-2">
                                <span className="font-medium text-foreground">
                                  {item.subquestion}:{" "}
                                </span>
                                {item.suboption && renderOption(item.suboption)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "lifestyle":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              {assessmentData.LifeStyle?.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border rounded-lg p-4">
                  {section.map((item, itemIndex) => (
                    <div key={itemIndex} className="mb-4 last:mb-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <h4 className="font-medium text-sm">
                            {item.question}
                          </h4>
                          <div className="pl-4 border-l-2 border-primary/20">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Answer:{" "}
                              </span>
                              {renderOption(item.option)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "stress":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              {assessmentData.Stress?.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-sm">{item.ques}</h4>
                      <div className="pl-4 border-l-2 border-primary/20">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Level:{" "}
                          </span>
                          {renderOption(item.option)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "hair-scalp":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              {assessmentData.HairAndScalp?.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border rounded-lg p-4">
                  {section.map((item, itemIndex) => (
                    <div key={itemIndex} className="mb-4 last:mb-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <h4 className="font-medium text-sm">
                            {item.question}
                          </h4>
                          <div className="pl-4 border-l-2 border-primary/20">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Answer:{" "}
                              </span>
                              {renderOption(item.option)}
                            </p>
                            {item.subquestions?.map((subQ, subIndex) => (
                              <div key={subIndex} className="mt-2">
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium text-foreground">
                                    {subQ.subQuestion}:{" "}
                                  </span>
                                  {renderOption(subQ.option)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "upload-image":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {assessmentData.UploadedImage &&
            assessmentData.UploadedImage.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Patient Uploaded Images
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {assessmentData.UploadedImage.length}{" "}
                    {assessmentData.UploadedImage.length === 1
                      ? "Image"
                      : "Images"}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-8">
                  {assessmentData.UploadedImage.map((image, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative">
                        <img
                          src={image.imageUrl}
                          alt={`Patient uploaded image ${index + 1}`}
                          className="w-full h-[500px] object-contain rounded-lg"
                        />
                        <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Image {index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-xl text-gray-600">
                  No images uploaded by the patient
                </p>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Patient Test Result
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="hover:bg-gray-100 transition-colors duration-200"
        >
          Back to Appointments
        </Button>
      </div>
      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b pb-6">
          <CardTitle className="text-2xl text-gray-800">
            Patient Assessment
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            View and manage patient assessment data
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-6 gap-4 p-1 bg-gray-100 rounded-lg">
              <TabsTrigger
                value="personal-profile"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium transition-all duration-200"
              >
                Personal Profile
              </TabsTrigger>
              <TabsTrigger
                value="nutritional"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium transition-all duration-200"
              >
                Nutritional
              </TabsTrigger>
              <TabsTrigger
                value="lifestyle"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium transition-all duration-200"
              >
                Lifestyle
              </TabsTrigger>
              <TabsTrigger
                value="stress"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium transition-all duration-200"
              >
                Stress
              </TabsTrigger>
              <TabsTrigger
                value="hair-scalp"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium transition-all duration-200"
              >
                Hair & Scalp
              </TabsTrigger>
              <TabsTrigger
                value="upload-image"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 data-[state=active]:font-medium transition-all duration-200"
              >
                Upload Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {renderTabContent()}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              Close
            </Button>
            <Button
              onClick={handleGenerateReport}
              disabled={generatingReport}
              className="bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              {generatingReport ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                "Generate Report"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PatientTestResult;
