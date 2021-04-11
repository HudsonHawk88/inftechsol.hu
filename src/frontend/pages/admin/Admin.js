import React from "react";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function Admin(props) {
  const user = props.data && props.data.user && props.data.user;
  return (
    <React.Fragment>
       <Header {...props} toggleSidebar={props.toggleSidebar} isSidebarOpen={props.isSidebarOpen} data={{ user: user }} logOut={props.logOut} />
          <Sidebar width={250} isSidebarOpen={props && props.isSidebarOpen} />
          <main id="content" className="sidebar-fixed container-fluid">
              {props.children}
          </main>
    </React.Fragment>
  );
}

export default Admin;
