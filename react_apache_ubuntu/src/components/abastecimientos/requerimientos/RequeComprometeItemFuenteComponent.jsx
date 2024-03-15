import { Modal, Table } from "react-bootstrap";

import { formatNumber } from "../../../utils/varios";
import { RequeComprometeItemFuenteSaldoComponent } from "./RequeComprometeItemFuenteSaldoComponent";

export const RequeComprometeItemFuenteComponent = ({
  show,
  handleClose,
  requeGasto,
  saldoPresupItem,
}) => {
  const {
    C_clapre,
    C_depen,
    C_secfun,
    C_objpoi,
    C_metapoi,
    C_activpoi,
    total_reque,
    N_clapre_desc,
    N_metapresup_desc,
    N_depend_Descripcion,
    N_activpoi_desc,
  } = requeGasto;

  const onCloseModal = () => {
    handleClose();
  };

  return (
    <>
      <Modal
        size="lg"        
        show={show}
        onHide={onCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Fuente de financiamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-10 border p-3 mx-auto rounded">
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
                <span className="fw-bold">S/. {formatNumber(total_reque)}</span>
              </p>
            </small>
            <div className="col-md-8 mx-auto">
            <small>
            <Table
                hover
                responsive
                size="sm"
                className="caption-top mt-2 mb-1 animate__animated animate__fadeIn animate__faster"

              >
                <thead >
                  <tr className="color-header1 text-white">
                    <th className="align-middle my py-0">FF/RR</th>
                    <th className="text-end align-middle m-0 p-0">
                      Saldo
                    </th>
                    <th className="text-end align-middle my py-0">Comprometer</th>                    
                  </tr>
                </thead>
                <tbody>
                {saldoPresupItem.map((item, i) => (
                    <RequeComprometeItemFuenteSaldoComponent key={i} saldoFuente={item} />
                ))}
                </tbody>
              </Table>
              </small>
            </div>

            

           
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
