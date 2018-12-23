import React from "react";
import { ClipLoader } from "react-spinners";

import "./style.css";

const LoadingSpinner = ({ size = 24 }) => {
  return (
    <div className="loading-spinner-wrapper">
      <ClipLoader size={size} />
    </div>
  );
};

export default LoadingSpinner;
