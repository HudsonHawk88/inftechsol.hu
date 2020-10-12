import React from "react";
import { Spinner } from "reactstrap";

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
