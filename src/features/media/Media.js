import React, { useEffect, useState } from 'react'
import './Media.css'
import { useSelector } from 'react-redux';
import useDivInView, { LEFT_VARIANTS, RIGHT_VARIANTS, TRANSITION } from '../../hooks/useDivInView';
import { motion } from 'framer-motion';

const MediaImage = ({ src, index }) => {
  const [ref, control] = useDivInView();
  return <motion.img alt='hair' src={src}
    ref={ref}
    animate={control}
    initial="hidden"
    variants={RIGHT_VARIANTS}
    transition={{
      ...TRANSITION,
      delay: index * 0.2
    }}
  />
}
function Media() {
  const [cur, setCur] = useState(1);

  const content = useSelector((state) => state.content.home);
  console.log("jojkeor", content)

  useEffect(() => {
    let timeout = setTimeout(
      () =>
        setCur((prevIndex) =>
          prevIndex == (content?.section5?.length - 2) ? 1 : prevIndex + 1
        ),
      5000
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [cur]);

  const [slide, setSlide] = useState(3)
  const [slide1, setSlide1] = useState(2)

  const [ref1, control1] = useDivInView();


  return (
    <>
      <div className='media-content container' style={{
        fontFamily: '"Poppins", sans-serif'
      }}>
        <motion.div className="m-c"
          ref={ref1}
          animate={control1}
          initial="hidden"
          variants={LEFT_VARIANTS}
          transition={TRANSITION}
        >
          <p>Published In</p>
          <p className='Media-heading'>Leading Media</p>
        </motion.div>
        <div className="Media-feature "
        >

          {
            content?.section5?.slice(cur - 1, (cur - 1) + (slide + 1))?.map((item, index) => {
              return (
                <div>
                  <MediaImage src={item?.img} index={index} />
                </div>
              )
            })
          }
        </div>

      </div>
      <ul class="slick-dots" role="tablist">

        {
          content?.section3?.slice(0, content?.section5?.length - slide1).map((e, ind) => {
            return (
              <li
                class={cur == ind + 1 ? "slick-active" : ""}
                aria-hidden="false"
                role="presentation"
                aria-selected={cur == ind + 1}
                aria-controls={cur}
                id={cur}
                onClick={() => setCur(ind + 1)}
              >
                <button type="button" data-role="none" role="button" tabindex="0">
                  {ind + 1}
                </button>
              </li>
            );
          })
        }
      </ul>
    </>
  )
}

export default Media

