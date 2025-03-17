
// import React, { useState, useEffect } from 'react';
// import AdminNavbar from '../admin-dashboard/AdminNavbar';
// import BASE_URL from '../../Config';
// import { toast } from 'react-toastify';

// function EditDeleteProduct() {
//   const [products, setProducts] = useState([]);
//   const [editMode, setEditMode] = useState(null);
//   let storedUserData = JSON.parse(localStorage.getItem("User343"));

//   const [editData, setEditData] = useState({
//     name: '',
//     price: '',
//     description: '',
//     image: '',
//     src: '',
//     category: 'single-product',
//     kitItems: [{ isManual: false, productName: '' }]
//   });

//   useEffect(() => {
//     fetch(`${BASE_URL}/admin/product`)
//       .then(response => response.json())
//       .then(data => setProducts(data.message))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   const handleEdit = (index) => {
//     const product = products[index];
//     if (product) {
//       setEditMode(index);
//       setEditData({
//         name: product.name,
//         price: product.price,
//         description: product.description,
//         image: '',  // Reset image
//         src: product.src,  // Add src to editData
//         category: product.kit.length > 0 ? 'kit' : 'single-product',
//         kitItems: product.kit.length > 0 ? product.kit.map(item => ({ isManual: true, productName: item })) : [{ isManual: false, productName: '' }]
//       });
//     }
//   };
// console.log(storedUserData.logedInUser.accessToken)
//   const handleSave = async (index) => {
//     const uploadImageAndSaveProduct = async () => {
//       const formData = new FormData();
//       formData.append('image', editData.image);
  
//       try {
//         console.log('Uploading image:', editData.image);
//         const imageResponse = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
//           method: 'POST',
//           body: formData
//         });
  
//         if (!imageResponse.ok) {
//           toast.error("Error uploading image.");
//           throw new Error('Network response was not ok');
//         }
  
//         const imageData = await imageResponse.json();
//         console.log('Image uploaded successfully:', imageData.imageUrl);
//         return imageData.imageUrl;
//       } catch (error) {
//         toast.error("Error uploading image.");
//         console.error('Error:', error);
//         throw error;
//       }
//     };
  
//     const updateProduct = async (imageUrl = null) => {
//       const data = {
//         id: products[index]?._id,
//         newName: editData.name,
//         newPrice: editData.price,
//         newDescription: editData.description,
//         src: imageUrl || products[index]?.src,
//         categoryName: editData.category,
//         kit: editData.category === 'kit' ? editData.kitItems.map((item) => item.productName) : []
//       };
  
//       try {
//         const response = await fetch(`${BASE_URL}/admin/update-product`, {
//           method: 'PUT',
//           headers: {
//             'Authorization': storedUserData.logedInUser.accessToken,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data),
//         });
  
//         if (response.ok) {
//           const result = await response.json();
//           toast.success("Product updated successfully");
//           setEditMode(null);
//           const updatedProducts = [...products];
//           updatedProducts[index] = result.product;
//           setProducts(updatedProducts);
//         } else {
//           toast.error(`Failed to update product: ${response.statusText}`);
//           console.error('Failed to update product:', response.statusText);
//         }
//       } catch (error) {
//         toast.error("Error updating product.");
//         console.error('Error:', error);
//       }
//     };
  
//     try {
//       if (editData.image) {
//         console.log('Image selected:', editData.image);
//         const imageUrl = await uploadImageAndSaveProduct();
//         await updateProduct(imageUrl);
//       } else {
//         console.log('No image selected, updating product without new image.');
//         await updateProduct();
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   const handleDelete = async (index) => {
//     const productId = products[index]?._id; // Added optional chaining

//     try {
//       const response = await fetch(`${BASE_URL}/admin/deleteproduct`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': storedUserData.logedInUser.accessToken,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({id:productId}),
     
//       });

//       if (response.ok) {
//         toast.success("Product deleted successfully");
//         const updatedProducts = [...products];
//         updatedProducts.splice(index, 1);
//         setProducts(updatedProducts);
//       } else {
//         toast.error(`Failed to delete product: ${response.statusText}`);
//         console.error('Failed to delete product:', response.statusText);
//       }
//     } catch (error) {
//       toast.error("Error deleting product.");
//       console.error('Error:', error);
//     }
//   };
// console.log(products)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setEditData({ ...editData, image: file });
//   };

//   const handleKitItemChange = (index, field, value) => {
//     const newKitItems = [...editData.kitItems];
//     newKitItems[index][field] = value;
//     if (field === 'isManual') {
//       newKitItems[index].productName = ''; 
//     }
//     setEditData({ ...editData, kitItems: newKitItems });
//   };

//   const addMoreKitItem = () => {
//     setEditData({ ...editData, kitItems: [...editData.kitItems, { isManual: false, productName: '' }] });
//   };

//   return (
//     <AdminNavbar>
//       <h2>Edit/Delete Products</h2>
//       <div className="edit-delete-product-container">
//         {products.length > 0 && products.map((product, index) => (
//           <div className="product-item" key={index}>
//             <img src={editMode === index ? (editData.image ? URL.createObjectURL(editData.image) : product?.src) : product?.src} alt={product?.name} /> {/* Added optional chaining */}
//             {editMode === index ? (
//               <div className="edit-mode">
//                 <input
//                   type="text"
//                   name="name"
//                   value={editData.name}
//                   onChange={handleChange}
//                   placeholder="Name"
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   value={editData.price}
//                   onChange={handleChange}
//                   placeholder="Price"
//                 />
//                 <textarea
//                   name="description"
//                   value={editData.description}
//                   onChange={handleChange}
//                   placeholder="Description"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//                 {editData.category === 'kit' && editData.kitItems.map((item, index) => (
//                   <div key={index} className="kit-item">
//                     {!item.isManual ? (
//                       <div className="form-group gk-p">
//                         <div style={{flex: "0 0 auto", width: "50%"}}>
//                           <label>Choose from existing single Product:</label>
//                           <select
//                             value={item.productName}
//                             onChange={(e) => handleKitItemChange(index, 'productName', e.target.value)}
//                             required
//                           >
//                             <option value="">Select Product</option>
//                             {products?.filter((it) => it.kit.length === 0).map(product => (
//                               <option key={product._id} value={product.name}>{product.name}</option>
//                             ))}
//                           </select>
//                         </div>
//                         <button
//                           style={{flex: "0 0 auto", width: "25%"}}
//                           type="button"
//                           onClick={() => handleKitItemChange(index, 'isManual', true)}
//                         >
//                           Or Add Product Manually
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="form-group gk-p">
//                         <div style={{flex: "0 0 auto", width: "50%"}}>
//                           <label>Product Name:</label>
//                           <input
//                             type="text"
//                             value={item.productName}
//                             onChange={(e) => handleKitItemChange(index, 'productName', e.target.value)}
//                             required
//                           />
//                         </div>
//                         <button
//                           style={{flex: "0 0 auto", width: "25%"}}
//                           type="button"
//                           onClick={() => handleKitItemChange(index, 'isManual', false)}
//                         >
//                           Select from Dropdown
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 {editData.category === 'kit' && (
//                   <button type="button" onClick={addMoreKitItem}>Add More Kit Item</button>
//                 )}
//                 <button type="button" onClick={() => handleSave(index)}>Save</button>
//                 <button type="button" onClick={() => setEditMode(null)}>Cancel</button>
//               </div>
//             ) : (
//               <div className="view-mode">
//                 <h3>{product?.name}</h3>
//                 <p>Price: ${product?.price}</p>
//                 <p>Description: {product?.description}</p>
//                 <p>Category: {product?.kit.length > 0 ? 'Kit' : 'Single Product'}</p>
//                 {product?.kit.length > 0 && (
//                   <ul>
//                     Kit Items:
//                     {product.kit.map((item, i) => (
//                       <li key={i}>{item}</li>
//                     ))}
//                   </ul>
//                 )}
//                 <button type="button" onClick={() => handleEdit(index)}>Edit</button>
//                 <button type="button" onClick={() => handleDelete(index)}>Delete</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </AdminNavbar>
//   );
// }

// export default EditDeleteProduct;

import React, { useState, useEffect, useRef } from 'react';
import AdminNavbar from '../admin-dashboard/AdminNavbar';
import BASE_URL from '../../Config';
import { toast, ToastContainer } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Editor } from '@tinymce/tinymce-react';
import ReactPaginate from 'react-paginate';
import { Hourglass } from 'react-loader-spinner';

function EditDeleteProduct() {
  const editorRef = useRef(null); 
  const [search,setSearch] = useState("")
  const [loader,setLoader] = useState(false)

  const [products, setProducts] = useState([]); 
  const [editMode, setEditMode] = useState(null);
  let storedUserData = JSON.parse(localStorage.getItem("User343"));

  const [ingredient, setIngredient] = useState([{
    title : "",desc : ""
  }]);
  const [faq, setFaq] = useState([{
    title : "",desc : ""
  }])
  const [benefits, setBenefits] = useState([{
    title : "",desc : ""
  }]);
  const [highlights, setHighlights] = useState('');
  const [benefitsMain, setBenefitsMain] = useState('');
  const [ingredientMain, setIngredientMain] = useState('');
  const [images, setImages] = useState([]);
  const [imagesrc, setImagesSrc] = useState([]);

  const [isImage, setIsImage] = useState(false);
  const [batchNo, setbatchNo] = useState(null);  // New state for discount
  const [mfgName, setMfgName] = useState(null);  // New state for discount
  const [weight, setWeight] = useState(null);  // New state for discount
  const [height, setHeight] = useState(null);  // New state for discount
  const [width, setWidth] = useState(null);  // New state for discount
  const [slug, setSlug] = useState("");
  const [canonical, setCanonical] = useState("");
  const [seoMetaTitle,setSeoMetaTitle] = useState("")
  const [seoMetaDesc, setSeoMetaDesc] = useState("");


  useEffect(() => {

  },[])
  const [editData, setEditData] = useState({
    name: '',
    price: '',
    shortDescription: '',
    longDescription: '',
    discount: '',
    stock: '',
    image: '',
    src: '',
    category: 'single-product',
    kitItems: [{ isManual: false, productName: '' }],
    productDisplay : '',
    batchNo : "",
    mfgName : "",
    weight : '',
    height : "",
    width : "",
    slug: "",
    canonical:"",
    seoMetaTitle: "",
    seoMetaDesc:""
  });

  console.log("jeijro",editData)

  useEffect(() => {
    setLoader(true)
    fetch(`${BASE_URL}/admin/product?search=${search}`)
      .then(response => response.json())
      .then(data => {
        setLoader(false)
        setProducts(data.message)
      })
      .catch(error => {
        setLoader(false)
        console.error('Error fetching products:', error)
      });
  }, [search]);

  const [cur, setCur] = useState(0);

  let pageCount =
  products?.length % 10 === 0
    ? products?.length / 10
    : Math.floor(products?.length / 10) + 1;



  const handlePageClick = (event) => {
    setCur(event.selected)
    // console.log("sjiorjfre",event.selected)
    // setSelectedPage(event.selected)

  };

  const handleEdit = (index) => {
    const product = products?.find((it) => it?._id == index?._id);
    if (product) {
      setEditMode(index?._id);
      setEditData({
        name: product.name,
        price: product.price,
        shortDescription: product.description,
        longDescription: product.longDes,
        discount: product.discount,
        stock: product.stock,
        image: '',  // Reset image
        src: product.src,  // Add src to editData
        category: product.kit.length > 0 ? 'kit' : 'single-product',
        kitItems: product.kit.length > 0 ? product.kit.map(item => ({ isManual: true, productName: item })) : [{ isManual: false, productName: '' }],
        productDisplay : product?.productDisplay,
        batchNo : product?.batchNo,
        mfgName : product?.mfgName,
        weight : product?.weight,
        height : product?.height,
        width : product?.width,
        slug : product?.metaSlug,
        canonical : product?.metaCanonical,
        seoMetaTitle : product?.metaTitle,
        seoMetaDesc : product?.metaDesc,
        id : product?._id,
      });
      setIngredient(product?.ingredient)
      setIngredientMain(product?.ingredientMain)
      setBenefits(product?.benefits)
      setBenefitsMain(product?.benefitsMain)
      setHighlights(product?.highlights)
      setImagesSrc(product?.src)
      setFilters(product?.filter || [])
      setbatchNo(product?.batchNo || ""|| "")
      setMfgName(product?.mfgName|| "")
      setWeight(product?.weight|| "")
      setHeight(product?.height|| "")
      setWidth(product?.width|| "")
      setSlug(product?.slug|| "")
      setCanonical(product?.canonical|| "")
      setSeoMetaTitle(product?.seoMetaTitle|| "")
      setSeoMetaDesc(product?.seoMetaDesc|| "")
      // setImages(product?.src)
    }

    console.log("skojfosjo",index);
  };


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

  const handleSetIngredientChange = (value,i,type) => {
    let input = ingredient;
    input[i][type] = value;
    console.log("sjdijer",input)
    setIngredient(input);
  };  
  const addSetIngredientChange = () => {
    console.log("jijoeijror",[...ingredient,{title : "",desc : ""}])
    setIngredient([...ingredient,{title : "",desc : ""}]);
  };  
  const removeSetIngredientChange = (ind) => {
    let input = ingredient;
    let new1 = input?.filter((e,i) => i != ind);
    setIngredient(new1);
  };  



  const handleSetBenefitsChange = (value,i,type) => {
    let input = benefits;
    input[i][type] = value;
    console.log("sjdijer",input)
    setBenefits(input);
  };  
  const addSetBenefitsChange = () => {
    setBenefits([...benefits,{title : "",desc : ""}]);
  };  
  const removeSetBenefitsChange = (ind) => {
    let input = benefits;
    let new1 = input?.filter((e,i) => i != ind);
    setBenefits(new1);
  };  

  const handleSetHighlightsChange = (value) => {
    setHighlights(value);
  };


  const handleSave = async (index) => {
    const uploadImageAndSaveProduct = async () => {
      let imageArr = []
      for (let index = 0; index < imagesrc?.length; index++) {
        const element = imagesrc[index];
        imageArr.push(element);
      }
      try {
        for (let index = 0; index < images.length; index++) {
          const element = images[index];
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
        return imageArr;

      } catch (error) {
        toast.error("Please logout and login again with valid credentials.");
        console.error('Error:', error);
        return [];
        throw error;
      }
    };

    const updateProduct = async (imageUrl = null) => {
      const data = {
        id: editData?.id,
        newName: editData.name,
        newPrice: editData.price,
        newDescription: editData.shortDescription,
        longDes: editData.longDescription,
        discount: editData.discount,
        stock: editData.stock,
        src: imageUrl || editData?.src,
        categoryName: editData.category,
        kit: editData.category === 'kit' ? editData.kitItems.map((item) => item.productName) : [],
        ingredient,
        benefits,
        highlights,
        benefitsMain,
        ingredientMain,
        productDisplay : editData?.productDisplay,
        filter : filters,
        batchNo : editData?.batchNo,
        mfgName : editData?.mfgName,
        weight : editData?.weight,
        height : editData?.height,
        width : editData?.width,
        slug : editData?.slug,
        canonical : editData?.canonical,
        seoMetaTitle : editData?.seoMetaTitle,
        seoMetaDesc : editData?.seoMetaDesc,
      };
console.log(data,"edited")
      try {
        const response = await fetch(`${BASE_URL}/admin/update-product`, {
          method: 'PUT',
          headers: {
            'Authorization': storedUserData.logedInUser.accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          toast.success("Product updated successfully");
          setEditMode(null);
          const updatedProducts = [...products];
          let f = products?.findIndex((e) => e?._id == editData?.id)
          updatedProducts[f] = result?.data;
          console.log("korkto",updatedProducts,result)
          setProducts(updatedProducts);
        } else {
          toast.error(`Failed to update product: ${response.statusText}`);
          console.error('Failed to update product:', response.statusText);
        }
      } catch (error) {
        toast.error("Please logout and login again with valid credentials.");
        console.error('Error:', error);
      }
    };

    try {
      if (isImage) {
        const imageUrl = await uploadImageAndSaveProduct();
        // console.log("krokofer",imageUrl)
        await updateProduct(imageUrl);
      } else {
        await updateProduct();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (index) => {
    const product = products?.find((it) => it?._id == index?._id);

    try {
      const response = await fetch(`${BASE_URL}/admin/deleteproduct`, {
        method: 'DELETE',
        headers: {
          'Authorization': storedUserData.logedInUser.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: product?._id }),
      });

      if (response.ok) {
        toast.success("Product deleted successfully");
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
      } else {
        toast.error(`Failed to delete product: ${response.statusText}`);
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      toast.error("Please logout and login again with valid credentials.");
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleLongDescriptionChange = (value) => {
    setEditData({ ...editData, longDescription: value });
  };

  const handleImageChange = (e) => {
    setIsImage(true)
    // // const files = Array.from(e.target.files);
    // setImages([...images,e.target.files]);

    const files = Array.from(e.target.files);
    console.log("kojoewjojfe",[...images,files[0]])
    // console.log("kojoewjojfe",files)
    setImages([...images,files[0]]);
  };
  const RemoveOriginalImg = (index) => {
    setIsImage(true)

    let newArr = imagesrc?.filter((it,indx) => indx != index);
    setImagesSrc(newArr||[]);

  };

  const handleKitItemChange = (index, field, value) => {
    const newKitItems = [...editData.kitItems];
    newKitItems[index][field] = value;
    if (field === 'isManual') {
      newKitItems[index].productName = '';
    }
    setEditData({ ...editData, kitItems: newKitItems });
  };

  const addMoreKitItem = () => {
    setEditData({ ...editData, kitItems: [...editData.kitItems, { isManual: false, productName: '' }] });
  };

  const [filters, setFilters] = useState([""]);

  const addsetExpertiseChange = () => {
    setFilters([...filters,""]);
  };  

  const handlesetExpertiseChange = (value,i) => {
    console.log("sjdijer",value,i)
    let input = [...filters];
    input[i] = value?.toLowerCase();
    setFilters(input);
  };  

  const removesetExpertisetChange = (ind) => {
    let input = filters;
    let new1 = input?.filter((e,i) => i != ind);
    setFilters(new1);
  };  

  return (
    <AdminNavbar>
      <h2>Edit/Delete Products</h2>
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

      <div className="edit-delete-product-container">
        {products.length > 0 && products?.slice(cur*10,(cur+1)*10)?.map((product, index) => (
          <div className="product-item" key={index}>
            <img src={editMode == product?._id ? (editData.image ? URL.createObjectURL(editData.image) : product?.src) : product?.src?.[0]} alt={product?.name} />
            {editMode == product?._id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
                <textarea
                  name="shortDescription"
                  value={editData.shortDescription}
                  onChange={handleChange}
                  placeholder="Short Description"
                />
                {/* <ReactQuill
                  value={editData.longDescription}
                  onChange={handleLongDescriptionChange}
                /> */}
                <Editor
        apiKey="sgccfkakft4ykadp0cni6vkwe35np82gv4ak0y208ius3mk9"  // Optional but recommended
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={editData.longDescription}
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
          handleLongDescriptionChange(e)
        } 
        } 
      />
                <div>
                <div style={{ display: "flex" }}>
              <label>Ingredient:</label>
              <div
                className="inputBoxCust3"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  margin: "0 0 0 10px",
                }}
                onClick={addSetIngredientChange}
              >
                +
              </div>
            </div>
            {/* <ReactQuill
              value={ingredientMain}
              onChange={(value) => {
                setIngredientMain(value);
              }}
              required
            /> */}

<Editor
        apiKey="sgccfkakft4ykadp0cni6vkwe35np82gv4ak0y208ius3mk9"  // Optional but recommended
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={ingredientMain}
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
          setIngredientMain(e);
        } 
        } 
      />
            {ingredient?.map((e, i) => {
              return (
                <>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      defaultValue={e?.title}
                      onChange={(event) => {
                        console.log("keokrowek", event?.target.value, i);
                        handleSetIngredientChange(
                          event?.target.value,
                          i,
                          "title"
                        );
                      }}
                      // required
                      style={{ margin: "10px 0 0 0", width: "90%" }}
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
                        onClick={() => removeSetIngredientChange(i)}
                      >
                        -
                      </div>
                    </div>
                  </div>

                  {/* <ReactQuill
                    value={e?.desc}
                    onChange={(value) =>
                      handleSetIngredientChange(value, i, "desc")
                    }
                    required
                  /> */}

<Editor
        apiKey="sgccfkakft4ykadp0cni6vkwe35np82gv4ak0y208ius3mk9"  // Optional but recommended
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={e?.desc}
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
          handleSetIngredientChange(e, i, "desc")
        } 
        } 
      />
                </>
              );
            })}
            <div>
            <div style={{ display: "flex" }}>
              <label>Benefits:</label>
              <div
                className="inputBoxCust3"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  margin: "0 0 0 10px",
                }}
                onClick={addSetBenefitsChange}
              >
                +
              </div>
            </div>
            {/* <ReactQuill
              value={benefitsMain}
              onChange={(value) => {
                setBenefitsMain(value);
              }}
              required
            /> */}

<Editor
        apiKey="sgccfkakft4ykadp0cni6vkwe35np82gv4ak0y208ius3mk9"  // Optional but recommended
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={benefitsMain}
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
          setBenefitsMain(e);
        } 
        } 
      />
            {benefits?.map((e, i) => {
              return (
                <>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      defaultValue={e?.title}
                      onChange={(event) => {
                        console.log("keokrowek", event?.target.value, i);
                        handleSetBenefitsChange(
                          event?.target.value,
                          i,
                          "title"
                        );
                      }}
                      // required
                      style={{ margin: "10px 0 0 0", width: "90%" }}
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
                        onClick={() => removeSetBenefitsChange(i)}
                      >
                        -
                      </div>
                    </div>
                  </div>

                  {/* <ReactQuill
                    value={e?.desc}
                    onChange={(value) =>
                      handleSetBenefitsChange(value, i, "desc")
                    }
                    required
                  /> */}

<Editor
        apiKey="sgccfkakft4ykadp0cni6vkwe35np82gv4ak0y208ius3mk9"  // Optional but recommended
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={e?.desc}
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
          handleSetBenefitsChange(e, i, "desc")
        } 
        } 
      />
                </>
              );
            })}
            </div>
            <label>Highlights:</label>
            {/* <ReactQuill
              value={highlights}
              onChange={handleSetHighlightsChange}
              required
            /> */}

<Editor
        apiKey="sgccfkakft4ykadp0cni6vkwe35np82gv4ak0y208ius3mk9"  // Optional but recommended
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={highlights}
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
          handleSetHighlightsChange(e)
        } 
        } 
      />
                </div>
                <label>Discount</label>
                <input
                  type="number"
                  name="discount"
                  value={editData.discount}
                  onChange={handleChange}
                  placeholder="Discount"
                />

<label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={editData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                />


<label>Weight: (in gram)</label>
<input
                  type="text"
                  name="weight"
                  value={editData.weight}
                  onChange={handleChange}
                  placeholder="weight"
            />


<label>Height: (in cm)</label>
<input
                  type="text"
                  name="height"
                  value={editData.height}
                  onChange={handleChange}
                  placeholder="height"
            />

<label>Width: (in cm)</label>
<input
                  type="text"
                  name="width"
                  value={editData.width}
                  onChange={handleChange}
                  placeholder="width"
            />


<label>mfgName:</label>
<input
                  type="text"
                  name="mfgName"
                  value={editData.mfgName}
                  onChange={handleChange}
                  placeholder="mfgName"
            />


<label>batchNo:</label>
<input
                  type="text"
                  name="batchNo"
                  value={editData.batchNo}
                  onChange={handleChange}
                  placeholder="batchNo"
            />


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

            <div className="form-group">
          <label htmlFor="slug">slug:</label>
            <input
              type="text"
              name="slug"
              id="slug"
              value={editData.slug}
              onChange={handleChange}
            />
          </div>
          

          <div className="form-group">
            <label htmlFor="canonical">canonical:</label>
            <input
              type="text"
              name="canonical"
              id="canonical"
              value={editData.canonical}
              onChange={handleChange}
            />
          </div>

            <div className="form-group">
            <label htmlFor="seoMetaTitle">SEO Meta Title:</label>
            <input
              type="text"
              name="seoMetaTitle"
              id="seoMetaTitle"
              value={editData.seoMetaTitle}
              onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label htmlFor="seoMetaDesc">SEO Meta Desc:</label>
            <input
              type="text"
              name="seoMetaDesc"
              id="seoMetaDesc"
              value={editData.seoMetaDesc}
              onChange={handleChange}
            />
            </div>


            {filters?.map((val, ind) => {
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
                  {<select                     onChange={(e) =>
                      handlesetExpertiseChange(e.target.value, ind)
                    }><option value="Hair Loss Treatment for men">Hair Loss Treatment for men</option>
                    <option value="Hair Loss Treatment for women">Hair Loss Treatment for women</option><option value="Dandruff Treatment">Dandruff Treatment</option>
                    <option value="Gray Hair Care">Gray Hair Care</option>
                    <option value="Damaged Hair">Damaged Hair</option>
                    <option value="Ayurvedic Products">Ayurvedic Products</option>
                    <option value="Hair Supplements">Hair Supplements</option>
                    <option value="SyrColor-Treated Hairup">Color-Treated Hair</option>
                    <option value="Heat Damage Control">Heat Damage Control</option>
                    <option value="Thyroid- Stress">Thyroid- Stress</option>
                    <option value="PCOS- Hormone">PCOS- Hormone</option>
                    <option value="Anemia">Anemia</option>
                    <option value="Oily Scalp">Oily Scalp</option>
                    <option value="Dry Scalp">Dry Scalp</option>
                    <option value="Sensitive Scalp">Sensitive Scalp</option>
                    <option value="Normal Scalp">Normal Scalp</option>
                    <option value="Wavy Hair">Wavy Hair</option>
                    <option value="Straight Hair ">Straight Hair </option>
                    <option value="Curly Hair">Curly Hair</option>
                    <option value="Coily/Kinky Hair">Coily/Kinky Hair</option>
                    <option value="Dull Hair">Dull Hair</option>
                    <option value="Frizzy Hair">Frizzy Hair</option>
                    <option value="Split End">Split End</option>
                    </select>}
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
            <label>Products display on product section:</label>
            <input
                  type="checkbox"
                  name="productDisplay"
                  defaultChecked={editData.productDisplay || false}
                  onChange={(e) => handleChange({target : {
                    name : "productDisplay",
                    value : e?.target?.checked
                  }})}
                  placeholder="Stock"
                />
            <label>Upload Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />

            {imagesrc?.map((item,index) => {
              return(
                <div className='d-flex flex-column'>
                  <img src = {item}/>
                  <button type = "button" onClick={() => RemoveOriginalImg(index)}> Remove</button>
                </div>
                
              )
            }) }
                {editData.category === 'kit' && editData.kitItems.map((item, index) => (
                  <div key={index} className="kit-item">
                    {!item.isManual ? (
                      <div className="form-group gk-p">
                        <div style={{ flex: "0 0 auto", width: "50%" }}>
                          <label>Choose from existing single Product:</label>
                          <select
                            value={item.productName}
                            onChange={(e) => handleKitItemChange(index, 'productName', e.target.value)}
                            required
                          >
                            <option value="">Select Product</option>
                            {products?.filter((it) => it.kit.length === 0).map(product => (
                              <option key={product._id} value={product.name}>{product.name}</option>
                            ))}
                          </select>
                        </div>
                        <button
                          style={{ flex: "0 0 auto", width: "25%" }}
                          type="button"
                          onClick={() => handleKitItemChange(index, 'isManual', true)}
                        >
                          Or Add Product Manually
                        </button>
                      </div>
                    ) : (
                      <div className="form-group gk-p">
                        <div style={{ flex: "0 0 auto", width: "50%" }}>
                          <label>Product Name:</label>
                          <input
                            type="text"
                            value={item.productName}
                            onChange={(e) => handleKitItemChange(index, 'productName', e.target.value)}
                            required
                          />
                        </div>
                        <button
                          style={{ flex: "0 0 auto", width: "25%" }}
                          type="button"
                          onClick={() => handleKitItemChange(index, 'isManual', false)}
                        >
                          Select from Dropdown
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {editData.category === 'kit' && (
                  <button type="button" onClick={addMoreKitItem}>Add More Kit Item</button>
                )}
                <button type="button" onClick={() => handleSave(index)}>Save</button>
                <button type="button" onClick={() => setEditMode(null)}>Cancel</button>
              </div>
            ) : (
              <div className="view-mode">
                <h3>{product?.name}</h3>
                <p>Price: ₹{product?.price}</p>
              
                <p>Category: {product?.kit.length > 0 ? 'Kit' : 'Single Product'}</p>
                {product?.kit.length > 0 && (
                  <ul>
                    Kit Items:
                    {product.kit.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                <button type="button" onClick={() => handleEdit(product)}>Edit</button>
                <button type="button" onClick={() => handleDelete(product)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div> }

      <div className="reactPagination" style={{display: "flex",
    justifyContent: "end"}}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={10}
            pageCount={pageCount}
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
        <ToastContainer position="bottom-right"/>
       </AdminNavbar>
  );
}

export default EditDeleteProduct;
