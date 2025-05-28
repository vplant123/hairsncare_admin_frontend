import React from "react";
import "./ShoppingFeature.css";
import { useSelector } from "react-redux";
import useDivInView, { RIGHT_VARIANTS, TRANSITION } from "../../hooks/useDivInView";
import { motion } from "framer-motion";

const ShoppingItem = ({ item }) => {

  const [ref, control] = useDivInView();

  return (
    <>
      <motion.div className="shopping-item"

        ref={ref}
        animate={control}
        initial="hidden"
        variants={RIGHT_VARIANTS}
        transition={{
          ...TRANSITION,
          delay: 0.2 * parseInt(item?.index),
        }}
      >
        <img alt="hair" src={item?.img} />
        <div>
          <p className="feature-heading">{item?.name}</p>
          <p>{item?.desc}</p>
        </div>
      </motion.div>
    </>
  )
}
function ShoppingFeature({col}) {
  const content = useSelector((state) => state.content.home);
  console.log("jojkeor", content);

  return (
    <div className="shopping-feature container" style={{backgroundColor : col ? "#C8CA6C" : "#C8CA6C" }}>
      {content?.section9?.map((e, index) => <ShoppingItem item={e} key={index} index={index} />)}
    </div>
  );
}

export default ShoppingFeature;
