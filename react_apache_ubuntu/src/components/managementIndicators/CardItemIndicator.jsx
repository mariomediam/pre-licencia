import React from "react";

export const CardItemIndicator = ({ indicator }) => {
  const { component } = indicator;
  return (
    <div className="border rounded shadow-sm p-3 card-indicator d-flex flex-column justify-content-center align-items-center">            
      {component}
    </div>
  );
};
