import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "../AdminNavbar";
import BASE_URL from "../../../Config";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../user-profile/Address.module.css";
import ReactQuill,{ quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';



const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, false] }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background', 'align'
];

export default function Blogs({ setDoctor, doctor }) {
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
  const [canonical, setCanonical] = useState(doctor?.canonical || "");
  const [tags, setTags] = useState(doctor?.tags || []);
  const [id, setId] = useState(doctor?.id || "");
  const [seoMetaTitle, setSeoMetaTitle] = useState(doctor?.seoMetaTitle || []);
  const [seoMetaDesc, setSeoMetaDesc] = useState(doctor?.seoMetaDesc || "");
  const [isActive, setIsActive] = useState(doctor?.isActive || true);



  const [blogData, setBlogData] = useState(doctor?.blogData || [
    {
      desc : "",
      link : ""
    }
  ]);

  const [blogDataTemp, setBlogDataTemp] = useState(doctor?.blogData || [
    {
      desc : "",
      link : ""
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
    setBlogData([...blogData,{link :"",desc :""}]);
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

  const editorRef = useRef(null);

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

  const [categories,setCategoies] = useState([]);
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
        setCategoies(data.data);
      })
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);


  useEffect(() => {
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
  }, []);

  const validateForm = () => {
    console.log("lmorfk",title,authorName,desc,authorImg,authorDesignation,img,slug,canonical)
    if (!title || blogData?.length<1 || !category || !authorName || !authorDesignation || !authorImg || !slug || !canonical) {
      toast.error("All fields are required.");
      return false;
    }

    return true;
  };

  const params = useParams();

  useEffect(() => {
    console.log("deowjo",params?.id)
    if(params?.id){
      fetch(`${BASE_URL}/admin/getBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id : params?.id})
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("smkifnr",data?.data)
          setTitle(data?.data?.title);
          setDesc(data?.data?.desc);
          setAuthorImg(data?.data?.authorImg);
          setAuthorName(data?.data?.authorName);
          setAuthorDesignation(data?.data?.authorDesignation);
          setSlug(data?.data?.slug)
          setCanonical(data?.data?.canonical)
          setIsActive(data?.data?.isActive || false)
          setTags(data?.data?.tags || [])
          setBlogData(data?.data?.blogData || [])
          setBlogDataTemp(data?.data?.blogData || [])
          setImg(data?.data?.img)
          setId(data?.data?._id)
          setSeoMetaDesc(data?.data?.seoMetaDesc||"")
          setSeoMetaTitle(data?.data?.seoMetaTitle|| [])
          setCategory(data?.data?.category||"")
          setEdit(true);
        })
        .catch((error) => console.error("Error fetching addresses:", error));
    }
  }, [params?.id]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // toast("test")
    e.preventDefault();
    if (!edit && !validateForm()) return;
    setLoading(true);
    let imageArr = [];
    console.log("moekrokf", awards);

    try {
        let url = `${BASE_URL}/admin/addBlog`
        let method = "POST";
        let input = {
          title,
          desc,
          authorName,
          authorDesignation,
          authorImg,
          img,
          slug,
          metaCanonical: canonical,
          tags,
          blogData,
          seoMetaTitle,
          seoMetaDesc,
          category,
          isActive
          }
        if(edit){
            input["id"] = id;
            method = "POST"
        }
        else{
            input["password"] =  password;
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

      if(edit) toast.success(
        "Blog edit Successfully!"
      );
      else toast.success(
        "Blog Added Successfully!"
      );
      // setTitle("");
      // setSlug("");
      setIsActive(true)
      setPassword("");
      setIsSpec(0);
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

  const [category,setCategory] = useState()
  const content1 = useSelector((state) => state.content?.config);


  const handleImageUpload = (blobInfo, success, failure) => {
    const reader = new FileReader();
    reader.readAsDataURL(blobInfo.blob());
    reader.onloadend = () => {
      success(reader.result);  // Embed as base64 directly
    };
    reader.onerror = () => {
      failure("Image upload failed.");
    };
  }


  useEffect(() => {
    // Ensure editorRef is not null before accessing
    if (editorRef.current) {
      console.log("Editor is initialized:", editorRef.current);
    }
  }, []);

  return (
    <AdminNavbar>
      <div className="d-flex admin-right-side-width">

        <div className="add-doctor-container blog-1" >
          <h2>Add Blog</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Name:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            //   required
            />
          {/* <div className="form-group">
            <label>Description:</label>

                        <ReactQuill
            modules={modules}
            formats={formats}
              value={desc}
              onChange={(e) => setDesc(e)}
              required
          />
          </div> */}


<div className="d-flex" >
              <label htmlFor="qualification">Description:</label>
              {/* <div
                className="inputBoxCust3"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  margin: "0 0 0 10px",
                }}
                onClick={addsBlogDataeChange}
              >
                +
              </div> */}
            </div> 



            {blogData?.map((val, ind) => {
              let initial = blogDataTemp[ind];
              console.log("mijiojo",initial)
              return (
                <div className="d-flex flex-column" style={{marginTop : "60px"}} >
                  <input 
                    type="text"
                    value={val?.link}
                    onChange={(e) => {
                      handleBlogDataChange(e?.target?.value, ind,"link")
                    }}

                    placeholder="Enter hastag link"
                  />
                  <div className="d-flex">
            {/* <ReactQuill
            value={val?.desc}
            modules={modules}
            formats={formats}
            onChange={(e) =>{
              console.log("zjdojfoje",e)
              handleBlogDataChange(e, ind,"desc")
            }
            }   
          /> */}

<Editor
        apiKey="sgccfkakft4ykadp0cni6vkwe35np82gv4ak0y208ius3mk9"  // Optional but recommended
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={val?.desc}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            // Core editing features
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons','textcolor','textcolor', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Nov 21, 2024:
            'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
            // Early access to document converters
            'importword', 'exportword', 'exportpdf','preview','code'
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | preview code',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          allow_html_in_named_anchor: true,
        images_upload_handler: handleImageUpload, // Custom handler
         automatic_uploads: false, 
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
          exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
          exportword_converter_options: { 'document': { 'size': 'Letter' } },
          importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline',	'defaults': 'inline', } },
        }}
        onEditorChange={(e) =>{
          console.log("zjdojfoje",e)
          handleBlogDataChange(e, ind,"desc")
        } 
        } 
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
                      onClick={() => removeBlogDataChange(ind)}
                    >
                      -
                    </div>
                  </div>
                </div>
                </div>

              );
            })} 

            <div style={{    marginTop: "60px"}}>
            <label htmlFor="authorName">Author Name:</label>
            <ReactQuill
              type="text"
              id="authorName"
              modules={modules}
              formats={formats}
                value={authorName}
              onChange={(e) => setAuthorName(e)}
            //   required
            />
            </div>


            <div className="d-flex flex-column" style={{    marginTop: "60px"}}>
            <label htmlFor="authorDesignation">Author Description:</label>
            <ReactQuill
              type="text"
              id="authorDesignation"
              modules={modules}
              formats={formats}
              value={authorDesignation}
              onChange={(e) => setAuthorDesignation(e)}
            //   required
            />
            </div>



<label htmlFor="authorImg">Author Image:</label>
            <input
              type="file"
              id="authorImg"
            //   value={authorImg}
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
              setAuthorImg(imageData.imageUrl)
            }}            //   required
            />
            {authorImg ? <img src = {authorImg}/> : <></>}

<label htmlFor="img">Blog Image:</label>
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
            {img ? <img src = {img}/> : <></>}

<label htmlFor="slug">slug:</label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            //   required
            />

<label htmlFor="canonical">canonical:</label>
            <input
              type="text"
              id="canonical"
              value={canonical}
              onChange={(e) => setCanonical(e.target.value)}
            />
            <div className="d-flex" style={{gap : "30px"}}>

<label htmlFor="isActive">Publish:</label>
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            //   required
            />
            </div>



<div className="d-flex" >
<label htmlFor="seoMetaTitle">SEO Meta Title:</label>
              <div
                className="inputBoxCust3"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  margin: "0 0 0 10px",
                }}
                onClick={() => {
                  setSeoMetaTitle([...seoMetaTitle,""]);
                }}
              >
                +
              </div>
            </div>

            {seoMetaTitle?.map((val, ind) => {
              return (
                <div className="d-flex">
                  <input
                    type="text"
                    id="qualification"
                    value={val}
                    style={{width: "50%"}}
                    onChange={(e) =>{
                      let value = e.target.value
                      console.log("sjdijer",value,ind)
                      let input = [...seoMetaTitle];
                      input[ind] = value;
                      setSeoMetaTitle(input);
                    }
                    }
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
                      onClick={() =>{ 
                        let input = seoMetaTitle;
                        let new1 = input?.filter((e,i) => i != ind);
                        setSeoMetaTitle(new1);
                      }}
                    >
                      -
                    </div>
                  </div>
                </div>
              );
            })}

<label htmlFor="slug">SEO Meta Desc:</label>
            <input
              type="text"
              id="seoMetaDesc"
              value={seoMetaDesc}
              onChange={(e) => setSeoMetaDesc(e.target.value)}
            //   required
            />
<label htmlFor="Category">Category</label>
<div className="d-flex">
                  {/* <input
                    type="text"
                    id="category"
                    value={category}
                    style={{width: "50%"}}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  /> */}
                  <select 
                  style={{
                    margin: "13px 0",
                    width: "16%",
                    padding: "11px"
                  }}
                  onChange={(e) =>
                      {
                        console.log("kosdofkope",e.target.value)
                        setCategory(e.target.value)
                      }
                    }
                    value={category}
                    >
                      <option disabled={true}>Select</option>

                      {
                      categories?.map((e) => {
                        return (
                          <option value={e?.name}>{e?.name}</option>
                        )
                      })
                    }
                    </select>
                </div>




          <div className="d-flex" >
              <label htmlFor="qualification">Filter Tag:</label>
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

            {tags?.map((val, ind) => {
              return (
                <div className="d-flex">
                  <input
                    type="text"
                    id="qualification"
                    value={val}
                    style={{width: "50%"}}
                    onChange={(e) =>
                      handlesetExpertiseChange(e.target.value, ind)
                    }
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



            <button type="submit" disabled={loading}>
              {loading ? "Please wait" : doctor ? "Edit" : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </AdminNavbar>
  );
}
