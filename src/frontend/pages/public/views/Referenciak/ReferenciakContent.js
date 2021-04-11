import React, { useEffect, useState } from "react";
import Services from "./Services";

function ReferenciakContent(props) {
  const [referenciakJson, setReferenciakJson] = useState(null);

  const getReferenciak = () => {
    Services.listReferenciak().then((res) => {
      if (!res.err) {
        setReferenciakJson(res);
      }
    });
  };

  useEffect(() => { 
    if (props.location.pathname === "/referenciak") {
      getReferenciak();
    } 
  }, [props.location.pathname]);

  const renderReferenciak = () => {
    if (referenciakJson && referenciakJson.length !== 0) {
      let referenciak = JSON.parse(JSON.stringify(referenciakJson));

      return referenciak.map((referencia) => {
        return (
          <div key={referencia.id}>
            <div>
              Cégnév: {referencia.company_name}
              <br />
              Leírás: {referencia.description}
            </div>
            <br />
          </div>
        );
      });
    }
  };

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-12">
          <span> Hello World! </span>
          <br />
          <br />
          {renderReferenciak()}
        </div>
      </div>
    </div>
  );
}

export default ReferenciakContent;
