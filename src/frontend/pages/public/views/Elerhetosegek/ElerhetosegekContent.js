/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import Services from './Services';

function ElerhetosegekContent(props) {

    console.log(props);

    const [ elerhetosegekJson, setElerhetosegekJson ] = useState([]);

    const getElerhetosegek = () => {
        Services.listElerhetosegek().then((res) => {
            if (!res.err) {
                console.log(res);
                setElerhetosegekJson(res[0]);
            } else {
                props.notification();
            }
        })
    }

    useEffect(() => { 
        if (window.location.pathname === "/elerhetosegek") {
            getElerhetosegek();
        } 
      }, [window.location.pathname]);

      const undefinedToNull = (value) => {
        if (value === "undefined") {
          return null;
        } else {
          return value;
        }
      }

      const cimFormatter = (row) => {
        if (undefinedToNull(row.hazszam)) {
          if (undefinedToNull(row.emelet)) {
            if (undefinedToNull(row.epulet)) {
              return (`${row.irszam}, ${row.telepules && row.telepules.telepulesnev}, ${row.kozterulet} ${row.hazszam}. ${row.epulet} ép. ${row.emelet}/${row.ajto}.`);
            } else {
              return (`${row.irszam}, ${row.telepules && row.telepules.telepulesnev}, ${row.kozterulet} ${row.hazszam}. ${row.emelet}/${row.ajto}.`);
            }
          } else {
            return (`${row.irszam}, ${row.telepules && row.telepules.telepulesnev}, ${row.kozterulet} ${row.hazszam}.`);
          }
        } else if (undefinedToNull(row.postafiok)) {
          return (`${row.irszam}, ${row.telepules && row.telepules.telepulesnev}, ${row.postafiok}.`);
        } else {
          return (`${row.irszam}, ${row.telepules && row.telepules.telepulesnev}, ${row.hrsz}.`);
        }
      }

    return (
        <div className="card">
            <div className="row">
            <div className="col-md-12" />
            <br />
            <div className="col-md-12">
            {/* <div className="jumbotron jumbotron-sm">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <h1 className="h2">
                            Elérhetőségek
                        </h1>
                    </div>
                </div>
            </div> */}

            <div className="col-md-12">
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <div className="well">
                            <h3><i className="fa fa-user fa-1x"></i> Név:</h3>
                            <p>Tóth Gergő egyéni vállalkozó - vállalkozásvezető</p>            
                            <br />
                            <br />
                            <h3><i className="fa fa-home fa-1x"></i> Cím:</h3> 
                            <p>{cimFormatter(elerhetosegekJson)}</p>
                            <br />
                            <br />
                            <h3><i className="fa fa-envelope fa-1x"></i> E-mail cím:</h3>
                            <p>{elerhetosegekJson.email}</p>
                            <br />
                            <br />
                            <h3><i className="fa fa-facebook-official fa-1x"></i> Facebook:</h3>
                            <p><a href="https://www.facebook.com/inftechsol19" target="_blank">facebook.com/inftechsol19</a></p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                    <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10916.525349074485!2d16.8470072!3d46.8411044!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc666c6ef8630ae7d!2sInfTechSol!5e0!3m2!1shu!2shu!4v1618348901211!5m2!1shu!2shu" width="100%" height="100%" style={{ border: "0px", borderRadius: "10px" }} allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
            </div>
            </div>
    </div>
    );
}

export default ElerhetosegekContent;