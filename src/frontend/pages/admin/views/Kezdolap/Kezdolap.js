import React from "react";

function Kezdolap(props) {
  const user = props.data && props.data.user && props.data.user;

  return (
    <div className="card">
      <div>Üdvözlöm {user && user.vezeteknev + " " + user.keresztnev}</div>
    </div>
  );
}

export default Kezdolap;