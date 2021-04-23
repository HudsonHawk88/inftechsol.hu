import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "react-breadcrumbs";

import Header from "../../components/Header/Header";
// import Sidebar from "../../components/Sidebar/Sidebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminRoutes from "./AdminRoutes";
import Services from "./Services.js";

function Admin(props) {
  const user = props && props.datas && props.datas.user && props.datas.user;

  return (
    <div className="admin-app">
      <Header
        {...props}
        user={user && user}
        toggleSidebar={props.toggleSidebar}
        isSidebarOpen={props.isSidebarOpen}
        logOut={props.logOut}
      />

      <Sidebar />

      <main id="content" className="content">
        <Breadcrumbs className="breadcrumbs" separator=" > " />
        <AdminRoutes {...props} user={user && user} />
      </main>
    </div>
  );
}

export default Admin;
