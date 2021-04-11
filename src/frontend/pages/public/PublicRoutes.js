import React from "react";
import { Route } from "react-router-dom";

import Kezdolap from "./views/Kezdőlap/Kezdőlap";
import ReferenciakBase from "./views/Referenciak/ReferenciakBase";

function PublicRoutes(props) {
  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={(props) => <Kezdolap {...props}  />}
      />
      <Route
        path="/referenciak"
        render={(props) => <ReferenciakBase {...props} />}
      />
    </React.Fragment>
  );
}

export default PublicRoutes;
