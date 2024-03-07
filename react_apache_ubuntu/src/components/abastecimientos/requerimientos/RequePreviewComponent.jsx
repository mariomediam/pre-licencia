import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";

import { getTotalRequerimiento } from "../../../store/slices";
import { RequeElaboraStepItemsClasifComponent } from "./RequeElaboraStepItemsClasifComponent";

export const RequePreviewComponent = ({
  C_anipre,
  C_reque,
  C_biesertipo,
  show,
  handleClose,
}) => {

    const dispatch = useDispatch();

  const { currentReque } = useSelector((state) => state.requerimiento);
  const {
    requeClasificadores = [],
    C_sf_dep,  
    T_reque_obs,
  } = currentReque;

  const getTotal = () => {
    // Obtener la suma de los subtotales de los items
    const total = dispatch(getTotalRequerimiento());

    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <img
            src="/images/plus.svg"
            className="me-2 thumbnail"
            alt={`Requerimiento de ${
              C_biesertipo === "01" ? "bien" : "servicio"
            } ${C_reque} - ${C_anipre}`}
          />
          {`Requerimiento de ${
            C_biesertipo === "01" ? "bienes" : "servicios"
          } ${C_reque} - ${C_anipre}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <small>
      <div className="d-flex justify-content-end align-items-center pb-2">
        <small className="text-muted pe-2">Total: </small>{" "}
        <h4> S/. {getTotal()}</h4>
      </div>
      {requeClasificadores.map((clasificador, i) => {
        return (
          <article key={i}>
            <RequeElaboraStepItemsClasifComponent
              clasificador={clasificador}
              C_sf_dep={C_sf_dep}
              C_biesertipo={C_biesertipo}
              C_anipre={C_anipre}
              accion={"preview"}
            />
          </article>
        );
      })}

      <h6 className="text-muted mb-0">Observaciones</h6>
      <p className="mt-0 pt-0">
        {T_reque_obs}
      </p>

      
    </small>
      </Modal.Body>
    </Modal>
  );
};
