import React from "react";
import { Route } from 'react-router-dom';

import FelhasznalokBase from "../pages/admin/Felhasznalok/FelhasznalokBase";
import SzolgaltatasokBase from '../pages/admin/Szolgaltatasok/SzolgaltatasokBase';
import ReferenciakBase from "../pages/admin/Referenciak/ReferenciakBase";
import ElerhetosegekBase from "../pages/admin/Elerhetosegek/ElerhetosegekBase";
import GdprBase from "../pages/admin/GDPR/GdprBase";
import Kezdolap from "../pages/admin/Kezdolap/Kezdolap";

const AdminRoutes = (props) => {
  return (
    <React.Fragment>
      <Route
        exact
        path="/admin"
        render={() => <Kezdolap {...props} />}
      />
      <Route
        path="/admin/users"
        render={() => {
          return <FelhasznalokBase {...props} />;
        }}
      />
      <Route
        path="/admin/szolgaltatasok"
        render={() => {
          return <SzolgaltatasokBase {...props} />;
        }}
      />
      <Route
        path="/admin/gdpr"
        render={() => {
          return <GdprBase {...props} />;
        }}
      />
      <Route
        path="/admin/referenciak"
        render={() => {
          return <ReferenciakBase {...props} />;
        }}
      />
      <Route
        path="/admin/elerhetosegek"
        render={() => {
          return <ElerhetosegekBase {...props} />;
        }}
      />
    </React.Fragment>
  );
}

export default AdminRoutes;
