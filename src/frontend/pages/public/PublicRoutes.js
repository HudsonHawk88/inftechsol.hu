import React from "react";
import { Route } from "react-router-dom";

import Kezdolap from "./views/Kezdőlap/Kezdőlap";
import ReferenciakBase from "./views/Referenciak/ReferenciakBase";
import ElerhetosegekBase from "./views/Elerhetosegek/ElerhetosegekBase";

function PublicRoutes(props) {
  return (
    <React.Fragment>
      <Route exact path="/" render={() => <Kezdolap {...props} />} />
      <Route
        path="/referenciak"
        render={() => <ReferenciakBase {...props} />}
      />
      <Route
        path="/elerhetosegek"
        render={() => <ElerhetosegekBase {...props} />}
      />
    </React.Fragment>
  );
}

export default PublicRoutes;
