import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar";
import BASE_URL from "../../../Config";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../user-profile/Address.module.css";
import ReactQuill from "react-quill";

export default function News({ setDoctor, doctor }) {
  // State variables to store form data
  const [name, setName] = useState(doctor?.name || "");
  const [image, setImage] = useState(doctor?.image || null); // For image upload
  const [phone, setPhone] = useState(doctor?.phone || "");
  const [email, setEmail] = useState(doctor?.email || "");


  const [title, setTitle] = useState(doctor?.title || "");
  const [desc, setDesc] = useState(doctor?.desc || "");
  const [authorName, setAuthorName] = useState(doctor?.authorName || "");
  const [authorDesignation, setAuthorDesignation] = useState(doctor?.authorDesignation || "");
  const [authorImg, setAuthorImg] = useState(doctor?.authorImg || "");
  const [img, setImg] = useState(doctor?.img || "");
  const [slug, setSlug] = useState(doctor?.slug || "");
  const [tags, setTags] = useState(doctor?.tags || []);
  const [id, setId] = useState(doctor?.id || "");








  const [edit, setEdit] = useState(false);
  const [specialist, setSpecialist] = useState(doctor?.specialist || "");
  const [experience, setExperience] = useState(doctor?.experience || "");
  const [language, setLanguage] = useState(doctor?.language || "");
  const [expertise, setExpertise] = useState(doctor?.expertise || [""]);
  const [password, setPassword] = useState("");
  const [awards, setAwards] = useState([""]);
  const [qualification, setQualification] = useState(
    doctor?.qualification || ""
  );
  const [isSpec, setIsSpec] = useState(0);

  const [isImg, setIsImg] = useState(false);

  const [loading, setLoading] = useState(false);

  const addsetExpertiseChange = () => {
    setTags([...tags,""]);
  };  

  const handlesetExpertiseChange = (value,i) => {
    console.log("sjdijer",value,i)
    let input = [...tags];
    input[i] = value?.toLowerCase();
    setTags(input);
  };  

  const removesetExpertisetChange = (ind) => {
    let input = tags;
    let new1 = input?.filter((e,i) => i != ind);
    setTags(new1);
  };  
  const handlesetAwardsChange = (value, i) => {
    const file = value.target.files[0];
    let input = awards;
    input[i] = file;
    setAwards(input);
  };
  const addsetAwardsChange = () => {
    setAwards([...awards, ""]);
  };
  const removesetAwardstChange = (ind) => {
    let input = awards;
    let new1 = input?.filter((e, i) => i != ind);
    setAwards(new1);
  };
  const [permissions, setPermissions] = useState({
    hairTest: 0,
    doctor: 0,
    patient: 0,
    website: 0,
    coupon: 0,
    orders: 0,
    contactus: 0,
    product: 0,
    reviews: 0,
    admin: 0,
  });

  const [addresses, setAddresses] = useState({});
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));

  useEffect(() => {
    fetch(`${BASE_URL}/admin/getNews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUserData?.logedInUser?.accessToken,
      },
      //   body: JSON.stringify({ userId: storedUserData?.logedInUser?.user?._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddresses(data.data);
        setDesc(data.data?.desc)

      })
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  const validateForm = () => {
    console.log("lmorfk",title,authorName,desc,authorImg,authorDesignation,img,slug)
    if (!desc) {
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
    let imageArr = [];
    console.log("moekrokf", awards);

    try {
        let url = `${BASE_URL}/admin/addNews`
        let method = "POST";
        let input = {
          title,
          desc,
authorName,
authorDesignation,
authorImg,
img,
slug,
tags
          }
            input["id"] = addresses?._id;
            method = "POST"
      const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: storedUserData?.logedInUser?.accessToken,
          },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        toast.error("Please logout and login again with valid credentials.");
        // You can update state or display error messages accordingly
        return;
      }

      toast.success(
        "News Added Successfully!"
      );
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setIsSpec(0);
      // Perform actions after successful login, such as updating state or redirecting
      fetch(`${BASE_URL}/admin/getNews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: storedUserData?.logedInUser?.accessToken,
        },
        //   body: JSON.stringify({ userId: storedUserData?.logedInUser?.user?._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAddresses(data.data);
          setDesc(data.data?.desc)
        })
        .catch((error) => console.error("Error fetching addresses:", error));
    } catch (error) {
      toast.error("Please logout and login again with valid credentials.");
    } finally {
      setLoading(false); // Hide loader regardless of success or failure
    }
  };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle file upload logic here
    console.log("Image uploaded:", file);
    setIsImg(true);
    setImage(file);
  };

  return (
    <AdminNavbar>
      <div className="d-flex admin-right-side-width">
        {/* <div className="admin-1">
          <ul className={styles.addressList}>
            {addresses?.map((address, index) => (
              <li key={index} className={styles.addressItem}>

                <p>
                  <strong>Description:</strong> {address?.desc}
                </p>
                <button
                  style={{ margin: "0 0 0 5px" }}
                  onClick={() => {
                    setDesc(address?.desc);
                    setImg(address?.img)
                    setId(address?._id)
                    setEdit(true);
                  }}
                  className={styles.button}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="add-doctor-container admin-1" >
          <h2>Add News</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <input
              value={desc}
              onChange={(e) => setDesc(e?.target?.value)}
              required
            />
          </div>





{/* <label htmlFor="img">Image:</label>
            <input
              type="file"
              id="img"
            //   value={img}
              onChange={async (e) => {
                let element = e.target.files?.[0];
                let formData = new FormData();
                formData.append('image', element)
                
                let imageResponse = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
                  method: 'POST',
                  body: formData
                });
            
                if (!imageResponse.ok) {
                  toast.error("Please logout and login again with valid credentials.");
                  throw new Error('Network response was not ok');
                }
                let imageData = await imageResponse.json();
                setImg(imageData.imageUrl)
              }}
            //   required
            />
            {img ? <img src = {img}/> : <></>} */}




            <button type="submit">
              {loading ? "Please wait" : doctor ? "Edit" : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </AdminNavbar>
  );
}
