import React, { useState } from 'react';
import BASE_URL from '../../../Config';
// import './OurExpertise.css';
// import BeforeAfter from '../before-after/BeforeAfter';
// import Footer from '../footer/Footer';
// import Faq from '../our-specialist/faq/Faq';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUtilityContentData } from '../../../app/conteneDataSlice';

export default function ManagePrice() {
  const content = useSelector((state) => state.content?.plan);
  const content1 = useSelector((state) => state.content?.config);

  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch();


  let p1 = content?.find((e) => e?.name == "Local Plan")
  let p2 = content?.find((e) => e?.name == "Premium Plan")
  const [price1, setPrice1] = useState(p1?.price)
  const [price2, setPrice2] = useState(p2?.price)
  const [price3, setPrice3] = useState(content1?.deliveryCharge)
  const [price4, setPrice4] = useState(content1?.deliveryAmt)

  console.log("jdfojer", price1, content1,
    price2)
  const handleSubmit = async (e) => {

    // const formData = new FormData();
    // console.log("nnirhei",images)
    // images.forEach(image => formData.append('image', image));
    try {


      const data = {
        appPrice1: price1,
        appPrice2: price2,
        appPrice3: price3,
        appPrice4: price4,
        plan: "1"
      };
      let url = `${BASE_URL}/utility/editVideoCustomer`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        setLoader(false)
        if (response.ok) {
          const result = await response.json();
          dispatch(getUtilityContentData());

          toast.success("content update successfully");
          console.log('Product created successfully:', result);
        } else {
          toast.error(`Failed to update update: ${response.statusText}`);
          console.error('Failed to create product:', response.statusText);
        }
      } catch (error) {
        setLoader(false)
        toast.error("Please logout and login again with valid credentials.");
        console.error('Error:', error);
      }
    } catch (error) {
      setLoader(false)
      toast.error("Please logout and login again with valid credentials.");
      console.error('Error:', error);
    }
  };
  return (
    <>
      <div>
        Local Plan price
        <input
          type="text"
          defaultValue={price1
          }
          onChange={(e) => setPrice1(e?.target?.value)}
        // className="contect-us-heading"
        />
      </div>

      <div>
        Premium Plan price

        <input
          type="text"
          defaultValue={price2
          }
          onChange={(e) => setPrice2(e?.target?.value)}
        // className="contect-us-heading"
        />
      </div>

      <div>
        delivery Charge

        <input
          type="text"
          defaultValue={price3
          }
          onChange={(e) => setPrice3(e?.target?.value)}
        // className="contect-us-heading"
        />
      </div>

      <div>
        delivery Amount less than

        <input
          type="text"
          defaultValue={price4
          }
          onChange={(e) => setPrice4(e?.target?.value)}
        // className="contect-us-heading"
        />
      </div>

      <div>
        <button
          style={{ background: "bisque", cursor: "pointer" }}
          onClick={() => handleSubmit()}
          className="btn"
        >
          {loader ? "loadin" : "Update Data"}
        </button>
      </div>
    </>
  );
}
