import React from "react";

export const CardIndicatorItem = ({
  titulo = "Titulo",
  subTitulo = "Subtitulo",
  pie = "pie",
  icono = "",
  colorBorde = "#1976d2",
}) => {
  return (
    <div
      className="bg-white rounded-3 shadow-sm px-3 py-2 mb-2"
      style={{ borderLeft: `4px solid ${colorBorde}`, minWidth: 250 }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <h6 className="text-muted my-1">{titulo}</h6>
        <span className="text-dark" style={{ fontSize: 20 }}>
          {icono}
        </span>
      </div>
      <div className="my-2">
        <span className="fw-bold" style={{ fontSize: 28 }}>
          {subTitulo}
        </span>
      </div>
      <div>
        <span className="fw-light text-muted small">{pie}</span>
      </div>
    </div>
  );
};
