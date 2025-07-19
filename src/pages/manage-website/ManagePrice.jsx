import React, { useState, useEffect } from "react";
import BASE_URL from "../../Config";
import { useDispatch } from "react-redux";
import { getUtilityContentData } from "../../features/ContenetDataSlice";
import { toast } from "react-toastify";

export default function ManagePrice({ content, content1, content2 }) {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  console.log("content", content)
  console.log("content1", content1)
  console.log("content2", content2)

  // Initialize state with default values
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [price4, setPrice4] = useState("");
  

  // Add state for editable section1
  const [editableSection1, setEditableSection1] = useState([
    {
      _id: "1",
      name: "Kamini Goutham",
      title: "Story 1",
      videoUrl: "https://www.youtube.com/embed/i3JI37i0w1U"
    },
    {
      _id: "2",
      name: "Rahul Sharma",
      title: "Story 2",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4"
    }
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', title: '', url: '', videoUrl: '' });

  // Update state when content changes
  useEffect(() => {
    if (content && Array.isArray(content) ) {
      const p1 = content.find(e => e?.name === "Local Plan");
      const p2 = content.find(e => e?.name === "Premium Plan");
      
      setPrice1(p1?.price || "");
      setPrice2(p2?.price || "");
     
    }
  setPrice3(content1?.deliveryCharge || "");
  setPrice4(content1?.deliveryAmt || "");
    // Set editable section1 from content2
    if (content2 && Array.isArray(content2.section1)) {
      setEditableSection1(content2.section1);
    }
  }, [content, content1, content2]);

  // Edit handlers
  const handleEditClick = idx => {
    setEditingIndex(idx);
    setEditForm({ ...editableSection1[idx] });
  };
  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };
  const handleEditSave = idx => {
    const updated = editableSection1.map((item, i) => i === idx ? { ...editForm } : item);
    setEditableSection1(updated);
    setEditingIndex(null);
  };
  const handleEditCancel = () => {
    setEditingIndex(null);
  };

  const handleSubmit = async e => {
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please login to continue.");
        setLoader(false);
        return;
      }

      const data = {
        appPrice1: price1,
        appPrice2: price2,
        appPrice3: price3,
        appPrice4: price4,
        section1: editableSection1, // Send the section1 data
        plan: "1",
      };
      let url = `${BASE_URL}/utility/editVideoCustomer`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(getUtilityContentData());
        toast.success("Content updated successfully");
        console.log("Price and section1 data updated successfully:", result);
        
      } else {
        toast.error(`Failed to update: ${response.statusText}`);
        console.error("Failed to update price and section1 data:", response.statusText);
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
      {editableSection1 && editableSection1.length > 0 && (
  <div className="mb-10">
    <h2 className="text-3xl font-bold mb-8">Stories by our Happy Customers</h2>
    {editableSection1.map((item, idx) => (
      <div
        key={item._id || idx}
        className="flex flex-col md:flex-row items-start md:items-center bg-[#fafad2] rounded-xl shadow-lg p-8 mb-8"
      >
        {/* Left: Text */}
        <div className="flex-1 mb-6 md:mb-0 md:mr-8">
          <div className="text-2xl font-semibold mb-2">{item.name}</div>
          <div className="text-lg">{item.title}</div>
        </div>
        {/* Right: Video */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xl aspect-video bg-black rounded-lg overflow-hidden shadow">
            <iframe
              src={item.videoUrl}
              title={item.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)}
      {/* Editable Section1 Table */}
      <h2 className="text-lg font-bold mb-2">Customer Videos (Editable)</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Image URL</th>
              <th className="border px-2 py-1">Video URL</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editableSection1.map((item, idx) => (
              <tr key={item._id || idx}>
                {editingIndex === idx ? (
                  <>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={e => handleEditChange('name', e.target.value)}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={e => handleEditChange('title', e.target.value)}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        value={editForm.url}
                        onChange={e => handleEditChange('url', e.target.value)}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        value={editForm.videoUrl}
                        onChange={e => handleEditChange('videoUrl', e.target.value)}
                        className="p-1 border rounded w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <button onClick={() => handleEditSave(idx)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Save</button>
                      <button onClick={handleEditCancel} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{item.name}</td>
                    <td className="border px-2 py-1">{item.title}</td>
                    <td className="border px-2 py-1">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image</a>
                    </td>
                    <td className="border px-2 py-1">
                      <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Video</a>
                    </td>
                    <td className="border px-2 py-1">
                      <button onClick={() => handleEditClick(idx)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Price Form */}
      <div>
       
      </div>
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
            {loader ? "Updating..." : "Update Prices & Customer Videos"}
          </button>
        </div>
      </div>
    </div>
  );
}
