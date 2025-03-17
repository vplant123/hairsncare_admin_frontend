import React, { useState } from 'react'
import './index.css'
function FaqProducts(props) {
    const [openSection, setOpenSection] = useState(null);
    let {
      product
    } = props
  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <div class=" ingredient-section faq-section pt-60 pb-60 mt-50">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <h3 class="animated fadeIn Head-Faq">FAQ’s</h3>
            <div class="benefit-accordian ingredient-accordian mt-50">
              <div id="accordion_2">
                {
                  product?.faq?.map((e) => {
                    return(
                      <div class="card">
                      <h6
                        class="ltn__card-title collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${e?._id}`}
                        aria-expanded={openSection === e?._id}
                        onClick={() => handleToggle(e?._id)}
                      >
                        {e?.title}
                      </h6>
                      <span>
                  </span>
                      <div
                        id={e?._id}
                        className={`accordion-collapse collapse ${openSection === e?._id ? 'show' : ''}`}
                        data-bs-parent="#accordion_2"
                        // style=""
                      >
                        <div class="card-body">
                          <div dangerouslySetInnerHTML={{ __html: e?.desc }} />
                          {/* <p>
                          {e?.desc}

                          </p> */}
                        </div>
                      </div>
                    </div>
                    )
                  })
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqProducts







// function FaqProducts() {
//   const [openSection, setOpenSection] = useState(null);

//   const handleToggle = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="accordion" id="accordionExample">
//         <div className="accordion-item">
//           <h2 className="accordion-header" id="headingOne">
//             <button
//               className="accordion-button"
//               type="button"
//               onClick={() => handleToggle('section1')}
//               aria-expanded={openSection === 'section1'}
//               aria-controls="collapseOne"
//             >
//               Minoxil
//             </button>
//           </h2>
//           <div
//             id="collapseOne"
//             className={`accordion-collapse collapse ${openSection === 'section1' ? 'show' : ''}`}
//             aria-labelledby="headingOne"
//             data-bs-parent="#accordionExample"
//           >
//             <div className="accordion-body">
//               {/* Content for Minoxil */}
//             </div>
//           </div>
//         </div>
//         <div className="accordion-item">
//           <h2 className="accordion-header" id="headingTwo">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               onClick={() => handleToggle('section2')}
//               aria-expanded={openSection === 'section2'}
//               aria-controls="collapseTwo"
//             >
//               Amlakai
//             </button>
//           </h2>
//           <div
//             id="collapseTwo"
//             className={`accordion-collapse collapse ${openSection === 'section2' ? 'show' : ''}`}
//             aria-labelledby="headingTwo"
//             data-bs-parent="#accordionExample"
//           >
//             <div className="accordion-body">
//               Skin care experts from India and Australia, Fair and Handsome, 'the Radiance Cream for Men' has developed a breakthrough.
//             </div>
//           </div>
//         </div>
//         <div className="accordion-item">
//           <h2 className="accordion-header" id="headingThree">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               onClick={() => handleToggle('section3')}
//               aria-expanded={openSection === 'section3'}
//               aria-controls="collapseThree"
//             >
//               Neem
//             </button>
//           </h2>
//           <div
//             id="collapseThree"
//             className={`accordion-collapse collapse ${openSection === 'section3' ? 'show' : ''}`}
//             aria-labelledby="headingThree"
//             data-bs-parent="#accordionExample"
//           >
//             <div className="accordion-body">
//               {/* Content for Neem */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }