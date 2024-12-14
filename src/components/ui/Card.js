import React from "react";

export const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl ${className}`}
    {...props}
  >
    {children}
  </div>
);
