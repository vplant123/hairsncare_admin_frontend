import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface ConclusionData {
  overallHealth: string;
  scalpExamination: string;
  hairDensity: string;
  moistureHydration: string;
  hairQuality: string;
  colorVibrancy: string;
  hairBreakage: string;
}

const ConclusionStep = ({
  onNext,
  onBack,
}: {
  onNext: (data: ConclusionData) => void;
  onBack: () => void;
}) => {
  const [formData, setFormData] = useState<ConclusionData>({
    overallHealth: "",
    scalpExamination: "",
    hairDensity: "",
    moistureHydration: "",
    hairQuality: "",
    colorVibrancy: "",
    hairBreakage: "",
  });

  const [errors, setErrors] = useState<Partial<ConclusionData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ConclusionData> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof ConclusionData] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    } else {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select an option for each category",
      });
    }
  };

  const handleRadioChange = (category: keyof ConclusionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: value,
    }));
    if (errors[category]) {
      setErrors(prev => ({ ...prev, [category]: undefined }));
    }
  };

  const renderSection = (
    title: string,
    category: keyof ConclusionData,
    options: { value: string; label: string; description?: string }[],
    error?: string
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
      <RadioGroup
        value={formData[category]}
        onValueChange={value => handleRadioChange(category, value)}
        className="space-y-4"
      >
        {options.map(option => (
          <div
            key={option.value}
            className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RadioGroupItem
              value={option.value}
              id={`${category}-${option.value}`}
              className="text-primary border-gray-300 mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor={`${category}-${option.value}`}
                className="text-gray-700 cursor-pointer font-medium"
              >
                {option.label}
              </Label>
              {option.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          Conclusion & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderSection(
            "Overall Hair Health Assessment",
            "overallHealth",
            [
              {
                value: "satisfactory",
                label: "Satisfactory Condition",
                description:
                  "With the implementation of the provided recommendations, you can further improve the quality of your hair, prevent damage, and maintain healthy, vibrant locks.",
              },
              {
                value: "needsImprovement",
                label: "Satisfactory condition but needs improvement",
                description:
                  "While the current state is satisfactory, by applying the provided suggestions, you can enhance your hair's quality, avert potential damage, and uphold the well-being of your hair for vibrant locks.",
              },
            ],
            errors.overallHealth
          )}

          {renderSection(
            "Scalp Examination",
            "scalpExamination",
            [
              { value: "healthy", label: "Healthy Scalp" },
              { value: "mildIssues", label: "Mild Issues Present" },
              { value: "moderateIssues", label: "Moderate Issues Present" },
              { value: "severeIssues", label: "Severe Issues Present" },
            ],
            errors.scalpExamination
          )}

          {renderSection(
            "Hair Density",
            "hairDensity",
            [
              { value: "good", label: "Good Density" },
              { value: "moderate", label: "Moderate Density" },
              { value: "low", label: "Low Density" },
            ],
            errors.hairDensity
          )}

          {renderSection(
            "Moisture & Hydration",
            "moistureHydration",
            [
              { value: "wellHydrated", label: "Well Hydrated" },
              { value: "moderatelyHydrated", label: "Moderately Hydrated" },
              { value: "dry", label: "Dry" },
            ],
            errors.moistureHydration
          )}

          {renderSection(
            "Hair Quality & Texture",
            "hairQuality",
            [
              { value: "excellent", label: "Excellent" },
              { value: "good", label: "Good" },
              { value: "fair", label: "Fair" },
              { value: "poor", label: "Poor" },
            ],
            errors.hairQuality
          )}

          {renderSection(
            "Color Vibrancy",
            "colorVibrancy",
            [
              { value: "vibrant", label: "Vibrant" },
              { value: "moderate", label: "Moderate" },
              { value: "dull", label: "Dull" },
            ],
            errors.colorVibrancy
          )}

          {renderSection(
            "Hair Breakage",
            "hairBreakage",
            [
              { value: "minimal", label: "Minimal Breakage" },
              { value: "moderate", label: "Moderate Breakage" },
              { value: "severe", label: "Severe Breakage" },
            ],
            errors.hairBreakage
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="hover:bg-gray-100 text-gray-700"
            >
              Previous
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all"
            >
              Generate Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConclusionStep;
