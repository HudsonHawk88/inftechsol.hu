import React from "react";
import { Route } from "react-router-dom";

import FelhasznalokBase from "./views/Felhasznalok/FelhasznalokBase";
import ReferenciakBase from "./views/Referenciak/ReferenciakBase";
import Kezdolap from "./views/Kezdolap/Kezdolap";

function AdminRoutes(props) {
    const user = props.data && props.data.user && props.data.user;
    console.log(props);
    return (
        <React.Fragment>
            <Route
                path="/admin"
                exact
                render={(routes) => {
                    return (
                    <Kezdolap
                        {...routes}
                        {...props}
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
                render={(routes) => {
                    return (
                    <FelhasznalokBase
                        {...props}
                        {...routes}
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
                render={(routes) => {
                    return (
                    <ReferenciakBase
                        {...props}
                        {...routes}
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