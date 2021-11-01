import React from "react";
import FelhasznalokContent from "./FelhasznalokContent";

function FelhasznalokBase(props) {
  return (
    <div className="card">
      <FelhasznalokContent {...props} />
    </div>
  );
}

export default FelhasznalokBase;
