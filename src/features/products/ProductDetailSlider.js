
        // <SwiperSlide>
        //   <img alt='hair' src="https://swiperjs.com/demos/images/nature-1.jpg" />
        // </SwiperSlide>
        // <SwiperSlide>
        //   <img alt='hair' src="https://swiperjs.com/demos/images/nature-2.jpg" />
        // </SwiperSlide>
        // <SwiperSlide>
        //   <img alt='hair' src="https://swiperjs.com/demos/images/nature-3.jpg" />
        // </SwiperSlide>
        // <SwiperSlide>
        //   <img alt='hair' src="https://swiperjs.com/demos/images/nature-4.jpg" />
        // </SwiperSlide>
      //   <SwiperSlide>
      //     <img alt='hair' src="https://swiperjs.com/demos/images/nature-5.jpg" />
      //   </SwiperSlide>
      //   <SwiperSlide>
      //     <img alt='hair' src="https://swiperjs.com/demos/images/nature-6.jpg" />
      //   </SwiperSlide>
      //   <SwiperSlide>
      //     <img alt='hair' src="https://swiperjs.com/demos/images/nature-7.jpg" />
      //   </SwiperSlide>
      //   <SwiperSlide>
      //     <img alt='hair' src="https://swiperjs.com/demos/images/nature-8.jpg" />
      //   </SwiperSlide>
      //   <SwiperSlide>
      //     <img alt='hair' src="https://swiperjs.com/demos/images/nature-9.jpg" />
      //   </SwiperSlide>
      //   <SwiperSlide>
      //     <img alt='hair' src="https://swiperjs.com/demos/images/nature-10.jpg" />
      //   </SwiperSlide>
      // </Swiper>
    
      import { Swiper, SwiperSlide } from 'swiper/react';
      import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { useState } from 'react'
import 'swiper/css';
import 'swiper/css/thumbs'
import 'swiper/css/navigation';
      function ProductDetailSlider() {
        const [thumbsSwiper, setThumbsSwiper] = useState();

        return (
          <>
          <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
     <Swiper
     onSwiper={setThumbsSwiper}
     loop={true}
     spaceBetween={10}
     slidesPerView={4}
     freeMode={true}
     watchSlidesProgress={true}
     modules={[FreeMode, Navigation, Thumbs]}
     className="mySwiper"
   >
      <SwiperSlide>
           <img alt='hair' src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img alt='hair' src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img alt='hair' src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide> 
   </Swiper>
   </>
        )
            
    }
    
 
      
      export default ProductDetailSlider