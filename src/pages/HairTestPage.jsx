import React, { useEffect } from "react";

import HairTest from "./hair-test/HairTest";

export default function HairTestPage(props) {
  useEffect(() => {
    if (props?.setTitle) props?.setTitle(window.location.pathname);
  }, []);

  return <HairTest />;
}
