import { useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
export const LEFT_VARIANTS = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: -100,
  },
}

export const RIGHT_VARIANTS = {
  visible: {
    opacity: 1,
    x: 0,
  },
  hidden: {
    opacity: 0,
    x: 100,
  },
}

export const ZOOM_IN_VARIANTS = {
  visible: {
    opacity: 1,
    scale: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0,
  },

  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3
    }
  }
}

export const TRANSITION = {
  duration: 1,
  delay: .25
}



const useDivInView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControl = useAnimation();


  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    } else {
      mainControl.start("hidden");
    }
  }, [isInView, mainControl]);

  return [ref, mainControl];
};

export default useDivInView;
