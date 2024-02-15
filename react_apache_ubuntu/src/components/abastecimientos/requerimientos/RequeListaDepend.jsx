import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Spinner, Table } from "react-bootstrap";

import { setCurrentRequerimiento, setResetCurrentRequerimiento } from "../../../store/slices";
import { RequeListaDependItemComponent } from "./RequeListaDependItemComponent";

export const RequeListaDepend = ( { requerimientos = [], aniosSelected, dependSelected}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const isLoading = false;
    const currentYear = new Date().getFullYear().toString();

    const onClicAgregar = (event) => {
      event.preventDefault();

      dispatch(setResetCurrentRequerimiento());


      dispatch(
        setCurrentRequerimiento({
          C_anipre: aniosSelected,          
          C_sf_dep: dependSelected,
        })
      );

      navigate(`/abastecimientos/requerimiento/gestionar`);
    };

  return (
    <div className="mt-3">
    <div className="">
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" className="me-2">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          Cargando
        </div>
      ) : (
        <>
          <small>
            {" "}
            Requerimientos
          </small>

          <div style={{ border: "1px solid lightgrey" }} className="mb-5">
            <Table hover responsive className="caption-top mb-1 animate__animated animate__fadeIn animate__faster">
              <thead>
                <tr className="color-header1 text-white">
                  <th className="text-center align-middle m-0 p-0">
                    Número 
                  </th>
                  <th className="text-center align-middle m-0 p-0">Descripción</th>
                  <th className="text-center align-middle m-0 p-0">
                    Monto
                  </th>
                  <th className="text-center align-middle m-0 p-0"></th>                  
                </tr>
              </thead>
              <tbody>
                {requerimientos.map((requerimiento, i) => (
                  <tr 
                    key={
                      `${requerimiento.C_reque}-${requerimiento.C_biesertipo}`
                    }                    
                  >
                    <RequeListaDependItemComponent requerimiento={requerimiento} />
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", right: "0px", width: "70px" }}>
              <div style={{ position: "fixed", bottom: "25px" }}>
                <button
                  className="btn btn-primary rounded-circle"
                  style={{ width: "70px", height: "70px" }}
                  title="Agregar requerimiento"
                  onClick={onClicAgregar}
                  disabled={!aniosSelected || aniosSelected !== currentYear || !dependSelected}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
  )
}
