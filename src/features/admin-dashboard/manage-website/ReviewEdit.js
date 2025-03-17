import React, { useState } from 'react';
import BASE_URL from '../../../Config';
// import './Review.css';

function ReviewEdit({section3,setSection3}) {
  const [reviews, setReviews] = useState([
    {
      src: "/assets/img/home/user.png",
      name: "",
      rating: "",
      massage: "",
      logo: "/assets/img/google-icon.webp"
    },
    {
      src: "/assets/img/home/user.png",
      name: "",
      rating: "",
      massage: "",
      logo: "/assets/img/google-icon.webp"
    },
    {
      src: "/assets/img/home/user.png",
      name: "",
      rating: "",
      massage: "",
      logo: "/assets/img/google-icon.webp"
    }
  ]);

  const handleChange = (index, field, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[index][field] = value;
    setReviews(updatedReviews);
  };

  // const handleImageUpload = (index, field, event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     const updatedReviews = [...reviews];
  //     updatedReviews[index][field] = reader.result;
  //     setReviews(updatedReviews);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };





  const handleImageUpload = async (e,type,ind) => {

    if(type == "img"){
      try {
        const file = e.target.files[0];
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
        let inputData = section3?.map(item => ({ ...item }));
        inputData[ind][type] = imageData.imageUrl;
        setSection3(inputData);
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    }

    else{
      let inputData = section3?.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection3(inputData);
    }
  

};

  return (
    <div className="container row" style={{marginTop : "50px"}}>
      {section3?.map?.((item, index) =>
      <div className='animate__animated animate__fadeInUp col-4' >
                <div key={item?._id} className="review-loop">
          <img  src={item?.img} alt={item?.name} />
          <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,"img",index)}
      style={{width : "95px"}}
    />
          <div className='review-person-name'>{item?.name}
          <input 
                    type='text' 
                    defaultValue={item?.name} 
                    onChange={(e) => handleImageUpload(e,"name",index)} 
                    className='heading-input' 
                />
          </div>

          <div>Rating : </div>
          <input 
                    type='text' 
                    defaultValue={item?.rating} 
                    onChange={(e) => handleImageUpload(e,"rating",index)} 
                    className='heading-input' 
                />




          <div className='review-person-msg'>{item?.desc}

          <input 
                    type='text' 
                    defaultValue={item?.desc} 
                    onChange={(e) => handleImageUpload(e,"desc",index)} 
                    className='heading-input' 
                />
          </div>

          <div className="logo-container">
            <img  src={"/assets/img/google-icon.webp"} alt="Google Logo" style={{    width: "20px"}} />
            <span style={{color:"#999999",margin: "0 0 0 10px"}}>{item?.time}

            <input 
                    type='text' 
                    defaultValue={item?.time} 
                    onChange={(e) => handleImageUpload(e,"time",index)} 
                    className='heading-input' 
                />
            </span>
          </div>
        </div>
      </div>

      )}

    </div>
    // <div style={{margin: "25px 0 0 0"}} className="elfsight-app-b8902965-364c-48fa-b2e2-911e613d4f21" data-elfsight-app-lazy></div>
  );
}

export default ReviewEdit;
