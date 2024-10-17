import React from "react";
import { useSelector } from "react-redux";
import { BadgesFilters } from "../../../../utils/BadgesFilters";


const filtersDescrip = {
  periodo: "Periodo",
  ciclo: "Ciclo",
  fase: "Fase",
  rubro: "Rubro",
  recurso: "Recurso",
  clasificador: "Clasificador",
  operacion: "Operación",
  documento: "Documento",
  numerodoc: "Número de Documento",
  glosa: "Glosa",
  siafexped: "SIAF Expediente",
  siafcertifanual: "SIAF Certificado Anual",
  siafprov: "SIAF Proveedor",
  siafctacte: "SIAF Cuenta Corriente",
  sigaexped: "SIGA Expediente",
  sigaprecomp: "SIGA Precompromiso",
  sigaprov: "SIGA Proveedor",
  sigaplancont: "SIGA Plan Contable",
};

const formatPeriodo = (periodo) => {
  const [start, end] = periodo;
  return `${start.split("-").reverse().join("/")} - ${end.split("-").reverse().join("/")}`;
};

const getLabel = (item) => item?.label || item;

const filterAndFormatDescrip = (filterSearch) => {
  let filteredDescrip = Object.fromEntries(
    Object.entries(filterSearch).filter(([key, value]) => value !== "" && value !== null)
  );

  if (filteredDescrip.periodo) {
    filteredDescrip.periodo = formatPeriodo(filteredDescrip.periodo);
  }

  ["documento", "siafprov", "sigaprov"].forEach((key) => {
    if (filteredDescrip[key]) {
      filteredDescrip[key] = getLabel(filteredDescrip[key]);
    }
  });

  return filteredDescrip;
};

export const ExecutionSearchSummary = () => {
  const { filterSearch } = useSelector((state) => state.filterSearch);

  const filteredDescrip = filterAndFormatDescrip(filterSearch);

  const filters = Object.keys(filteredDescrip).map((key) => {
    return `${filtersDescrip[key]}: ${filteredDescrip[key]}`;
  });

  return (
    <>
    <h6 className="text-color-default">Resumen de búsqueda</h6>
      <BadgesFilters filters={filters} />
    </>
  );
};