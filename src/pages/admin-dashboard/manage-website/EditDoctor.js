import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import BASE_URL from '../../../Config';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function EditDoctor() {
    // State variables to store form data
    const [name, setName] = useState();
    const [image, setImage] = useState(null); // For image upload
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [degree, setDegree] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [experience, setExperience] = useState('');
    const [language, setLanguage] = useState('');
    const [expertise, setExpertise] = useState([""]);
    const [description, setDescription] = useState('');
    const [awards, setAwards] = useState();
    const [qualification, setQualification] = useState('');

    const [isSpec, setIsSpec] = useState(false);

    const [isImg, setIsImg] = useState(false);
    const [isImg1, setIsImg1] = useState(false);

    const [loading, setLoading] = useState(false);
    const params = useParams();


    const handlesetAwardsChange = (value,i) => {
      const file = value.target.files[0];
      let input = awards;
      input[i] = file;
      setAwards(input);
      setIsImg1(true);
    };  
    const addsetAwardsChange = () => {
      setAwards([...awards,""]);
    };  
    const removesetAwardstChange = (ind) => {
      let input = awards;
      let new1 = input?.filter((e,i) => i != ind);
      setAwards(new1);
    };  



    useEffect(() => {
      const fetchDoctor = async () => {
        try {
          // console.log({
          //     fullname:name,email, mobile:phone, speciality:qualification, location:address,description:'null',profileImage: responseData.imageUrl, coverImage:'cover'
           
          //  })
        const response = await fetch(
          `${BASE_URL}/admin/get-doctor/${params?.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
       
        if (!response.ok) {
          
          toast.error('Some thing went wrong')
          // You can update state or display error messages accordingly
          return;
        }

        const data = await response.json();
        console.log("kjojowe",data)
        
        setName(data?.data?.name)
        setEmail(data?.data?.email)
        setImage(data?.data?.image)
        setPhone(data?.data?.phone)
        setAddress(data?.data?.address)
        setDegree(data?.data?.degree)      
        setSpecialist(data?.data?.specialist) 
        setExperience(data?.data?.experience)
        setLanguage(data?.data?.language)
        setExpertise(data?.data?.expertise)
        setDescription(data?.data?.description)
        setQualification(data?.data?.qualification) 
        setAwards(data?.data?.awards)
        setIsSpec(data?.data?.isSpec)
        // toast.error('Network Error')
    
      } finally {
        setLoading(false); // Hide loader regardless of success or failure
      }
      }
      fetchDoctor()
    },[params?.id])
   
    const handlesetExpertiseChange = (value,i) => {
      console.log("sjdijer",value,i)
      let input = expertise;
      input[i] = value;
      setExpertise(input);
    };  
    const addsetExpertiseChange = () => {
      setExpertise([...expertise,""]);
    };  
    const removesetExpertisetChange = (ind) => {
      let input = expertise;
      let new1 = input?.filter((e,i) => i != ind);
      setExpertise(new1);
    };  

      const validateForm = () => {
    if (
      !name ||
      !email ||
      !phone ||
      !specialist ||
      !address ||
      !description ||
      !image ||
      !degree ||
      !experience ||
      !language ||
      !expertise ||
      !description ||
      !qualification
    ) {
      toast.error("All fields are required.");
      return false;
    }

    return true;
  };
  
    // Function to handle form submission
    const handleSubmit =async (e) => {
        // toast("test")
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        if(true){
          let imageArr = null
          try {
            if(isImg1){
              imageArr= [];
              for (let index = 0; index < awards?.length; index++) {
                const element = awards[index];
                if(!element) continue;
                const formData = new FormData();
                formData.append('image', element)
                
                const imageResponse = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
                  method: 'POST',
                  body: formData
                });
          
                if (!imageResponse.ok) {
                  toast.error("Please logout and login again with valid credentials.");
                  throw new Error('Network response was not ok');
                }
                const imageData = await imageResponse.json();
                imageArr.push(imageData.imageUrl)
              }
            }


            let imgVal = ""
            if(isImg){
              const formData = new FormData();
              formData.append('image', image);
            
              const response = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
                method: 'POST',
              
                body: formData
              });
            
              if (!response.ok) {
                throw new Error('Network response was not ok');
              } else {
                const responseData = await response.json();
                imgVal = responseData?.imageUrl
                console.log(responseData);
              }  
            }
            else imgVal = image;

            let newData = {
              name: name,
              email,
              phone: phone,
              specialist: specialist,
              address: address,
              description: description,
              image: imgVal,
              degree,
              experience,
              language,
              expertise,
              description,
              qualification,
              isSpec,
              id : params?.id
            }
            if(imageArr || imageArr?.length > 0){
              newData["awards"] = imageArr
            }
           
              try {
                  // console.log({
                  //     fullname:name,email, mobile:phone, speciality:qualification, location:address,description:'null',profileImage: responseData.imageUrl, coverImage:'cover'
                   
                  //  })
                const response = await fetch(
                  `${BASE_URL}/admin/edit-doctor`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData)
                  }
                );
               
                if (!response.ok) {
                  
                  toast.error('Some thing went wrong')
                  // You can update state or display error messages accordingly
                  return;
                }
             
              
               
                toast.success("Doctor Edit Successfully!");

                // Perform actions after successful login, such as updating state or redirecting
              } catch (error) {
                toast.error('Network Error')
            
              } finally {
                setLoading(false); // Hide loader regardless of success or failure
              }
            
              setLoading(false);
          } catch (error) {
              toast.error("Please logout and login again with valid credentials.")
            console.error('There was a problem with the fetch operation:', error.message);
          }
        }
    };

    // Function to handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // Handle file upload logic here
        console.log('Image uploaded:', file);
        setIsImg(true)
        setImage(file);
    };

    return (
      <AdminNavbar>
        <div className="add-doctor-container">
          <h2>Add Doctor</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
            />

            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              // required
            />
            

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />

            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              
            />

            <label htmlFor="qualification">Degree:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={degree}
              onChange={(e) => setDegree(e.target.value)}
              
            />

            <label htmlFor="qualification">Specialist:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
              
            />

            <label htmlFor="qualification">Experience:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={experience}
              onChange={(e) => setExperience(e.target.value)}
              
            />

            <label htmlFor="qualification">Language:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={language}
              onChange={(e) => setLanguage(e.target.value)}
              
            />
            <div className='d-flex' style={{justifyContent : "space-between"}}>
            <label htmlFor="qualification">Expertise:</label>
            <div
                className="inputBoxCust3"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  margin: "0 0 0 10px",
                }}
                onClick={addsetExpertiseChange}
              >
                +
              </div>
            </div>

            {expertise?.map((val,ind) => {
              return (
                <div className='d-flex'>
                  <input
                    type="text"
                    id="qualification"
                    defaultValue={val}
                    onChange={(e) => handlesetExpertiseChange(e.target.value,ind)}
                    
                  />
                                      <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "10%",
                      }}
                    >
                      {" "}
                      <div
                        className="inputBoxCust3"
                        style={{
                          cursor: "pointer",
                          textAlign: "center",
                          margin: "0 0 0 10px",
                        }}
                        onClick={() => removesetExpertisetChange(ind)}
                      >
                        -
                      </div>
                    </div>
                </div>
              );
            })}

            <label htmlFor="qualification">Description:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />

<div className='d-flex'>
            <label htmlFor="isSpec">Show to specialist dashboard:</label>
            <input
              type="checkbox"
              style={{margin:"0 0 0 20px"}}
              id="isSpec"
              checked={isSpec}
              onChange={(e) => setIsSpec(e.target.checked)}
            />
            </div>

<div className="d-flex" style={{ justifyContent: "space-between" }}>
              <label htmlFor="qualification">Awards:</label>
              <div
                className="inputBoxCust3"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  margin: "0 0 0 10px",
                }}
                onClick={addsetAwardsChange}
              >
                +
              </div>
            </div>

            {awards?.map((val, ind) => {
              return (
                <div className="d-flex">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handlesetAwardsChange(e,ind)}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "10%",
                    }}
                  >
                    {" "}
                    <div
                      className="inputBoxCust3"
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        margin: "0 0 0 10px",
                      }}
                      onClick={() => removesetAwardstChange(ind)}
                    >
                      -
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <label htmlFor="qualification">Awards:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={awards}
              onChange={(e) => setAwards(e.target.value)}
            /> */}

            <button type="submit">{loading ? "Please wait" : true ? "Edit" : "Submit"}</button>
          </form>
        </div>
      </AdminNavbar>
    );
}
