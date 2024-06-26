import { Button } from "react-bootstrap";

import { formatNumber } from "../../../utils/varios";
import FileDollarIcon from "../../../icons/FileDollarIcon";



export const RequeComprometeItemComponent = ({ requeGasto, i, onClicSelectFuente }) => {
  
  const {
    C_clapre,
    C_depen,
    C_secfun,
    C_objpoi,
    C_metapoi,
    C_activpoi,
    total_reque,
    presupuesto,
    N_clapre_desc,
    N_metapresup_desc,
    N_depend_Descripcion,
    N_activpoi_desc,
  } = requeGasto;

   return (
    <>
      <tr>
        <td className="align-middle pt-2">
          <img
            src="/images/chevron-down-small.svg"
            className="me-1 thumbnail"
            alt="Ver detalle"
            data-bs-toggle="collapse"
            data-bs-target={`#r${i}`}
            role="button"
          />
          {C_clapre}
        </td>
        <td className="align-middle">{C_secfun}</td>
        <td className="align-middle">{C_depen}</td>
        <td className="align-middle">{C_activpoi}</td>
        <td className="text-end align-middle">
          S/. {formatNumber(total_reque)}
        </td>
        <td className="text-end align-middle">
          {presupuesto.map((presup, i) => (
            <p className="m-0 p-0 fw-bold" key={`FR-${presup.C_fuefin}-${presup.C_recurso}`}>
              {presup.total_precompromiso > 0 && (
                <> 
                  {presup.C_fuefin}/{presup.C_recurso}
                </>
              )}
            </p>
          ))}
        </td>
        <td className="text-end align-middle">
          {presupuesto.map((presup) => (
            <p className="m-0 p-0 fw-bold" key={`MONTO-${presup.C_fuefin}-${presup.C_recurso}`}>
              {presup.total_precompromiso > 0 && (
                <>S/. {formatNumber(presup.total_precompromiso)}</>
              )}
            </p>
          ))}
        </td>
        <td className="text-end align-middle">
          <Button
            size="sm"
            variant="outline-primary"
            className="ps-1"
            onClick={ () => onClicSelectFuente(requeGasto)}
          >
            <FileDollarIcon className="me-1 thumbnail" />
            <small className="pt-1">Asignar fuente</small>
          </Button>
        </td>
      </tr>
      <tr
        className="collapse accordion-collapse"
        id={`r${i}`}
        data-bs-parent=".table"
      >
        <td className="ps-2" colSpan="8">
          <small>
            <p className="m-0 p-0">
              <span className="text-muted">Clasificador: </span>
              {C_clapre} - {N_clapre_desc}
            </p>
            <p className="m-0 p-0">
              <span className="text-muted">Secuencia funcional: </span>
              {C_secfun} - {N_metapresup_desc}
            </p>
            <p className="m-0 p-0">
              <span className="text-muted">Dependencia: </span>
              {C_depen} - {N_depend_Descripcion}
            </p>
            <p className="m-0 p-0">
              <span className="text-muted">Tarea: </span>
              {C_activpoi} - {N_activpoi_desc}
            </p>
            <p className="m-0 p-0">
              <span className="text-muted">Objetivo/Meta: </span>
              {C_objpoi} / {C_metapoi}
            </p>
            <p className="m-0 p-0">
              <span className="text-muted">Monto del requerimiento: </span>
              S/. {formatNumber(total_reque)}
            </p>
          </small>
        </td>
      </tr>
    </>
  );
};
