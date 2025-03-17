import React, { useEffect, useState } from "react";
import AdminNavbar from "../../AdminNavbar";
import BASE_URL from "../../../../Config";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../../user-profile/Address.module.css";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";

export default function BlogCategory({ setDoctor, doctor }) {
  // State variables to store form data
  const [name, setName] = useState(doctor?.name || "");

  const [title, setTitle] = useState(doctor?.title || "");
  const [btnName, setBtnName] = useState(doctor?.btnName || "");


  const [btnLink, setBtnLink] = useState(doctor?.btnLink || "");


  const [authorImg, setAuthorImg] = useState(doctor?.authorImg || "");
  const [img, setImg] = useState(doctor?.img || "");
  const [slug, setSlug] = useState(doctor?.slug || "");
  const [tags, setTags] = useState(doctor?.tags || []);
  const [id, setId] = useState(doctor?.id || "");
  const [seoMetaTitle, setSeoMetaTitle] = useState(doctor?.seoMetaTitle || "");
  const [seoMetaDesc, setSeoMetaDesc] = useState(doctor?.seoMetaDesc || "");
  const [img2, setImg2] = useState(doctor?.img2 || []);
  const [img2Link, setImg2Link] = useState(doctor?.img2Link || []);

  const [blogData, setBlogData] = useState(
    doctor?.blogData || [
      {
        img: "",
        desc: "",
      },
    ]
  );

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




  const [addresses, setAddresses] = useState([]);
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));

  useEffect(() => {
    fetch(`${BASE_URL}/admin/allBlogCategory`, {
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
      })
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  const validateForm = () => {
    if (
      !title ||
      !name ||
      !img ||
      !btnName || !btnLink || !img2Link || 
      !img2 
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
    if (!edit && !validateForm()) return;
    setLoading(true);
    let imageArr = [];
    console.log("moekrokf", awards);

    try {
      let url = `${BASE_URL}/admin/addBlogCategory`;
      let method = "POST";
      let input = {
        title,
        name,
        btnName,
        btnLink,
        img2Link,
        img,
        img,
        img2,
      };
      if (edit) {
        input["id"] = id;
        method = "POST";
      } 
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

      if(edit) toast.success("Blog category edit Successfully!");
      else toast.success("Blog category added Successfully!");
      setName("");
      setTitle("");
      setImg("");
      setImg2("");
      setBtnName("");
      setBtnLink("")
      setImg2Link("")
      // Perform actions after successful login, such as updating state or redirecting
      fetch(`${BASE_URL}/admin/allBlogCategory`, {
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
        })
        .catch((error) => console.error("Error fetching addresses:", error));
    } catch (error) {
      toast.error("Please logout and login again with valid credentials.");
    } finally {
      setLoading(false); // Hide loader regardless of success or failure
    }
  };



  return (
    <AdminNavbar>
      <div className="d-flex admin-right-side-width">
        <div className="blog-2">
          <ul className={styles.addressList}>
            {addresses?.map((address, index) => (
              <li key={index} className={styles.addressItem}>
                  <p>
                  <strong>Name:</strong> {address?.name}
                </p>
                <p>
                  <strong>Title:</strong> {address?.title}
                </p>
                {/* <p>
                  <strong>Description:</strong> {address?.desc}
                </p> */}
                <p>
                  <strong>btn Name:</strong> {address?.btnName}
                </p>
                {/* <button onClick={() => handleEdit(address)} className={styles.button}>Edit</button> */}
                <button
                  style={{ margin: "0 0 0 5px" }}
                  onClick={() => {
                    setTitle(address?.title);
                    setName(address?.name);
                    setBtnName(address?.btnName);
                    setBtnLink(address?.btnLink || "")
                    setImg(address?.img);
                    setImg2(address?.img2);
                    setImg2Link(address?.img2Link || "")
                    setId(address?._id)
                    setEdit(true)
                  }}
                  className={styles.button}
                >
                  Edit
                </button>
                <button
                  style={{ margin: "0 0 0 5px",background: "Red" }}
                  onClick={async () => {
                    setLoading(true);
                    let imageArr = [];
                    console.log("moekrokf", awards);
                
                    try {
                        let url = `${BASE_URL}/admin/addBlogCategory`
                        let method = "POST";
                        let input = {
                          id : address?._id,
                          isDelete : true
                          }
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
                        "Blog Category DELETE Successfully!"
                      );
                      setAddresses([]);
                      // Perform actions after successful login, such as updating state or redirecting
                      fetch(`${BASE_URL}/admin/allBlogCategory`, {
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
                        })
                        .catch((error) => console.error("Error fetching addresses:", error));
                    } catch (error) {
                      toast.error("Please logout and login again with valid credentials.");
                    } finally {
                      setLoading(false); // Hide loader regardless of success or failure
                    }                  }}
                  className={styles.button}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="add-doctor-container admin-1">
          <h2>Add Blog Category</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Category Name:</label>
            <input
              type="text"
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              //   required
            />
            <label htmlFor="img">Title Image:</label>
            <input
              type="file"
              id="img"
              //   value={img}
              onChange={async (e) => {
                let element = e.target.files?.[0];
                let formData = new FormData();
                formData.append("image", element);

                let imageResponse = await fetch(
                  `${BASE_URL}/hair-tests/upload-image`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                if (!imageResponse.ok) {
                  toast.error(
                    "Please logout and login again with valid credentials."
                  );
                  throw new Error("Network response was not ok");
                }
                let imageData = await imageResponse.json();
                setImg(imageData.imageUrl);
              }}
              //   required
            />
            {img ? <img src={img} /> : <></>}

            <label htmlFor="title">Title Name:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              //   required
            />


          <label htmlFor="btnName">Btn Name:</label>
            <input
              type="text"
              id="btnName"
              value={btnName}
              onChange={(e) => setBtnName(e.target.value)}
              //   required
            />

<label htmlFor="btnLink">Btn link:</label>
            <input
              type="text"
              id="btnLink"
              value={btnLink}
              onChange={(e) => setBtnLink(e.target.value)}
              //   required
            />
            

        <label htmlFor="img">Poster Image:</label>
            <input
              type="file"
              id="img"
              //   value={img}
              onChange={async (e) => {
                let element = e.target.files?.[0];
                let formData = new FormData();
                formData.append("image", element);

                let imageResponse = await fetch(
                  `${BASE_URL}/hair-tests/upload-image`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                if (!imageResponse.ok) {
                  toast.error(
                    "Please logout and login again with valid credentials."
                  );
                  throw new Error("Network response was not ok");
                }
                let imageData = await imageResponse.json();
                setImg2(imageData.imageUrl);
              }}
              //   required
            />
            {img2 ? <img src={img2} /> : <></>}

            <label htmlFor="img2Link">Poster link:</label>
            <input
              type="text"
              id="img2Link"
              value={img2Link}
              onChange={(e) => setImg2Link(e.target.value)}
              //   required
            />


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
