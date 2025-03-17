import React from 'react'
import './Growth.css'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import useDivInView, { RIGHT_VARIANTS, TRANSITION } from '../../hooks/useDivInView';


function GrowthStep({ stepNumber, stepTitle, imgSrc, }) {
    const [ref, control] = useDivInView();
    return (
      <motion.div
        className=""
        ref={ref}
        animate={control}
        initial="hidden"
        variants={RIGHT_VARIANTS}
        transition={{
          ...TRANSITION,
          delay: 0.2 * parseInt(stepNumber),
        }}
        style={{ animationDelay: "0.2s" }}
      >
        {parseFloat(stepNumber) % 2 == 1 ? (
          <>
            <img alt={stepTitle} src={imgSrc} />
            <a style={{ flexDirection: "column", gap: 0 }}>
              <span>{stepNumber}</span>
              <div style={{ textAlign: "center" }}>{stepTitle}</div>
            </a>
          </>
        ) : (
          <>
            <a style={{ flexDirection: "column", gap: 0 }}>
              <span>{stepNumber}</span>
              <div style={{ textAlign: "center" }}>{stepTitle}</div>
            </a>
            <img alt={stepTitle} src={imgSrc} />
          </>
        )}
      </motion.div>
    );
}


function GrowthTransition() {
    const navigate = useNavigate();

    const growthSteps = [
        { stepNumber: "01", stepTitle: "HAIR LOSS/HAIR THINING", imgSrc: '/uploads/icon1.png', animationDelay: '0s' },
        { stepNumber: "02", stepTitle: "HAIR TEST", imgSrc: '/uploads/icon2.png', animationDelay: '0.2s' },
        { stepNumber: "03", stepTitle: "EVALUATION OF PHOTOS", imgSrc: '/uploads/icon3.png', animationDelay: '0s' },
        { stepNumber: "04", stepTitle: "VIRTUAL CONSULTATION", imgSrc: '/uploads/icon4.png', animationDelay: '0.2s' },
        { stepNumber: "05", stepTitle: "HOLISTIC TREATMENT PLAN", imgSrc: '/uploads/icon5.png', animationDelay: '0s' },
        { stepNumber: "06", stepTitle: "HAIR GROWTH", imgSrc: '/uploads/icon6.png', animationDelay: '0.2s' },
    ];

    return (
        <div className='growth-wrapper'>
            <div className='d-flex flex-column'>
                <h1 style={{ marginBottom: "30px", paddingBottom: 0, animationDelay: '0.5s', fontSize: "2rem", fontWeight: "700" }} className="animate__animated animate__fadeInDown">
                    Start Your Hair Growth Transformation
                </h1>
            </div>
            <div className='growth-container container'>
                {growthSteps.map((step, index) => (
                    <GrowthStep
                        key={index}
                        stepNumber={step.stepNumber}
                        stepTitle={step.stepTitle}
                        index={index}
                        imgSrc={step.imgSrc}
                        animationDelay={step.animationDelay}
                    />
                ))}
            </div>
            <div className='growth-btn'>
                <button className='btn primary' onClick={() => navigate("/hair-test")} style={{ padding: "12px" }}>
                    TAKE HAIR TEST
                </button>
            </div>
        </div>
    );
}

export default GrowthTransition;
