import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface HairScalpAnalysis {
  scalpExamination: string;
  hairQuality: string;
  hairDensity: string;
  colorVibrancy: string;
  moistureHydration: string;
  hairBreakage: string;
}

const HairScalpAnalysisStep = ({
  onNext,
  onBack,
}: {
  onNext: (data: HairScalpAnalysis) => void;
  onBack: () => void;
}) => {
  const [formData, setFormData] = useState<HairScalpAnalysis>({
    scalpExamination: "",
    hairQuality: "",
    hairDensity: "",
    colorVibrancy: "",
    moistureHydration: "",
    hairBreakage: "",
  });

  const [errors, setErrors] = useState<Partial<HairScalpAnalysis>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<HairScalpAnalysis> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof HairScalpAnalysis] = "This field is required";
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

  const handleRadioChange = (
    category: keyof HairScalpAnalysis,
    value: string
  ) => {
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
    category: keyof HairScalpAnalysis,
    options: { value: string; label: string }[],
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
        className="grid grid-cols-2 gap-4"
      >
        {options.map(option => (
          <div
            key={option.value}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RadioGroupItem
              value={option.value}
              id={`${category}-${option.value}`}
              className="text-primary border-gray-300"
            />
            <Label
              htmlFor={`${category}-${option.value}`}
              className="text-gray-700 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          Hair & Scalp Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderSection(
            "1. Scalp Examination",
            "scalpExamination",
            [
              { value: "normal", label: "Normal Scalp" },
              { value: "oily", label: "Oily Scalp" },
              { value: "dry", label: "Dry Scalp" },
              { value: "dryFlaky", label: "Dry & Flaky Scalp" },
              { value: "redIrritated", label: "Red and Irritated Scalp" },
            ],
            errors.scalpExamination
          )}

          {renderSection(
            "2. Hair Quality (texture)",
            "hairQuality",
            [
              { value: "good", label: "Good" },
              { value: "dull", label: "Dull Hair" },
              { value: "frizzy", label: "Frizzy Hair" },
              { value: "tangles", label: "Tangles Easily & Forms Knot" },
              { value: "splitEnds", label: "Split Ends" },
              { value: "greasy", label: "Greasy Hair (Oily)" },
              { value: "dry", label: "Dry Hair" },
              { value: "brittle", label: "Brittle Hair" },
            ],
            errors.hairQuality
          )}

          {renderSection(
            "3. Hair Density",
            "hairDensity",
            [
              { value: "good", label: "Good" },
              { value: "decreased", label: "Decreased" },
            ],
            errors.hairDensity
          )}

          {renderSection(
            "4. Color Vibrancy",
            "colorVibrancy",
            [
              { value: "normal", label: "Normal Hair Color" },
              { value: "faded", label: "Faded (Dull) Hair Color" },
            ],
            errors.colorVibrancy
          )}

          {renderSection(
            "5. Moisture and Hydration",
            "moistureHydration",
            [
              { value: "wellHydrated", label: "Well Hydrated" },
              { value: "lackMoisture", label: "Lack of Moisture" },
            ],
            errors.moistureHydration
          )}

          {renderSection(
            "6. Hair Breakage",
            "hairBreakage",
            [{ value: "excessive", label: "Excessive Breakage" }],
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
              Next Step
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default HairScalpAnalysisStep;
