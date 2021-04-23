import React from "react";
import { Route } from "react-router-dom";

import Page404 from "../common/FourOFour";

import Kezdolap from "./views/Kezdőlap/Kezdőlap";
// import ReferenciakBase from "./views/Referenciak/ReferenciakBase";
import ElerhetosegekBase from "./views/Elerhetosegek/ElerhetosegekBase";
import GdprTajekozatato from "./views/GDPR/GdprTajekoztato";
import ReferenciakBase from "../admin/views/Referenciak/ReferenciakBase";

function PublicRoutes(props) {
  return (
    <React.Fragment>
      {/* <Route exact path="/" render={() => <Kezdolap {...props} />} />
      <Route path="/bio" render={() => <Page404 {...props} />} />
      <Route path="/szolgaltatasok" render={() => <Page404 {...props} />} />
      <Route path="/referenciak" render={() => <Page404 {...props} />} />
      <Route path="/gdpr" render={() => <GdprTajekozatato {...props} />} />
      <Route path="/elerhetosegek" render={() => <ElerhetosegekBase {...props} />} /> */}
      <Route exact path="/" component={Kezdolap} />
      <Route path="/bio" component={Page404} />
      <Route path="/szolgaltatasok" component={Page404} />
      <Route path="/referenciak" component={Page404} />
      <Route path="/gdpr" component={GdprTajekozatato} />
      <Route path="/elerhetosegek" children={ElerhetosegekBase} />
      <Route path="/404" component={Page404} />
    </React.Fragment>
  );
}

export default PublicRoutes;
