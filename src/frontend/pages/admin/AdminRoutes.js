import React from "react";
import { CrumbRoute } from "../../commons/Components";

import FelhasznalokBase from "./views/Felhasznalok/FelhasznalokBase";
import ReferenciakBase from "./views/Referenciak/ReferenciakBase";
import ElerhetosegekBase from "./views/Elerhetosegek/ElerhetosegekBase";
import Kezdolap from "./views/Kezdolap/Kezdolap";

function AdminRoutes(props) {
  return (
    <React.Fragment>
      <CrumbRoute
        title="Főoldal"
        path="/admin"
        render={() => props.match.isExact && <Kezdolap {...props} />}
      />
      <CrumbRoute
        title="Felhasználók"
        path="/admin/users"
        render={() => {
          return <FelhasznalokBase {...props} />;
        }}
      />
      <CrumbRoute
        title="Referenciák"
        path="/admin/referenciak"
        render={() => {
          return <ReferenciakBase {...props} />;
        }}
      />
      <CrumbRoute
        title="Elérhetőségek"
        path="/admin/elerhetosegek"
        render={() => {
          return <ElerhetosegekBase {...props} />;
        }}
      />
    </React.Fragment>
  );
}

export default AdminRoutes;
