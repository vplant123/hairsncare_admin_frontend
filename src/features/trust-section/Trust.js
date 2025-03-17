import React from 'react';
import { motion } from 'framer-motion';
import './Trust.css';
import { FcGoogle } from 'react-icons/fc';
import { RightAnimatedDiv } from '../../componet/Animation';

const trustItems = [
  {
    icon: <FcGoogle size={50} />,
    text: 'Google reviews',
    count: '50 +',
    delay: 0,
  },
  {
    icon: <img alt='hair' src='/uploads/r-icon2.png' />,
    text: 'Published in',
    count: '5000+ Channels',
    delay: 0.2,
  },
  {
    icon: <img alt='hair' src='/uploads/r-icon3.png' />,
    text: 'Happy Clients',
    count: '1000+',
    delay: 0.4,
  },
  {
    icon: <img alt='hair' src='/uploads/r-icon4.png' />,
    text: 'Guaranteed Result',
    count: '100+',
    delay: 0.6,
  },
];

function Trust() {

  return (
    <>
      <div className='trust-container container'>
        {trustItems.map((item, index) => (
          <RightAnimatedDiv
            key={index}
            transition={{ duration: 0.5, delay: item.delay }}
          >
            <div>{item.icon}</div>
            <div>
              <div>{item.count}</div>
              <div className='trust-text'>{item.text}</div>
            </div>
          </RightAnimatedDiv>
        ))}
      </div>
      <hr />
    </>
  );
}

export default Trust;
