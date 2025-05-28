import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface DiagnosisForm {
  telogenEffluvium: {
    acuteMale: boolean;
    chronicMale: boolean;
    acuteFemale: boolean;
    chronicFemale: boolean;
  };
  androgeneticAlopecia: {
    male: {
      grade1: boolean;
      grade23: boolean;
      grade45: boolean;
      grade67: boolean;
    };
    female: {
      grade1: boolean;
      grade2: boolean;
      grade3: boolean;
    };
  };
  alopeciaAreata: {
    male: boolean;
    female: boolean;
  };
  otherConditions: {
    pcod: boolean;
    thyroid: boolean;
    anemia: boolean;
    dandruff: boolean;
    greyHair: boolean;
  };
  otherDetails: string;
}

const DiagnosisStep = ({
  onNext,
}: {
  onNext: (data: DiagnosisForm) => void;
}) => {
  const [formData, setFormData] = useState<DiagnosisForm>({
    telogenEffluvium: {
      acuteMale: false,
      chronicMale: false,
      acuteFemale: false,
      chronicFemale: false,
    },
    androgeneticAlopecia: {
      male: {
        grade1: false,
        grade23: false,
        grade45: false,
        grade67: false,
      },
      female: {
        grade1: false,
        grade2: false,
        grade3: false,
      },
    },
    alopeciaAreata: {
      male: false,
      female: false,
    },
    otherConditions: {
      pcod: false,
      thyroid: false,
      anemia: false,
      dandruff: false,
      greyHair: false,
    },
    otherDetails: "",
  });

  const [errors, setErrors] = useState<{
    telogenEffluvium?: string;
    androgeneticAlopecia?: string;
    alopeciaAreata?: string;
    otherConditions?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate Telogen Effluvium
    const hasTelogenEffluvium = Object.values(formData.telogenEffluvium).some(
      value => value
    );
    if (!hasTelogenEffluvium) {
      newErrors.telogenEffluvium = "Please select at least one option";
    }

    // Validate Androgenetic Alopecia
    const hasMaleAGA = Object.values(formData.androgeneticAlopecia.male).some(
      value => value
    );
    const hasFemaleAGA = Object.values(
      formData.androgeneticAlopecia.female
    ).some(value => value);
    if (!hasMaleAGA && !hasFemaleAGA) {
      newErrors.androgeneticAlopecia = "Please select at least one grade";
    }

    // Validate Alopecia Areata
    const hasAlopeciaAreata = Object.values(formData.alopeciaAreata).some(
      value => value
    );
    if (!hasAlopeciaAreata) {
      newErrors.alopeciaAreata = "Please select at least one option";
    }

    // Validate Other Conditions
    const hasOtherConditions = Object.values(formData.otherConditions).some(
      value => value
    );
    if (!hasOtherConditions) {
      newErrors.otherConditions = "Please select at least one condition";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (
    category: keyof DiagnosisForm,
    subCategory: string,
    value: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: value,
      },
    }));
    // Clear error when user makes a selection
    if (errors[category]) {
      setErrors(prev => ({ ...prev, [category]: undefined }));
    }
  };

  const handleNestedCheckboxChange = (
    category: keyof DiagnosisForm,
    subCategory: string,
    nestedCategory: string,
    value: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: {
          ...prev[category][subCategory],
          [nestedCategory]: value,
        },
      },
    }));
    // Clear error when user makes a selection
    if (errors[category]) {
      setErrors(prev => ({ ...prev, [category]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    } else {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select at least one option for each category",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Diagnosis Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Telogen Effluvium Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Telogen Effluvium</h3>
              {errors.telogenEffluvium && (
                <span className="text-sm text-red-500">
                  {errors.telogenEffluvium}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acuteMale"
                    checked={formData.telogenEffluvium.acuteMale}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "telogenEffluvium",
                        "acuteMale",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="acuteMale">Acute Telogen Effluvium (M)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="chronicMale"
                    checked={formData.telogenEffluvium.chronicMale}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "telogenEffluvium",
                        "chronicMale",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="chronicMale">
                    Chronic Telogen Effluvium (M)
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acuteFemale"
                    checked={formData.telogenEffluvium.acuteFemale}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "telogenEffluvium",
                        "acuteFemale",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="acuteFemale">
                    Acute Telogen Effluvium (F)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="chronicFemale"
                    checked={formData.telogenEffluvium.chronicFemale}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "telogenEffluvium",
                        "chronicFemale",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="chronicFemale">
                    Chronic Telogen Effluvium (F)
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Androgenetic Alopecia Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Androgenetic Alopecia</h3>
              {errors.androgeneticAlopecia && (
                <span className="text-sm text-red-500">
                  {errors.androgeneticAlopecia}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Male</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="maleGrade1"
                      checked={formData.androgeneticAlopecia.male.grade1}
                      onCheckedChange={checked =>
                        handleNestedCheckboxChange(
                          "androgeneticAlopecia",
                          "male",
                          "grade1",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="maleGrade1">Grade 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="maleGrade23"
                      checked={formData.androgeneticAlopecia.male.grade23}
                      onCheckedChange={checked =>
                        handleNestedCheckboxChange(
                          "androgeneticAlopecia",
                          "male",
                          "grade23",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="maleGrade23">Grade 2 & Grade 3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="maleGrade45"
                      checked={formData.androgeneticAlopecia.male.grade45}
                      onCheckedChange={checked =>
                        handleNestedCheckboxChange(
                          "androgeneticAlopecia",
                          "male",
                          "grade45",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="maleGrade45">Grade 4 & Grade 5</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="maleGrade67"
                      checked={formData.androgeneticAlopecia.male.grade67}
                      onCheckedChange={checked =>
                        handleNestedCheckboxChange(
                          "androgeneticAlopecia",
                          "male",
                          "grade67",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="maleGrade67">Grade 6 & Grade 7</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Female</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="femaleGrade1"
                      checked={formData.androgeneticAlopecia.female.grade1}
                      onCheckedChange={checked =>
                        handleNestedCheckboxChange(
                          "androgeneticAlopecia",
                          "female",
                          "grade1",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="femaleGrade1">Grade 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="femaleGrade2"
                      checked={formData.androgeneticAlopecia.female.grade2}
                      onCheckedChange={checked =>
                        handleNestedCheckboxChange(
                          "androgeneticAlopecia",
                          "female",
                          "grade2",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="femaleGrade2">Grade 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="femaleGrade3"
                      checked={formData.androgeneticAlopecia.female.grade3}
                      onCheckedChange={checked =>
                        handleNestedCheckboxChange(
                          "androgeneticAlopecia",
                          "female",
                          "grade3",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="femaleGrade3">Grade 3</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alopecia Areata Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Alopecia Areata</h3>
              {errors.alopeciaAreata && (
                <span className="text-sm text-red-500">
                  {errors.alopeciaAreata}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alopeciaMale"
                  checked={formData.alopeciaAreata.male}
                  onCheckedChange={checked =>
                    handleCheckboxChange(
                      "alopeciaAreata",
                      "male",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="alopeciaMale">Alopecia Areata (M)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alopeciaFemale"
                  checked={formData.alopeciaAreata.female}
                  onCheckedChange={checked =>
                    handleCheckboxChange(
                      "alopeciaAreata",
                      "female",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="alopeciaFemale">Alopecia Areata (F)</Label>
              </div>
            </div>
          </div>

          {/* Other Conditions Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Other Conditions</h3>
              {errors.otherConditions && (
                <span className="text-sm text-red-500">
                  {errors.otherConditions}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pcod"
                    checked={formData.otherConditions.pcod}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "otherConditions",
                        "pcod",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="pcod">PCOD</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="thyroid"
                    checked={formData.otherConditions.thyroid}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "otherConditions",
                        "thyroid",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="thyroid">Thyroid</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anemia"
                    checked={formData.otherConditions.anemia}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "otherConditions",
                        "anemia",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="anemia">Anemia</Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dandruff"
                    checked={formData.otherConditions.dandruff}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "otherConditions",
                        "dandruff",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="dandruff">Dandruff</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="greyHair"
                    checked={formData.otherConditions.greyHair}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        "otherConditions",
                        "greyHair",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="greyHair">Grey Hair</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Other Details Input */}
          <div className="space-y-2">
            <Label htmlFor="otherDetails">Other Details</Label>
            <Input
              id="otherDetails"
              value={formData.otherDetails}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  otherDetails: e.target.value,
                }))
              }
              placeholder="Enter any additional details..."
              className="w-full"
            />
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Next Step
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiagnosisStep;
