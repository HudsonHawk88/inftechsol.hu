import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";

function Kezdolap() {
  return (
    <div className="card" style={{ marginLeft: "-15px", marginRight: "-15px" }}>
      <Carousel
        infiniteLoop
        autoPlay
        stopOnHover
        showThumbs={false}
        dynamicHeight
        interval={10000}
      >
        <React.Fragment>
          <img
            className="carousel-image"
            src="https://spectrum.ieee.org/image/MzI0NDQ4Ng.jpeg"
          />
          <p className="carousel-legend">
            Vállalom egyedi weboldalak, webshopok készítését, igény szerint
            keresőoptimalizálással és/vagy saját fejlesztésű tartalomkezelő
            rendszerrel is. Ingyenes személyreszabott ajálatért keressen meg
            elérhetőségeim egyikén!
            <br />
            <button className="button--primary text--bgcolor">
              <NavLink className="nav-link" to="/elerhetosegek">
                Ajánlatkérés
              </NavLink>
            </button>
          </p>
        </React.Fragment>
        <React.Fragment>
          <img
            className="carousel-image"
            src="https://citypcrepairs.com/wp-content/uploads/2019/06/PC-Mac-ipad-iphone-repairs-edinburgh-1030x568.jpg"
          />
          <p className="carousel-legend">
            Számítógépe lassú, akadozik, esetleg nem működik? Fejleszteni,
            bővíteni szeretné? Vagy csak szeretné megfelelő módon karbantartani?
            Linux, Windows és MacOS rendszerű számítógépekben, androidos okos
            eszközökben is otthon vagyok, több éves tapasztalatom van mindegyik
            környezetben! Keressen meg bizalommal!
            <br />
            <button className="button--primary text--bgcolor">
              <NavLink className="nav-link" to="/elerhetosegek">
                Érdeklődöm
              </NavLink>
            </button>
          </p>
        </React.Fragment>
        <React.Fragment>
          <img
            className="carousel-image"
            src="https://www.meetcharlescounty.com/clientuploads/StartingandGrowingBusiness-compressor.jpg"
          />
          <p className="carousel-legend">
            Informatikai szaktanácsadással és igény szerint oktatással is állok
            rendelkezésre magánszemélyeknek és vállalkozásoknak egyaránt!
            Segítséget nyújtok akár csak egy program, programcsomag, vagy
            operációs rendszer használatával kapcsolatban is.
            <br />
            <button className="button--primary text--bgcolor">
              <NavLink className="nav-link" to="/elerhetosegek">
                Tanulni szeretnék
              </NavLink>
            </button>
          </p>
        </React.Fragment>
      </Carousel>
    </div>
  );
}

export default Kezdolap;
