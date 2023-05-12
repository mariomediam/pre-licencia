import { useDispatch, useSelector } from "react-redux";

import { Table, Spinner } from "react-bootstrap";
import { TrabajadorCorreoListaItemComponent } from "./TrabajadorCorreoListaItemComponent";
import { useState } from "react";
import { setActiveTrabajadorCorreo } from "../../../../store/slices";
import { TrabajadorCorreoListaItemEditComponent } from "./TrabajadorCorreoListaItemEditComponent";

export const TrabajadorCorreoListaComponent = () => {
const dispatch = useDispatch();

  const { isLoading, trabajadorCorreo, active } = useSelector(
    (state) => state.trabajadorCorreo
  );

  const [show, setShow] = useState(false);

  const handleClose = () => {
    dispatch(setActiveTrabajadorCorreo(null));
    setShow(false);
  }
  const handleShow = () => setShow(true);
  

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-10 col-xl-6">
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
                {trabajadorCorreo.length} registro(s) encontrado(s)
              </small>
              <div style={{ border: "1px solid lightgrey" }}>
                <Table hover className="caption-top mb-1 animate__animated animate__fadeIn animate__faster">
                  <thead>
                    <tr className="color-header1 text-white">
                      <th className="text-center align-middle m-0 p-0">
                        DNI / Nombre
                      </th>
                      <th className="text-center align-middle m-0 p-0">
                        Correo
                      </th>
                      <th className="text-center align-middle m-0 p-0">
                        Responsable
                      </th>
                      <th className="text-center align-middle m-0 p-0"></th>
                      <th className="text-center align-middle m-0 p-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {trabajadorCorreo.map((trabajador, i) => (
                    <TrabajadorCorreoListaItemComponent key={trabajador.c_traba_dni} {...trabajador} handleShow={handleShow}/>
                ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </div>
      </div> 
      <TrabajadorCorreoListaItemEditComponent handleClose={handleClose} active={active} show={show}/>
    </>
  );
};
