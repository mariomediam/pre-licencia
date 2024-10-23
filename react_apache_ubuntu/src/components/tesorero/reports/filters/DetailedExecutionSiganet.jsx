import { Table } from "react-bootstrap";
import { DetailedExecutionSiganetItem } from "./DetailedExecutionSiganetItem";

export const DetailedExecutionSiganet = ({ data = [] }) => {
  console.log("data siganet", data);
  return (
    <div style={{ border: "1px solid lightgrey", minWidth: "992px" }}>
      <Table
        size="sm"
        hover
        responsive
        className="caption-top mb-1 animate__animated animate__fadeIn animate__faster"
      >
        <thead>
          <tr className="color-header2 text-white">
            <th className="align-middle m-0">
              <small>Expediente</small>
            </th>
            <th className="align-middle m-0" title="Ciclo / Fase">
              <small>C / F</small>
            </th>
            <th className=" align-middle m-0 p-0" title="Rubro / Tipo de recurso">
              <small>Rb / Tr</small>
            </th>
            <th className=" align-middle m-0 p-0">
              <small>Documento</small>
            </th>
            <th className=" align-middle m-0 p-0">
              <small>Presupuestal</small>
            </th>
            <th className=" align-middle m-0 p-0">
              <small>Proveedor</small>
            </th>
            <th className=" align-middle m-0 p-0">
              <small>Importe</small>
            </th>
            <th className=" align-middle m-0 p-0">
              <small>Glosa</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <DetailedExecutionSiganetItem key={index} record={record} />
          ))}

          {/* {listTributoArchivo.map(
              (
                {
                  C_Archivo,
                  C_TipOpe,
                  M_Archivo_Anio,
                  M_Archivo_Mes,
                  D_Archivo_FecDig,
                  C_Usuari_Login,
                  N_Archivo_PC,
                },
                i
              ) => (
                <tr key={C_Archivo}>
                  <TributoArchivoListarItemComponent
                    {...{
                      C_Archivo,
                      C_TipOpe,
                      M_Archivo_Anio,
                      M_Archivo_Mes,
                      D_Archivo_FecDig,
                      C_Usuari_Login,
                      N_Archivo_PC,
                    }} fetchTributoPeriodosDisponibles = {fetchTributoPeriodosDisponibles}  fetchTributoArchivo = {fetchTributoArchivo} NTipOpe={NTipOpe}
                  />
                </tr>
              )
            )} */}
        </tbody>
      </Table>
    </div>
  );
};
