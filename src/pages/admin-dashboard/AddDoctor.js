import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import BASE_URL from '../../Config';
import { toast, ToastContainer } from 'react-toastify';

export default function AddDoctor({setDoctor,doctor}) {
    // State variables to store form data
    const [name, setName] = useState(doctor?.name||'');
    const [image, setImage] = useState(doctor?.image||null); // For image upload
    const [phone, setPhone] = useState(doctor?.phone||'');
    const [email, setEmail] = useState(doctor?.email||'');
    const [address, setAddress] = useState(doctor?.address||'');
    const [degree, setDegree] = useState(doctor?.degree||'');
    const [specialist, setSpecialist] = useState(doctor?.specialist||'');
    const [experience, setExperience] = useState(doctor?.experience||'');
    const [language, setLanguage] = useState(doctor?.language||'');
    const [expertise, setExpertise] = useState(doctor?.expertise || [""]);
    const [description, setDescription] = useState(doctor?.description||'');
    const [awards, setAwards] = useState(['']);
    const [qualification, setQualification] = useState(doctor?.qualification||'');
    const [isSpec, setIsSpec] = useState(false);

    
    const [isImg, setIsImg] = useState(false);

    const [loading, setLoading] = useState(false);
   
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



    const handlesetAwardsChange = (value,i) => {
      const file = value.target.files[0];
      let input = awards;
      input[i] = file;
      setAwards(input);
    };  
    const addsetAwardsChange = () => {
      setAwards([...awards,""]);
    };  
    const removesetAwardstChange = (ind) => {
      let input = awards;
      let new1 = input?.filter((e,i) => i != ind);
      setAwards(new1);
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
    const handleSubmit = async (e) => {
      // toast("test")
      e.preventDefault();
      if (!validateForm()) return;
      setLoading(true);
      let imageArr = []
      console.log("moekrokf",awards)

      try {
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
            toast.error("Error uploading images.");
            throw new Error('Network response was not ok');
          }
          const imageData = await imageResponse.json();
          imageArr.push(imageData.imageUrl)
        }
  
        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
          method: "POST",

          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const responseData = await response.json();
          console.log(responseData);

          try {
            console.log(responseData?.imageUrl);
            // console.log({
            //     fullname:name,email, mobile:phone, speciality:qualification, location:address,description:'null',profileImage: responseData.imageUrl, coverImage:'cover'

            //  })
            const response = await fetch(`${BASE_URL}/admin/addDoctor`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
                email,
                phone: phone,
                specialist: specialist,
                address: address,
                description: description,
                image: responseData.imageUrl,
                isSpec : isSpec,
                degree,
                experience,
                language,
                expertise,
                description,
                qualification,
                awards:  imageArr
              }),
            });

            if (!response.ok) {
              toast.error("Please logout and login again with valid credentials.");
              // You can update state or display error messages accordingly
              return;
            }

            toast.success(
              "Doctor Added Successfully and doctor's Credentials sent to email !"
            );
            setName("");
            setEmail("");
            setImage(null);
            setPhone("");
            setAddress("");
            setQualification("");

            // Perform actions after successful login, such as updating state or redirecting
          } catch (error) {
            toast.error("Please logout and login again with valid credentials.");
          } finally {
            setLoading(false); // Hide loader regardless of success or failure
          }

          setLoading(false);
        }
      } catch (error) {
        toast.error("Please logout and login again with valid credentials.");
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
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
              required
            />

            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <label htmlFor="qualification">Degree:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            />

            <label htmlFor="qualification">Specialist:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
              required
            />

            <label htmlFor="qualification">Experience:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />

            <label htmlFor="qualification">Language:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
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

            {expertise?.map((val, ind) => {
              return (
                <div className="d-flex">
                  <input
                    type="text"
                    id="qualification"
                    defaultValue={val}
                    onChange={(e) =>
                      handlesetExpertiseChange(e.target.value, ind)
                    }
                    required
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
              required
            />

            <label htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
            <div className='d-flex'>
            <label htmlFor="isSpec">Show to specialist dashboard:</label>
            <input
              type="checkbox"
              style={{margin:"0 0 0 20px"}}
              id="isSpec"
              checked={isSpec}
              onChange={(e) => setIsSpec(e.target.checked)}
              // required
            />
            </div>


            {/* <label htmlFor="qualification">Awards:</label>
            <input
              type="text"
              id="qualification"
              defaultValue={awards}
              onChange={(e) => setAwards(e.target.value)}
            /> */}

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

            <button type="submit">
              {loading ? "Please wait" : doctor ? "Edit" : "Submit"}
            </button>
          </form>
        </div>
        <ToastContainer position="bottom-right" />
      </AdminNavbar>
    );
}
