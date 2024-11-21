import React from "react";

export const CardItemIndicator = ({ indicator }) => {
  const { component } = indicator;
  return (
    <div className="border rounded shadow-sm p-3">      
      <div>{component}</div>
    </div>
  );
};
