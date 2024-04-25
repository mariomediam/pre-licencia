import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";

import { getTotalRequerimiento, setResetRequerimiento } from "../../../store/slices";
import { RequeElaboraStepItemsClasifComponent } from "./RequeElaboraStepItemsClasifComponent";
import { transformarFecha } from "../../../utils/varios";


export const RequePreviewComponent = ({
  C_anipre,
  C_reque,
  C_biesertipo,
  show,
  handleClose,
}) => {
  const dispatch = useDispatch();

  const { currentReque } = useSelector(
    (state) => state.requerimiento
  );
  const {
    requeClasificadores = [],
    C_sf_dep,
    T_reque_obs,
    n_dependencia,
    D_reque_fecha,
    N_ESTADO_NOMBRE,
    C_exp,
    tipo_reque,
    F_certif,
    f_libre,
    F_reque_estado,
  } = currentReque;

  const getTotal = () => {
    // Obtener la suma de los subtotales de los items
    const total = dispatch(getTotalRequerimiento());

    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const classBadge = {
    1: "badge bg-secondary",
    2: "badge bg-primary",
    3: "badge bg-danger",
  };

  const onCloseViewRequerimiento = () => {
    setResetRequerimiento();
    handleClose();
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onCloseViewRequerimiento}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
            <Modal.Title>              
              {`Requerimiento ${
                f_libre === "0" ? "de" : ""
              } ${tipo_reque?.toLowerCase()} ${C_reque} - ${C_anipre}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <small>
              <div className="d-flex justify-content-between mb-0">
                <div>
                  <p className="mb-0">
                    <span className="text-muted me-2">Unidad orgánica:</span>
                    {n_dependencia}
                  </p>
                  <p className="mt-0 mb-0">
                    <span className="text-muted me-2">Fecha:</span>
                    {transformarFecha(D_reque_fecha).substring(0, 10)}
                  </p>
                </div>
                <div>
                  <span className={classBadge[F_reque_estado]}>
                    <div>
                      <small>
                        {F_reque_estado === "2"
                          ? `PRE COMPROMISO ${parseInt(C_exp, 10)}`
                          : N_ESTADO_NOMBRE}
                      </small>
                    </div>
                    <small>
                      <small>{F_certif && <div>CERTIFICADO</div>}</small>
                    </small>
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-end align-items-center pb-2 mt-0 pt-0">
                <small className="text-muted pe-2">Total: </small>{" "}
                <h4 className="pt-0"> S/. {getTotal()}</h4>
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
                      f_libre={f_libre}
                    />
                  </article>
                );
              })}

              <h6 className="text-muted mb-0">Observaciones</h6>
              <p className="mt-0 pt-0">{T_reque_obs}</p>
            </small>
          </Modal.Body>
    </Modal>
  );
};
