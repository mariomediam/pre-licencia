import { useEffect } from "react";
import { Table } from "react-bootstrap";

// import { eliminarTributoArchivo } from "../../../services/tesoreroService";
import { TributoArchivoListarItemComponent } from "./TributoArchivoListarItemComponent";



export const TributoArchivoListarComponent = ({ cTipOpe, NTipOpe, fetchTributoArchivo, listTributoArchivo, isLoading, fetchTributoPeriodosDisponibles }) => {


  useEffect(() => {
    fetchTributoArchivo();
  }, [fetchTributoArchivo]);


  if (isLoading) return (<div>Cargando...</div>)

  return (
    <div className="">
        
      <h5 className="text-color-default text-capitalize">{NTipOpe?.toString().toLowerCase()}</h5>



      <div style={{ border: "1px solid lightgrey" }}>
        <Table
          hover
          responsive
          className="caption-top mb-1 animate__animated animate__fadeIn animate__faster"
        >
          <thead>
            <tr className="color-header2 text-white">
              {!["01", "02"].includes(cTipOpe) && (
                <th className="align-middle m-0">Mes</th>
              )}

              <th className="align-middle m-0">Fecha de carga</th>
              <th className="align-middle m-0">Responsable</th>
              <th className="text-center align-middle m-0 p-0"></th>
              
            </tr>
          </thead>
          <tbody>
            {listTributoArchivo.map(
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
            )}
          </tbody>
        </Table>
      </div>

    </div>
  );
};
