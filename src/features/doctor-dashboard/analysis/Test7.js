import React, { useState } from 'react';

const Test7 = ({selectedOptions, setSelectedOptions,nextStep,prevStep}) => {


  const handleCheckboxChange = (category, value, checked) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedCategory = checked
        ? [...prevSelectedOptions[category], value]
        : prevSelectedOptions[category].filter((option) => option !== value);
      return { ...prevSelectedOptions, [category]: updatedCategory };
    });
  };
  console.log('Selected Options:', selectedOptions);



  return (
    <div>
      
      <form className='formss'>
      <h2 className='diag1 '>Nutritional Management</h2>
      <div style={{backgroundColor:'rgb(160 213 54)',padding:'1rem'}}>

        {/* <label className=' optionss'>
          <input
            type="checkbox"
            value="Hairloss Diet"
            onChange={(e) =>
              handleCheckboxChange('Nutrition', e.target.value, e.target.checked)
            }
          />
          Hairloss Diet (Default)
        </label> <br/>
        <label className=' optionss'>
          <input
            type="checkbox"
            value="Hairloss Diet"
            onChange={(e) =>
              handleCheckboxChange('Nutrition', e.target.value, e.target.checked)
            }
          />
          Hairloss Diet (Default)
        </label> <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Diet for Iron Deficiency - Anemia"
            onChange={(e) =>
              handleCheckboxChange('Nutrition', e.target.value, e.target.checked)
            }
          />
          Diet for Iron Deficiency - Anemia
        </label> <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Diet for PCOD"
            onChange={(e) =>
              handleCheckboxChange('Nutrition', e.target.value, e.target.checked)
            }
          />
          Diet for PCOD
        </label> <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Diet for Thyroid"
            onChange={(e) =>
              handleCheckboxChange('Nutrition', e.target.value, e.target.checked)
            }
          />
          Diet for Thyroid
        </label> */}
        <label className='optionss'>
          <input
            type="checkbox"
            value="General Diet for Hair Loss"
            onChange={(e) =>
              handleCheckboxChange('Nutrition', e.target.value, e.target.checked)
            }
          />
          General Diet for Hair Loss
        </label>
      </div>

      <h2 className='diag1 '>Lifestyle Management</h2>
      <div style={{backgroundColor:'#ebd461',padding:'1rem'}}>
        {/* <label className='optionss'>
          <input
            type="checkbox"
            value="Lifestyle Advice"
            onChange={(e) =>
              handleCheckboxChange('LifeStyle', e.target.value, e.target.checked)
            }
          />
          Lifestyle Advice (Default)
        </label> <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Lifestyle Advice for Iron Deficiency - Anemia"
            onChange={(e) =>
              handleCheckboxChange('LifeStyle', e.target.value, e.target.checked)
            }
          />
          Lifestyle Advice for Iron Deficiency - Anemia
        </label> <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Lifestyle Advice for Thyroid"
            onChange={(e) =>
              handleCheckboxChange('LifeStyle', e.target.value, e.target.checked)
            }
          />
          Lifestyle Advice for Thyroid
        </label>
        <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Lifestyle Advice for PCOD"
            onChange={(e) =>
              handleCheckboxChange('LifeStyle', e.target.value, e.target.checked)
            }
          />
          Lifestyle Advice for PCOD
        </label> */}
        <label className='optionss'>
          <input
            type="checkbox"
            value="General Lifestyle Advice"
            onChange={(e) =>
              handleCheckboxChange('LifeStyle', e.target.value, e.target.checked)
            }
          />
          General Lifestyle Advice
        </label>
      </div>

      <h2 className='diag1 '>Stress Management</h2>
      <div style={{backgroundColor:'#eaaaff',padding:'1rem'}}>
        {/* <label className='optionss'>
          <input
            type="checkbox"
            value="Stress Management"
            onChange={(e) =>
              handleCheckboxChange('Stress', e.target.value, e.target.checked)
            }
          />
          Stress Management (Default)
        </label>
        <br/> */}
        <label className='optionss'>
          <input
            type="checkbox"
            value="Mild to Moderate Stress Management"
            onChange={(e) =>
              handleCheckboxChange('Stress', e.target.value, e.target.checked)
            }
          />
          Mild to Moderate Stress Management
        </label>
        <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Stress Management Severe"
            onChange={(e) =>
              handleCheckboxChange('Stress', e.target.value, e.target.checked)
            }
          />
          Stress Management Severe
        </label>
        {/* <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Stress Management for PCOD"
            onChange={(e) =>
              handleCheckboxChange('Stress', e.target.value, e.target.checked)
            }
          />
          Stress Management for PCOD
        </label>
        <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Stress Management for Thyroid"
            onChange={(e) =>
              handleCheckboxChange('Stress', e.target.value, e.target.checked)
            }
          />
          Stress Management for Thyroid
        </label>
        <br/>
        <label className='optionss'>
          <input
            type="checkbox"
            value="Stress Management for Anemia"
            onChange={(e) =>
              handleCheckboxChange('Stress', e.target.value, e.target.checked)
            }
          />
          Stress Management for Anemia
        </label> */}
      </div>

      </form>
      <div className="test-btnn btn-tt">
      <button onClick={()=>prevStep()}>Back</button>
      <button onClick={()=>nextStep()}>Management Save, and Continue</button>

    </div>
    </div>
  );
};

export default Test7;
