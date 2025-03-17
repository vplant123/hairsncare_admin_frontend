import React from 'react'
import './Media.css'
import { useSelector } from 'react-redux';
import BASE_URL from '../../Config';
function MediaEdit({section5,
  setSection5}) {
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
            let inputData = section5?.map(item => ({ ...item }));
            inputData[ind][type] = imageData.imageUrl;
            setSection5(inputData);
            // return imageArr;
          } catch (error) {
            // toast.error("Error uploading image.");
            console.error("Error:", error);
            return [];
            throw error;
          }
      }
      else{
        let inputData = section5?.map(item => ({ ...item }));
        inputData[ind][type] = e?.target?.value;
        setSection5(inputData);
      }
  };

  return (
    <>
      <div className='media-content container' style={{
        fontFamily: '"Poppins", sans-serif'
      }}>
        <div className="m-c animate__backInLeft animate__animated"
          style={{ animationDelay: '1s' }}>
          <p>Published In</p>
          <p className='Media-heading'>Leading Media</p>
        </div>
        <div className="Media-feature animate__animated animate__fadeInRight"
          style={{ animationDelay: '1s' }}>

            {
              section5?.map((item,index)=> {
                return (
                  <div>
                     <img alt='hair' src={item?.img} />
                     <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,"img",index)}
      style={{width : "95px"}}
    />
                  </div>
                )
              })
            }
        </div>

      </div>

    </>
  )
}

export default MediaEdit

