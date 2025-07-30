import React from "react";
import "./LoadingSpinner.scss";

const LoadingSpinner: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = "",
}) => {
  return (
    <div
      className={`spinner ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default LoadingSpinner;
