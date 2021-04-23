/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Services from "./Services";

function GdprTajekoztato(props) {
  const [gdprJson, setGdprJson] = useState(null);

  const getGdpr = () => {
    Services.listGdpr().then((res) => {
      if (!res.err) {
        setGdprJson(res[0]);
      }
    });
  };

  useEffect(() => {
    if (window.location.pathname === "/gdpr") {
      getGdpr();
    }
  }, [window.location.pathname]);

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-12">
          <div className="gdpr">
            {gdprJson && (
              <div
                dangerouslySetInnerHTML={{
                  __html: gdprJson.tartalom,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GdprTajekoztato;
