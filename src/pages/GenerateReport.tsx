import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DiagnosisStep from "./DiagnosisStep";
import HairScalpAnalysisStep from "./HairScalpAnalysisStep";
import ConclusionStep from "./ConclusionStep";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DiagnosisData {
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

interface HairScalpAnalysis {
  scalpExamination: string;
  hairQuality: string;
  hairDensity: string;
  colorVibrancy: string;
  moistureHydration: string;
  hairBreakage: string;
}

interface ConclusionData {
  overallHealth: string;
  scalpExamination: string;
  hairDensity: string;
  moistureHydration: string;
  hairQuality: string;
  colorVibrancy: string;
  hairBreakage: string;
}

const GenerateReport = () => {
  const navigate = useNavigate();
  const { userId, hairTestId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(
    null
  );
  const [hairScalpData, setHairScalpData] = useState<HairScalpAnalysis | null>(
    null
  );
  const [conclusionData, setConclusionData] = useState<ConclusionData | null>(
    null
  );

  const handleDiagnosisSubmit = (data: DiagnosisData) => {
    setDiagnosisData(data);
    setCurrentStep(2);
  };

  const handleHairScalpSubmit = (data: HairScalpAnalysis) => {
    setHairScalpData(data);
    setCurrentStep(3);
  };

  const handleConclusionSubmit = (data: ConclusionData) => {
    setConclusionData(data);
    setCurrentStep(4);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DiagnosisStep onNext={handleDiagnosisSubmit} />;
      case 2:
        return (
          <HairScalpAnalysisStep
            onNext={handleHairScalpSubmit}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <ConclusionStep
            onNext={handleConclusionSubmit}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="text-2xl font-bold text-center text-gray-800">
                Review & Generate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Diagnosis Summary
                  </h3>
                  <div className="space-y-4">
                    {diagnosisData && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-700">
                              Telogen Effluvium
                            </h4>
                            <div className="pl-4 space-y-1">
                              {Object.entries(
                                diagnosisData.telogenEffluvium
                              ).map(
                                ([key, value]) =>
                                  value && (
                                    <p
                                      key={key}
                                      className="text-sm text-gray-600"
                                    >
                                      {key
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, str =>
                                          str.toUpperCase()
                                        )}
                                    </p>
                                  )
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-700">
                              Androgenetic Alopecia
                            </h4>
                            <div className="pl-4 space-y-1">
                              {Object.entries(
                                diagnosisData.androgeneticAlopecia
                              ).map(([gender, grades]) => (
                                <div key={gender} className="space-y-1">
                                  <p className="text-sm font-medium text-gray-600 capitalize">
                                    {gender}
                                  </p>
                                  {Object.entries(grades).map(
                                    ([grade, value]) =>
                                      value && (
                                        <p
                                          key={grade}
                                          className="text-sm text-gray-600 pl-2"
                                        >
                                          Grade {grade.replace("grade", "")}
                                        </p>
                                      )
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-700">
                            Other Conditions
                          </h4>
                          <div className="pl-4 space-y-1">
                            {Object.entries(diagnosisData.otherConditions).map(
                              ([condition, value]) =>
                                value && (
                                  <p
                                    key={condition}
                                    className="text-sm text-gray-600 capitalize"
                                  >
                                    {condition.replace(/([A-Z])/g, " $1")}
                                  </p>
                                )
                            )}
                          </div>
                        </div>
                        {diagnosisData.otherDetails && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-700">
                              Additional Details
                            </h4>
                            <p className="text-sm text-gray-600 pl-4">
                              {diagnosisData.otherDetails}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Hair & Scalp Analysis Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {hairScalpData &&
                      Object.entries(hairScalpData).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <h4 className="font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {value.replace(/([A-Z])/g, " $1")}
                          </p>
                        </div>
                      ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Conclusion & Recommendations
                  </h3>
                  <div className="space-y-4">
                    {conclusionData && (
                      <>
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-700">
                            Overall Health Assessment
                          </h4>
                          <p className="text-sm text-gray-600">
                            {conclusionData.overallHealth === "satisfactory"
                              ? "Satisfactory Condition"
                              : "Satisfactory condition but needs improvement"}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(conclusionData)
                            .filter(([key]) => key !== "overallHealth")
                            .map(([key, value]) => (
                              <div key={key} className="space-y-1">
                                <h4 className="font-medium text-gray-700 capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </h4>
                                <p className="text-sm text-gray-600 capitalize">
                                  {value.replace(/([A-Z])/g, " $1")}
                                </p>
                              </div>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-between pt-6 mt-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                  className="hover:bg-gray-100 text-gray-700"
                >
                  Previous
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all"
                  onClick={() => {
                    console.log("Generating report with data:", {
                      diagnosisData,
                      hairScalpData,
                      conclusionData,
                    });
                  }}
                >
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Generate Report</h1>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="hover:bg-gray-100 text-gray-700"
        >
          Back
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex justify-center space-x-4">
          <div
            className={`flex items-center ${
              currentStep >= 1 ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 1
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300"
              }`}
            >
              1
            </div>
            <span className="ml-2 font-medium">Diagnosis</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 my-auto"></div>
          <div
            className={`flex items-center ${
              currentStep >= 2 ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 2
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300"
              }`}
            >
              2
            </div>
            <span className="ml-2 font-medium">Hair & Scalp Analysis</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 my-auto"></div>
          <div
            className={`flex items-center ${
              currentStep >= 3 ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 3
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300"
              }`}
            >
              3
            </div>
            <span className="ml-2 font-medium">Conclusion</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 my-auto"></div>
          <div
            className={`flex items-center ${
              currentStep >= 4 ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 4
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300"
              }`}
            >
              4
            </div>
            <span className="ml-2 font-medium">Review & Generate</span>
          </div>
        </div>
      </div>

      {renderStep()}
    </DashboardLayout>
  );
};

export default GenerateReport;
