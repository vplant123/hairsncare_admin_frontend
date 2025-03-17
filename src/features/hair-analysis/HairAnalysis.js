import React from 'react'
import './HairAnalysis.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import useDivInView, { LEFT_VARIANTS, RIGHT_VARIANTS, TRANSITION } from '../../hooks/useDivInView';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

export default function HairAnalysis() {
  const navigate = useNavigate()

  const content = useSelector((state) => state.content.home);
  console.log("jojkeor", content)

  const [ref1, control1] = useDivInView();
  const [ref2, control2] = useDivInView();

  return (
    <div className='hair-analysis' style={{background  : `url(/assets/img/Leaf-Background-520X1600.png) center repeat`}}>
      <motion.div
        ref={ref1}
        animate={control1}
        initial="hidden"
        variants={LEFT_VARIANTS}
        transition={TRANSITION}
        className="ana anakkk " ><img alt='hair' src={content?.section7?.img} style={{maxWidth : "80%"}}/></motion.div>
      <motion.div className="ana "
        ref={ref2}
        animate={control2}
        initial="hidden"
        variants={RIGHT_VARIANTS}
        transition={TRANSITION}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>{content?.section7?.title}</h1>
        <p>{content?.section7?.desc}</p>
        <div className='hero-btn'>
          <button onClick={() => navigate('/hair-test')} className='btn primary'>TAKE HAIR TEST</button>
          <button onClick={() => {

          }} className='btn'>
            <HashLink smooth to='/book/#section3' style={{    textDecoration: "none",
    color: "black"}}> BOOK AN APPOINTMENT </HashLink>
            </button>
        </div>
      </motion.div>
    </div>
  )
}


