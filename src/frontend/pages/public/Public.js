import React from "react";

import PublicHeader from "../../components/Header/PublicHeader";

function Public(props) {
  return (
    <React.Fragment>
        <PublicHeader {...props} isLight={props.isLight} toggleCheck={props.toggleCheck} />
        <main id="public-content" className="public-content container-fluid">
          {props.children}
        </main>
        <footer className="public-footer">
          Designed and created by Inftechsol 2021
        </footer>
    </React.Fragment>
  );
}

export default Public;