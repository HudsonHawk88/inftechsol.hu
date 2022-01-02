import React from "react";

import ElerhetosegekContent from "./ElerhetosegekContent";

function ElerhetosegekBase(props) {
  console.log(props);
  return <ElerhetosegekContent {...props} />;
}

export default ElerhetosegekBase;
