import React from "react";

function Kezdolap(props) {
  const user = props && props.user;

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-12">
          <div>Üdvözlöm {user && user.vezeteknev + " " + user.keresztnev}</div>
        </div>
      </div>
    </div>
  );
}

export default Kezdolap;
