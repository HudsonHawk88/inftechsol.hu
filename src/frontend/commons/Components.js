import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Breadcrumb } from "react-breadcrumbs";

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

export const CrumbRoute = ({
  component: Component,
  includeSearch = false,
  render,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(routeProps) => (
        <Breadcrumb
          data={{
            title: props.title,
            pathname: routeProps.match.url,
            search: includeSearch ? routeProps.location.search : null,
          }}
        >
          {Component ? <Component {...routeProps} /> : render(routeProps)}
        </Breadcrumb>
      )}
    />
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
