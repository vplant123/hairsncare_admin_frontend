import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../Config";

const TestResults = () => {
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState("personal");
  const params = useParams();

  const navItems = [
    { id: "personal", label: "Personal Information", icon: "👤" },
    { id: "hairAndScalp", label: "Hair & Scalp Assessment", icon: "💇‍♀️" },
    { id: "nutritional", label: "Nutritional Assessment", icon: "🥗" },
    { id: "lifestyle", label: "Lifestyle Assessment", icon: "🏃‍♀️" },
    { id: "stress", label: "Stress Assessment", icon: "🧘‍♀️" },
    { id: "uploadedImages", label: "Uploaded Images", icon: "📸" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/doctor/get-hair-test?hairTestId=${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const renderPersonalInfo = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">👤</span>
        <h2 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Name</p>
          <p className="text-lg font-semibold text-gray-800">
            {data?.personal?.name || "N/A"}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Email</p>
          <p className="text-lg font-semibold text-gray-800">
            {data?.personal?.email || "N/A"}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Phone Number</p>
          <p className="text-lg font-semibold text-gray-800">
            {data?.personal?.phoneNumber || "N/A"}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Age Group</p>
          <p className="text-lg font-semibold text-gray-800">
            {data?.personal?.["Select your age group"] || "N/A"}
          </p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <p className="text-sm text-pink-600 font-medium">Gender</p>
          <p className="text-lg font-semibold text-gray-800">
            {data?.personal?.Gender?.src === "/assets/img/question/female.svg"
              ? "Female"
              : "Male"}
          </p>
        </div>
      </div>
    </div>
  );

  const renderHairAndScalp = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">💇‍♀️</span>
        <h2 className="text-2xl font-bold text-gray-800">
          Hair & Scalp Assessment
        </h2>
      </div>
      {data?.HairAndScalp?.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-gray-50 rounded-lg p-6 space-y-4">
          {section.map((item, itemIndex) => (
            <div key={itemIndex} className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">
                {item.question}
              </h3>
              <div className="pl-4">
                {Array.isArray(item.option) ? (
                  <div className="flex flex-wrap gap-3">
                    {item.option.map((opt, optIndex) => (
                      <div
                        key={optIndex}
                        className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full"
                      >
                        {typeof opt === "object" && opt !== null ? (
                          <>
                            <img
                              src={opt.src}
                              alt={opt.name}
                              className="w-6 h-6"
                            />
                            <span className="text-blue-700">{opt.name}</span>
                          </>
                        ) : (
                          <span className="text-blue-700">{String(opt)}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : typeof item.option === "object" && item.option !== null ? (
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
                    <img
                      src={item.option.src}
                      alt={item.option.name}
                      className="w-6 h-6"
                    />
                    <span className="text-blue-700">{item.option.name}</span>
                  </div>
                ) : (
                  <div className="bg-blue-50 px-3 py-2 rounded-full inline-block">
                    <span className="text-blue-700">{String(item.option)}</span>
                  </div>
                )}
              </div>
              {item.subquestions && item.subquestions.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-blue-200">
                  {item.subquestions.map((subQ, subIndex) => (
                    <div key={subIndex} className="mt-3">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">
                        {subQ.subQuestion}
                      </h4>
                      <div className="pl-4">
                        {Array.isArray(subQ.option) ? (
                          <div className="flex flex-wrap gap-3">
                            {subQ.option.map((opt, optIndex) => (
                              <div
                                key={optIndex}
                                className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full"
                              >
                                {typeof opt === "object" && opt !== null ? (
                                  <>
                                    <img
                                      src={opt.src}
                                      alt={opt.name}
                                      className="w-6 h-6"
                                    />
                                    <span className="text-green-700">
                                      {opt.name}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-green-700">
                                    {String(opt)}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : typeof subQ.option === "object" &&
                          subQ.option !== null ? (
                          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
                            <img
                              src={subQ.option.src}
                              alt={subQ.option.name}
                              className="w-6 h-6"
                            />
                            <span className="text-green-700">
                              {subQ.option.name}
                            </span>
                          </div>
                        ) : (
                          <div className="bg-green-50 px-3 py-2 rounded-full inline-block">
                            <span className="text-green-700">
                              {String(subQ.option)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderNutritional = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🥗</span>
        <h2 className="text-2xl font-bold text-gray-800">
          Nutritional Assessment
        </h2>
      </div>
      {data?.Nutritional?.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-gray-50 rounded-lg p-6">
          {section.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="bg-white rounded-lg p-4 shadow-sm mb-4"
            >
              <h3 className="font-semibold text-gray-800 mb-3">
                {item.question}
              </h3>
              <div className="pl-4">
                {typeof item.option === "object" && item.option !== null ? (
                  <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-full">
                    <img
                      src={item.option.src}
                      alt={item.option.name}
                      className="w-6 h-6"
                    />
                    <span className="text-purple-700">{item.option.name}</span>
                  </div>
                ) : (
                  <div className="bg-purple-50 px-3 py-2 rounded-full inline-block">
                    <span className="text-purple-700">
                      {String(item.option)}
                    </span>
                  </div>
                )}
              </div>
              {item.subquestion && (
                <div className="mt-4 pl-4 border-l-2 border-purple-200">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    {item.subquestion}
                  </h4>
                  <div className="pl-4">
                    {typeof item.suboption === "object" &&
                    item.suboption !== null ? (
                      <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-full">
                        <img
                          src={item.suboption.src}
                          alt={item.suboption.name}
                          className="w-6 h-6"
                        />
                        <span className="text-purple-700">
                          {item.suboption.name}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-purple-50 px-3 py-2 rounded-full inline-block">
                        <span className="text-purple-700">
                          {String(item.suboption)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderLifestyle = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🏃‍♀️</span>
        <h2 className="text-2xl font-bold text-gray-800">
          Lifestyle Assessment
        </h2>
      </div>
      {data?.LifeStyle?.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-gray-50 rounded-lg p-6">
          {section.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="bg-white rounded-lg p-4 shadow-sm mb-4"
            >
              <h3 className="font-semibold text-gray-800 mb-3">
                {item.question}
              </h3>
              <div className="pl-4">
                {typeof item.option === "object" && item.option !== null ? (
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-full">
                    <img
                      src={item.option.src}
                      alt={item.option.name}
                      className="w-6 h-6"
                    />
                    <span className="text-yellow-700">{item.option.name}</span>
                  </div>
                ) : (
                  <div className="bg-yellow-50 px-3 py-2 rounded-full inline-block">
                    <span className="text-yellow-700">
                      {String(item.option)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderStress = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🧘‍♀️</span>
        <h2 className="text-2xl font-bold text-gray-800">Stress Assessment</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.Stress?.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">{item.ques}</h3>
            <div className="bg-pink-50 px-3 py-2 rounded-full inline-block">
              <span className="text-pink-700">{String(item.option)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUploadedImages = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📸</span>
        <h2 className="text-2xl font-bold text-gray-800">Uploaded Images</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.UploadedImage?.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={image.imageUrl}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => window.open(image.imageUrl)}
              onError={e => {
                console.error("Image failed to load:", image.imageUrl);
                e.target.onerror = null; // Prevent infinite loop
                e.target.src =
                  "https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Available";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={() => window.open(image.imageUrl)}
                className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg transition-opacity duration-300"
              >
                View Full Size
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalInfo();
      case "hairAndScalp":
        return renderHairAndScalp();
      case "nutritional":
        return renderNutritional();
      case "lifestyle":
        return renderLifestyle();
      case "stress":
        return renderStress();
      case "uploadedImages":
        return renderUploadedImages();
      default:
        return null;
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading test results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4">
              <nav className="space-y-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
