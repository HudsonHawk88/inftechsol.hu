import React from "react";

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
