import React from "react";
import { Route } from "react-router-dom";

import Page404 from "../pages/common/FourOFour";

import Kezdolap from "../pages/public/Kezdőlap/Kezdőlap";
// import SzolgaltatasokBase from '../pages/public/Szolgaltatasok/SzolgaltatasokBase';
// import ReferenciakBase from "../pages/public/Referenciak/ReferenciakBase";
import ElerhetosegekBase from "../pages/public/Elerhetosegek/ElerhetosegekBase";
import GdprTajekozatato from "../pages/public/GDPR/GdprTajekoztato";

const PublicRoutes = (props) => {
  const { notification } = props;
  console.log(notification);
  return (
    <React.Fragment>
      {/* <Route exact path="/" render={() => <Kezdolap {...props} />} />
      <Route path="/bio" render={() => <Page404 {...props} />} />
      <Route path="/szolgaltatasok" render={() => <Page404 {...props} />} />
      <Route path="/referenciak" render={() => <Page404 {...props} />} />
      <Route path="/gdpr" render={() => <GdprTajekozatato {...props} />} />
      <Route path="/elerhetosegek" render={() => <ElerhetosegekBase {...props} />} /> */}
      <Route exact path="/" render={() => <Kezdolap {...props} />} />
      <Route path="/bio" render={() => <Page404 {...props} />} />
      <Route path="/szolgaltatasok" render={() => <Page404 {...props} />} />
      <Route path="/referenciak" render={() => <Page404 {...props} />} />
      <Route path="/gdpr" render={() => <GdprTajekozatato {...props} />} />
      <Route path="/elerhetosegek" render={() => <ElerhetosegekBase {...props} />} />
      <Route path="/404" component={Page404} />
    </React.Fragment>
  );
}

export default PublicRoutes;
