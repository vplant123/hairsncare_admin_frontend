import React, { useState } from 'react';
import BASE_URL from '../../../Config';
// import "./CorePrinciple.css";

function CoreEdit({section6,
  setSection6}) {
  const [descriptions, setDescriptions] = useState([
    "Unlock the secrets to combat hair loss/thinning with dermatologist-recommended treatments, backed by proven efficacy and professional endorsement.",
    "Healthy habits are a reflection of strong and vibrant hair.",
    "The secret to healthy, lustrous hair.",
    "Experience radiant hair growth with our stress management techniques."
  ]);

const handleDescriptionChange = (index, event) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = event.target.value;
    setDescriptions(newDescriptions);
  };

  const handleImageUpload = async (e,type,ind) => {
    if(type == "img"){
      const file = e.target.files[0];
    
      try {
          const element = file;
          const formData = new FormData();
          formData.append("image", element);
    
          const imageResponse = await fetch(
            `${BASE_URL}/hair-tests/upload-image`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!imageResponse.ok) {
            // toast.error("Error uploading images.");
            throw new Error("Network response was not ok");
          }
          const imageData = await imageResponse.json();
          let inputData = section6?.data.map(item => ({ ...item }));
          inputData[ind]["img"] = imageData.imageUrl;
          setSection6({...section6,data : inputData});
          // return imageArr;
        } catch (error) {
          // toast.error("Error uploading image.");
          console.error("Error:", error);
          return [];
          throw error;
        }
    }
    else{
      console.log("kjeirj",e)
      let inputData = section6?.data.map(item => ({ ...item }));
      inputData[ind]["desc"] = e?.target?.value;
      setSection6({...section6,data : inputData});
    }
  
  };

  return (
    <div className='core-wrapper'>
      <hr />
      <div className='core container'>
        {/* <h1>{section6?.mainDes}</h1> */}
        <input
        type="text"
        defaultValue={section6?.mainDes}
        onChange={(e) => setSection6({...section6,mainDes : e?.target?.value})}
        className="editable-input"
        // style={{width : "75px"}}
      />
        <div className='core-image'>
          {section6?.data?.map((description, index) => (
            <div key={index}>
              <img 
                className='principle-img' 
                src={description?.img} 
                alt={`Hair Care Principle ${index + 1}`} 
              />
                  <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,"img",index)}
      style={{width : "95px"}}
    />
              <textarea
                value={description?.desc}
                onChange={(e) => handleImageUpload(e,"desc",index)}
                className='description-textarea'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoreEdit;
