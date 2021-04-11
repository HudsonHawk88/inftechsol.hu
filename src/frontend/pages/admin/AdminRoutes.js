import React from "react";
import { Route } from "react-router-dom";

import FelhasznalokBase from "./views/Felhasznalok/FelhasznalokBase";
import ReferenciakBase from "./views/Referenciak/ReferenciakBase";
import Kezdolap from "./views/Kezdolap/Kezdolap";

function AdminRoutes(props) {
    const user = props.data && props.data.user && props.data.user;

    return (
        <React.Fragment>
            <Route
                path="/admin"
                exact
                render={() => {
                    return (
                    <Kezdolap
                        notification={props.notification}
                        data={{
                        user: user,
                        }}
                    />
                    );
                }}
            />
            <Route
                path="/admin/users"
                exact
                render={() => {
                    return (
                    <FelhasznalokBase
                        notification={props.notification}
                        data={{
                        user: user,
                        }}
                    />
                    );
                }}
            />
            <Route
                exact
                path="/admin/referenciak"
                render={() => {
                    return (
                    <ReferenciakBase
                        notification={props.notification}
                        data={{
                        user: user,
                        }}
                    />
                    );
                }}
            />
        </React.Fragment>
    );
}

export default AdminRoutes;