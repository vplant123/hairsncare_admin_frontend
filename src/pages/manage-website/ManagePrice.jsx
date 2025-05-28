import React, { useState, useEffect } from "react";
const BASE_URL = "https://backend.hairsncares.com/api/v1";
import { useDispatch } from "react-redux";
import { getUtilityContentData } from "../../features/ContenetDataSlice";
import { toast } from "react-toastify";

export default function ManagePrice({ content, content1 }) {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  // Initialize state with default values
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [price4, setPrice4] = useState("");

  // Update state when content changes
  useEffect(() => {
    if (content && Array.isArray(content)) {
      const p1 = content.find(e => e?.name === "Local Plan");
      const p2 = content.find(e => e?.name === "Premium Plan");

      setPrice1(p1?.price || "");
      setPrice2(p2?.price || "");
    }

    if (content1) {
      setPrice3(content1?.deliveryCharge || "");
      setPrice4(content1?.deliveryAmt || "");
    }
  }, [content, content1]);

  const handleSubmit = async e => {
    setLoader(true);
    try {
      const data = {
        appPrice1: price1,
        appPrice2: price2,
        appPrice3: price3,
        appPrice4: price4,
        plan: "1",
      };
      let url = `${BASE_URL}/utility/editVideoCustomer`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(getUtilityContentData());
        toast.success("Content updated successfully");
        console.log("Price updated successfully:", result);
      } else {
        toast.error(`Failed to update: ${response.statusText}`);
        console.error("Failed to update price:", response.statusText);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Local Plan Price</label>
          <input
            type="text"
            value={price1}
            onChange={e => setPrice1(e.target.value)}
            placeholder="Enter Local Plan price"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Premium Plan Price</label>
          <input
            type="text"
            value={price2}
            onChange={e => setPrice2(e.target.value)}
            placeholder="Enter Premium Plan price"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Delivery Charge</label>
          <input
            type="text"
            value={price3}
            onChange={e => setPrice3(e.target.value)}
            placeholder="Enter delivery charge"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Delivery Amount Threshold</label>
          <input
            type="text"
            value={price4}
            onChange={e => setPrice4(e.target.value)}
            placeholder="Enter delivery amount threshold"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={loader}
            className={`w-full p-2 text-white rounded ${
              loader ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loader ? "Updating..." : "Update Prices"}
          </button>
        </div>
      </div>
    </div>
  );
}
