
import React from 'react';
import "./CorePrinciple.css"
import { useSelector } from 'react-redux';
import useDivInView, { LEFT_VARIANTS, RIGHT_VARIANTS, TRANSITION } from '../../hooks/useDivInView';
import { motion } from 'framer-motion';


function Principle({ imageSrc, description, animationClass, isLeft = false }) {
  const [ref, control] = useDivInView()
  return (
    <motion.div
      ref={ref}
      animate={control}
      initial="hidden"
      variants={isLeft ? LEFT_VARIANTS : RIGHT_VARIANTS}
      transition={{
        ...TRANSITION,
        delay: 0.5
      }}
      className={animationClass}
    >
      <img className="principle-img" src={imageSrc} alt="Hair Care Principle" />
      <p>{description}</p>
    </motion.div>
  );
}

function CorePrincipleSection() {
  const content = useSelector((state) => state.content.home);

  if (!content?.section6) {
    return null; // Handle case where content is undefined
  }

  const { mainDes, data } = content.section6;

  return (
    <div className="core-wrapper" style={{ fontFamily: '"Poppins", sans-serif' }}>
      <hr />
      <div className="core container">
        <h1
          className="animate__animated animate__fadeInDown"
          style={{
            animationDelay: "0.4s",
            fontWeight: "700",
            fontSize: "2rem",
          }}
        >
          {mainDes}
        </h1>
        <div className="core-image">
          {data?.slice(0, 2).map((e) => (
            <Principle
              key={e?.img}
              isLeft
              imageSrc={e?.img}
              description={e?.desc}
              animationClass="animate__backInLeft"
            />
          ))}
          {data?.slice(2).map((e) => (
            <Principle
              key={e?.img}
              imageSrc={e?.img}
              description={e?.desc}
              animationClass="animate__backInRight"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CorePrincipleSection;
