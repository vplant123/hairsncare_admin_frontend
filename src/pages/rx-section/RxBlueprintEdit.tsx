import React from 'react'
import './rx.css'
import { useSelector } from 'react-redux';
import BASE_URL from '../../Config';
function RxBlueprintEdit({section8,
  setSection8}) {

  const content = useSelector((state) => state.content.home);
  console.log("jojkeor",content)

  const handleImageUpload = async (e,type) => {
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
          if(type == "subImg") setSection8({...section8,subImg : imageData.imageUrl});
          if(type == "img") setSection8({...section8,img : imageData.imageUrl});
          // return imageArr;
        } catch (error) {
          // toast.error("Error uploading image.");
          console.error("Error:", error);
          return [];
          throw error;
        }

  
  };

  return (
    <div className='rx-container '>
      <div ><h2 style={{ fontSize: "2rem", fontWeight: "700" }}>
      <input
        type="text"
        defaultValue={section8?.mainTitle}
        onChange={(e) => setSection8({...section8,mainTitle : e?.target?.value})}
        className="editable-input"
        // style={{width : "75px"}}
      />
      </h2>
        <img alt='hair' className="animate__animated animate__fadeInLeft" src={section8?.img} />
        <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,"img")}
      style={{width : "95px"}}
    />
      </div>
      <div className='animate__backInRight'><img alt='hair' src={section8?.subImg} />
      <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,"subImg")}
      style={{width : "95px"}}
    /></div>

    </div>
  )
}

export default RxBlueprintEdit
