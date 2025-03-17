import React, { useState } from 'react';
import BASE_URL from '../../../Config';
// import './ShoppingFeature.css';

function ShoppingFeatureEdit({section9,
  setSection9}) {
  const [features, setFeatures] = useState([
    { heading: 'FREE SHIPPING', description: 'All orders above 2999' },
    { heading: '15 DAYS RETURN', description: 'Money back Guarantee' },
    { heading: 'SECURE CHECKOUT', description: 'Protected by paypal' },
    { heading: 'GIFT COUPON', description: 'Assured gift' }
  ]);

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
          let inputData = section9?.map(item => ({ ...item }));
          inputData[ind]["img"] = imageData.imageUrl;
          setSection9(inputData);
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
      let inputData = section9.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection9(inputData);
    }
  
  };

  return (
    <div className='shopping-feature container'>
      {section9?.map((feature, index) => (
        <div key={index}>
          <img alt='icon' src={feature?.img} />
          <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,"img",index)}
      style={{width : "95px"}}
    />
          <div>
            <input
            //   className='feature-heading'
              defaultValue={feature?.name}
              onChange={(e) => handleImageUpload(e,"name",index)}
            />
            <input
              defaultValue={feature?.desc}
              onChange={(e) => handleImageUpload(e,"desc",index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShoppingFeatureEdit;
