import React, { useState, useEffect } from "react";
import {
  App,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Editor,
} from "@organw/wysiwyg-editor";
import { Table, Input } from 'reactstrap';

export const LoadingPage = () => {
  return (
    <div className="spinner">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "200px", height: "200px" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export const ToggleSwitch = (props) => {
  return (
    <div
      className={props.className}
      onClick={() => props.onClick(!props.value)}
    >
      <input
        type="checkbox"
        className={`${props.className}-checkbox`}
        name={props.name}
        id={props.id}
        onChange={props.onClick}
        checked={props.value}
      />
      <label className={`${props.className}-label`} htmlFor={props.name}>
        <span
          className={`${props.className}-inner`}
          data-on={props.on}
          data-off={props.off}
        />
        <span className={`${props.className}-switch`} />
      </label>
    </div>
  );
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export const googleAnalytics = () => {
  const layer = window.dataLayer ? window.dataLayer : [];
  function gtag() {
    layer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "UA-195060285-1");
};

export const Wysiwyg = (props) => {
  let isView = false;
  if (props.contentEditable !== null && props.contentEditable !== undefined) {
    isView = true;
  }

  return (
    <App fontId={props.fontId} value={props.value} onChange={props.onChange}>
      {!isView && (
        <Toolbar className="position-sticky">
          <ToolbarGroup>
            <ToolbarItem type="mark" tag="b" name="bold" tooltip="Félkövér">
              <i className="fa fa-bold" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem type="mark" tag="code" name="code" tooltip="Kód">
              <i className="fa fa-code" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem type="mark" tag="i" name="italic" tooltip="Dőlt">
              <i className="fa fa-italic" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="mark"
              tag="u"
              name="underline"
              tooltip="Aláhúzott"
            >
              <i className="fa fa-underline" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="mark"
              tag="s"
              name="strikethrough"
              tooltip="Áthúzott"
            >
              <i className="fa fa-strikethrough" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem type="block" tag="quote" name="quote" tooltip="Idézet">
              <i className="fa fa-quote-right" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="fontsize"
              tag="fontsize"
              name="fontsize"
              tooltip="Betűméret"
            >
              Betűméret&nbsp;
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem
              type="block"
              tag="h1"
              name="heading-one"
              tooltip="Címsor 1"
            >
              H1
            </ToolbarItem>
            <ToolbarItem
              type="block"
              tag="h2"
              name="heading-two"
              tooltip="Címsor 2"
            >
              H2
            </ToolbarItem>
            <ToolbarItem
              type="block"
              tag="h3"
              name="heading-three"
              tooltip="Címsor 3"
            >
              H3
            </ToolbarItem>
            <ToolbarItem
              type="block"
              tag="h4"
              name="heading-four"
              tooltip="Címsor 4"
            >
              H4
            </ToolbarItem>
            <ToolbarItem
              type="block"
              tag="h5"
              name="heading-five"
              tooltip="Címsor 5"
            >
              H5
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem
              type="align"
              tag="left"
              name="align-left"
              tooltip="Balra igazítás"
            >
              <i className="fa fa-align-left" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="align"
              tag="center"
              name="align-center"
              tooltip="Középre igazítás"
            >
              <i className="fa fa-align-center" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="align"
              tag="rignt"
              name="align-right"
              tooltip="Jobbra igazítás"
            >
              <i className="fa fa-align-right" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="block"
              tag="li"
              name="list-item"
              tooltip="Sima lista"
            >
              <i className="fa fa-list" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="block"
              tag="ul"
              name="bulleted-list"
              tooltip="Pontozott lista"
            >
              <i className="fa fa-list-ul" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="block"
              tag="ol"
              name="numbered-list"
              tooltip="Számozott lista"
            >
              <i className="fa fa-list-ol" aria-hidden="true"></i>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem
              type="table"
              tag="table"
              name="table"
              tooltip="Táblázat"
            >
              <i className="fa fa-table" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="table"
              tag="table"
              name="table_left"
              tooltip="Balra igazított táblázat"
            >
              <i
                className="fa fa-table"
                aria-hidden="true"
                style={{ marginRight: 5 }}
              ></i>{" "}
              <i className="fa fa-align-left" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="table"
              tag="table"
              name="table_center"
              tooltip="Középre igazított táblázat"
            >
              <i
                className="fa fa-table"
                aria-hidden="true"
                style={{ marginRight: 5 }}
              ></i>{" "}
              <i className="fa fa-align-center" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="table"
              tag="table"
              name="table_right"
              tooltip="Jobbra igazított táblázat"
            >
              <i
                className="fa fa-table"
                aria-hidden="true"
                style={{ marginRight: 5 }}
              ></i>{" "}
              <i className="fa fa-align-right" aria-hidden="true"></i>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem type="link" tag="a" name="link" tooltip="Link">
              <i className="fa fa-link" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem type="image" tag="img" name="image" tooltip="Kép">
              <i className="fa fa-picture-o" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="image"
              tag="img"
              name="float_left"
              tooltip="Kép szöveggel balra"
            >
              <i className="fa fa-indent" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="image"
              tag="img"
              name="float_right"
              tooltip="Kép szöveggel jobbra"
            >
              <i className="fa fa-outdent" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem type="embed" tag="embed" name="embed" tooltip="Videó">
              <i className="fa fa-video-camera" aria-hidden="true"></i>
            </ToolbarItem>
            <ToolbarItem
              type="button"
              tag="button"
              name="button"
              tooltip="CTA gomb"
            >
              CTA gomb
            </ToolbarItem>
            <ToolbarItem type="emoji" tag="emoji" name="emoji" tooltip="Emoji">
              <i className="fa fa-smile-o" aria-hidden="true"></i>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarItem type="text" tag="${JEGY_ÁR}" name="text" id="text">
              JEGY_ÁR
            </ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      )}
      <Editor />
    </App>
  );
};
