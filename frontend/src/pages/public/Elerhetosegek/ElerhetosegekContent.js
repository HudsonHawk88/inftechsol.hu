/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createRef } from "react";
import { Form, InputGroup, Input } from 'reactstrap';
import ReCAPTCHA from "react-google-recaptcha";

import Services from "./Services";

function ElerhetosegekContent(props) {
  const recaptchaRef = createRef();
  const [elerhetosegekJson, setElerhetosegekJson] = useState([]);
  const [mailObj, setMailObj] = useState({
    nev: "",
    email: "",
    telefon: "",
    tema: "",
    uzenet: "",
  });

  const [ elfogad, setElfogad ] = useState(false);

  const setDefaultValues = () => {
    setMailObj({
      nev: "",
      email: "",
      telefon: "",
      tema: "",
      uzenet: "",
    });
    setElfogad(false);
  };

  const getElerhetosegek = () => {
    Services.listElerhetosegek().then((res) => {
      if (!res.err) {
        setElerhetosegekJson(res[0]);
      } else {
        // props.notification('error', res.err);
      }
    });
  };

  useEffect(() => {
    if (window.location.pathname === "/elerhetosegek") {
      getElerhetosegek();
      
      // recaptchaRef.current.reset();
    }
  }, [window.location.pathname]);

  // const handleRechaptchaChange = (token) => {
  //   if (token) {
  //     setIsVerifired(true);
  //   } else {
  //     setIsVerifired(false);
  //   }
  // }

  const sendMail = async (e) => {
    e.preventDefault();
    const token = await recaptchaRef.current.executeAsync();
    const secret = process.env.reachaptchaSecretKey;

    const rechaptchaObj = {
      secret: secret,
      response: token
    };

    Services.checkRechaptcha(rechaptchaObj).then((res => {
      if (res.success) {
        Services.sendMail(mailObj).then((res) => {
          if (!res.err) {
            setDefaultValues();
            // recaptchaRef.current.reset();
            // props.notification("success", res.msg);
          } else {
            // props.notification("success", res.err);
            // recaptchaRef.current.reset();
          }
        });
      }
      }
    ));
     
  };

  const undefinedToNull = (value) => {
    if (value === "undefined") {
      return null;
    } else {
      return value;
    }
  };

  const nevFormatter = (row) => {
    return `${row.titulus} ${row.vezeteknev} ${row.keresztnev}`;
  };

  const cimFormatter = (row) => {
    if (undefinedToNull(row.hazszam)) {
      if (undefinedToNull(row.emelet)) {
        if (undefinedToNull(row.epulet)) {
          return `${row.irszam}, ${
            row.telepules && row.telepules.telepulesnev
          }, ${row.kozterulet} ${row.hazszam}. ${row.epulet} ép. ${
            row.emelet
          }/${row.ajto}.`;
        } else {
          return `${row.irszam}, ${
            row.telepules && row.telepules.telepulesnev
          }, ${row.kozterulet} ${row.hazszam}. ${row.emelet}/${row.ajto}.`;
        }
      } else {
        return `${row.irszam}, ${
          row.telepules && row.telepules.telepulesnev
        }, ${row.kozterulet} ${row.hazszam}.`;
      }
    } else if (undefinedToNull(row.postafiok)) {
      return `${row.irszam}, ${row.telepules && row.telepules.telepulesnev}, ${
        row.postafiok
      }.`;
    } else {
      return `${row.irszam}, ${row.telepules && row.telepules.telepulesnev}, ${
        row.hrsz
      }.`;
    }
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setMailObj({
      ...mailObj,
      [e.target.name]: value,
    });
  };

  return (
    <div className="card card-contact">
      <div className="row contact-row">
        <div className="col-md-6 contact-info">
          <h1>Kérdése, észrevétele van?</h1>
          <div>
            <div className="icon-block pb-3">
              <span className="icon-block__icon">
                <span
                  className="mbri-letter mbr-iconfont"
                  media-simple="true"
                ></span>
              </span>
              <h4 className="icon-block__title align-left mbr-fonts-style display-5">
                Ne habozzon felkeresni!
              </h4>
            </div>
            <div className="icon-contacts pb-3">
              <h5 className="align-left mbr-fonts-style display-7">
                Várom megkeresését az alábbi elérhetőségeken!
              </h5>
              <p className="mbr-text align-left mbr-fonts-style display-7">
                Név: {nevFormatter(elerhetosegekJson)} <br />
                Cím: {cimFormatter(elerhetosegekJson)} <br />
                Telefon: {elerhetosegekJson.telefon} <br />
                E-mail: {elerhetosegekJson.email}
              </p>
            </div>
          </div>
          <div data-form-type="formoid">
            <div data-form-alert="" hidden="">
              Köszönöm, hogy kitölti az űrlapot!
            </div>
            <div>
              <Form onSubmit={sendMail}>
                <div className="row">
                  <div className="col-md-6 multi-horizontal" data-for="nev">
                    <InputGroup>
                      <Input
                        type="text"
                        className="form-control input"
                        name="nev"
                        id='nev'
                        placeholder="Név"
                        onChange={(e) => handleInputChange(e)}
                        value={mailObj.nev}
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-6 multi-horizontal" data-for="telefon">
                    <InputGroup>
                      <Input
                        type="text"
                        className="form-control input"
                        name="telefon"
                        id='telefon'
                        placeholder="Telefon"
                        onChange={(e) => handleInputChange(e)}
                        value={mailObj.telefon}
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-6" data-for="email">
                    <InputGroup>
                      <Input
                        type="text"
                        className="form-control input"
                        name="email"
                        id='email'
                        placeholder="E-mail"
                        onChange={(e) => handleInputChange(e)}
                        value={mailObj.email}
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-6" data-for="tema">
                    <InputGroup>
                      <Input
                        type="text"
                        className="form-control input"
                        name="tema"
                        id='tema'
                        placeholder="Megkeresés oka/Téma"
                        onChange={(e) => handleInputChange(e)}
                        value={mailObj.tema}
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-12" data-for="uzenet">
                    <InputGroup>
                      <Input
                        type="textarea"
                        className="form-control input"
                        name="uzenet"
                        id='uzenet'
                        rows="3"
                        placeholder="Üzenet"
                        style={{ resize: "none" }}
                        onChange={(e) => handleInputChange(e)}
                        value={mailObj.uzenet}
                        required
                      />
                    </InputGroup>
                  </div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.reachaptchaSiteKey}
                    onChange={() => { recaptchaRef.current.reset() }}
                  />
                  <div
                    className="input-group-btn col-md-12"
                    style={{ marginTop: "10px" }}
                  >
                    Megismertem és elfogadom az <u><a href="/gdpr" target="_blank"> Adatvédelmi szabályzatot</a></u><br />
                    <input type="checkbox" name="elfogad" onChange={() => setElfogad(!elfogad)} checked={elfogad} /><br /><br />
                    <button
                      type="submit"
                      className="btn btn-primary btn-form display-4"
                      disabled={!elfogad}
                      // onClick={() => sendMail()}
                    >
                      KÜLDÉS
                    </button>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12" />
                  <br />
                </div>
              </Form>
            </div>
          </div>
        </div>
        <br />
        <div className="col-md-6">
          <div className="google-map">
            <iframe
              title="map"
              frameBorder="0"
              style={{ border: "darkgrey solid 1px" }}
              width="100%"
              height="100%"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10916.525349074485!2d16.8470072!3d46.8411044!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc666c6ef8630ae7d!2sInfTechSol!5e0!3m2!1shu!2shu!4v1618348901211!5m2!1shu!2shu"
              allowFullScreen=""
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElerhetosegekContent;
