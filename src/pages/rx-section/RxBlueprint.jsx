import React from 'react'
import './rx.css'
import { useSelector } from 'react-redux';
import useDivInView, { LEFT_VARIANTS, RIGHT_VARIANTS, TRANSITION } from '../../hooks/useDivInView';
import { motion } from 'framer-motion';
function RxBlueprint() {

  const content = useSelector((state) => state.content.home);
  console.log("jojkeor", content)
  const [ref1, control1] = useDivInView();
  const [ref2, control2] = useDivInView();

  return (
    <div className='rx-container container'>
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={control1}
        variants={LEFT_VARIANTS}
        transition={TRANSITION}
      ><h2 style={{ fontSize: "2rem", fontWeight: "700" }}>{content?.section8?.mainTitle}</h2>
        <img alt='hair'
          src={content?.section8?.img} />
      </motion.div>
      <motion.div
        ref={ref2}
        initial="hidden"
        animate={control2}
        variants={RIGHT_VARIANTS}
        transition={TRANSITION}
      ><img alt='hair' src={content?.section8?.subImg} /></motion.div>

    </div>
  )
}

export default RxBlueprint
