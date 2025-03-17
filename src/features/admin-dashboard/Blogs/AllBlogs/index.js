import React, { useEffect, useState } from "react";
import AdminNavbar from "../../AdminNavbar";
import BASE_URL from "../../../../Config";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../../user-profile/Address.module.css";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Hourglass } from 'react-loader-spinner';

export default function AllBlogs({ setDoctor, doctor }) {
  // State variables to store form data
  const [name, setName] = useState(doctor?.name || "");
  const [image, setImage] = useState(doctor?.image || null); // For image upload
  const [phone, setPhone] = useState(doctor?.phone || "");
  const [email, setEmail] = useState(doctor?.email || "");
  const [loader,setLoader] = useState(false)

  const [title, setTitle] = useState(doctor?.title || "");
  const [desc, setDesc] = useState(doctor?.desc || "");
  const [authorName, setAuthorName] = useState(doctor?.authorName || "");
  const [authorDesignation, setAuthorDesignation] = useState(doctor?.authorDesignation || "");
  const [authorImg, setAuthorImg] = useState(doctor?.authorImg || "");
  const [img, setImg] = useState(doctor?.img || "");
  const [slug, setSlug] = useState(doctor?.slug || "");
  const [tags, setTags] = useState(doctor?.tags || []);
  const [id, setId] = useState(doctor?.id || "");
  const [seoMetaTitle, setSeoMetaTitle] = useState(doctor?.seoMetaTitle || "");
  const [seoMetaDesc, setSeoMetaDesc] = useState(doctor?.seoMetaDesc || "");

  const navigate = useNavigate();


  const [blogData, setBlogData] = useState(doctor?.blogData || [
    {
      img : "",
      desc : ""
    }
  ]);







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

  const addsBlogDataeChange = () => {
    setBlogData([...blogData,{img :"",desc :""}]);
  };  
  const addsetExpertiseChange = () => {
    setTags([...tags,""]);
  };  

  const handlesetExpertiseChange = (value,i) => {
    console.log("sjdijer",value,i)
    let input = [...tags];
    input[i] = value?.toLowerCase();
    setTags(input);
  };  
  const handleBlogDataChange = (value,i,type) => {
    console.log("sjdijer",value,i)
    let input = [...blogData];
    input[i][type] = value;
    setBlogData(input);
  };  

  const removesetExpertisetChange = (ind) => {
    let input = tags;
    let new1 = input?.filter((e,i) => i != ind);
    setTags(new1);
  };  

  const removeBlogDataChange = (ind) => {
    let input = [...blogData];
    let new1 = input?.filter((e,i) => i != ind);
    setBlogData(new1);
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

  const [addresses, setAddresses] = useState([]);
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));

  const [blogCount,setBlogCount] = useState(0)

  const [offset,setOffset] = useState(0)
  const [limit,setLimit] = useState(5)
  const [search,setSearch] = useState("")



  const fetchProducts = async () => {
    setLoader(true);
    fetch(`${BASE_URL}/admin/allBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUserData?.logedInUser?.accessToken,
      },
        body : JSON.stringify({offset,limit,search})
    })
      .then((response) => response.json())
      .then((data) => {
        setLoader(false)
        setAddresses(data.data);
        setBlogCount(data.message);

      })
      .catch((error) =>{
        setLoader(false)
         console.error("Error fetching addresses:", error)});
  }


    useEffect(() => {

      let timeout;
           if (search == "") {
            fetchProducts()
          }
          else {
            timeout = setTimeout(() => {
              fetchProducts()
            }, 500);
            return () => {
              clearTimeout(timeout);
            };  
          }
      }, [search,offset]);

  const validateForm = () => {
    console.log("lmorfk",title,authorName,desc,authorImg,authorDesignation,img,slug)
    if (!title || blogData?.length < 1 || !category || !authorName || !authorDesignation || !authorImg || !img || !slug) {
      toast.error("All fields are required.");
      return false;
    }

    return true;
  };



  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle file upload logic here
    console.log("Image uploaded:", file);
    setIsImg(true);
    setImage(file);
  };

  const [category,setCategory] = useState()
  const content1 = useSelector((state) => state.content?.config);


  return (
    <AdminNavbar>
      <div className="d-flex admin-right-side-width">
      <div className="blog-1">
        <div className="d-flex" style={{gap : "50px",padding : "30px"}}>
        <label htmlFor="slug">Search:</label>
            <input
              type="text"
              id="slug"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{width : "100%"}}
            //   required
            />
        </div>
     { loader ?         <div className="loader-in-page" style={{height : "400px"}}>
                <Hourglass type="Puff" color="#00BFFF" height={50} width={50} />
              </div> :         

          <ul className={styles.addressList}>
            {addresses?.map((address, index) => (
              <li key={index} className={styles.addressItem}>
                <p>
                  <strong>Title:</strong> {address?.title}
                </p>
                {/* <p>
                  <strong>Description:</strong> {address?.desc}
                </p> */}
                <p>
                  <strong>author Name:</strong> {address?.authorName}
                </p>
                {/* <p>
                  <strong>author Designation:</strong> {address?.authorDesignation}
                </p>
                <p>
                  <strong>slug</strong> {address?.slug}
                </p>
                <p>
                <strong>tags:</strong>
                  {
                    address?.tags?.map((e) => {return <div>{e}</div>})
                  }
                </p> */}
                {/* <button onClick={() => handleEdit(address)} className={styles.button}>Edit</button> */}
                <button
                  style={{ margin: "0 0 0 5px" }}
                  onClick={() => {
                    navigate(`/editBlogs/${address?.slug}`)
                    // setTitle(address?.title);
                    // setDesc(address?.desc);
                    // setAuthorImg(address?.authorImg);
                    // setAuthorName(address?.authorName);
                    // setAuthorDesignation(address?.authorDesignation);
                    // setSlug(address?.slug)
                    // setTags(address?.tags || [])
                    // setBlogData(address?.blogData || [])
                    // setImg(address?.img)
                    // setId(address?._id)
                    // setSeoMetaDesc(address?.seoMetaDesc||"")
                    // setSeoMetaTitle(address?.seoMetaTitle||"")
                    // setCategory(address?.category||"")
                    // setEdit(true);
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
        let url = `${BASE_URL}/admin/addBlog`
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
        "Blog DELETE Successfully!"
      );
      setAddresses([]);
      // Perform actions after successful login, such as updating state or redirecting
      fetch(`${BASE_URL}/admin/allBlog`, {
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
                  {loading ? "loading":"Delete"}
                </button>
              </li>
            ))}
          </ul>
       }
 </div>
      </div>

      <div className="reactPagination" style={{display: "flex",
    justifyContent: "end"}}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={(event) => {
              console.log("emkrkor",event.selected)
              setOffset(event.selected)
            }}
            pageCount={  blogCount % 5 === 0
    ? blogCount / 6 
    : Math.floor(blogCount / 5) + 1}
            // forcePage={selectedPage} 
            previousLabel="<"
            renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>


      <ToastContainer position="bottom-right" />
    </AdminNavbar>
  );
}
