import { Button, Form, Modal, Table } from "react-bootstrap";

import { formatNumber } from "../../../utils/varios";
import { RequeComprometeItemFuenteSaldoComponent } from "./RequeComprometeItemFuenteSaldoComponent";
import FileDollarIcon from "../../../icons/FileDollarIcon";
import CheckIcon from "../../../icons/CheckIcon";

export const RequeComprometeItemFuenteComponent = ({
  show,
  handleClose,
  selectItem,
  saldoPresupItem,
  setSaldoPresupItem,
  requeGasto,
  setRequeGasto,
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
  } = selectItem;

  const onCloseModal = () => {
    handleClose();
  };

  

  const getTotalPrecompromiso = () => {
    let total = 0;
    try {
      saldoPresupItem.forEach((item) => {
        if (item.monto_precompromiso) {
          total += parseFloat(item.monto_precompromiso);
        }
      });
    } catch (error) {      
      total = 0;
    }

    return total.toFixed(2);
  };

  const onClicAsignarFuente = (e) => {
    e.preventDefault();

    const selectedFuentes = saldoPresupItem
      .filter((item) => item.monto_precompromiso > 0)
      .map((item) => ({
        C_fuefin: item.C_fuefin,
        C_recurso: item.C_recurso,
        total_precompromiso: item.monto_precompromiso,
      }));
  
    const newRequeGasto = requeGasto.map((item) => {
      if (
        item.C_clapre === C_clapre &&
        item.C_secfun === C_secfun &&
        item.C_depen === C_depen &&
        item.C_activpoi === C_activpoi &&
        item.C_objpoi === C_objpoi &&
        item.C_metapoi === C_metapoi
      ) {
        item.presupuesto = selectedFuentes;
      }
  
      return item;
    });
  
    setRequeGasto(newRequeGasto);
    onCloseModal();
  };

  const validateAsignarFuente = () => {

    const montosInvalidos = saldoPresupItem.filter(({q_saldo, monto_precompromiso}) => monto_precompromiso > q_saldo || monto_precompromiso < 0)
    
    return montosInvalidos.length === 0 && getTotalPrecompromiso() === total_reque?.toFixed(2);
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
          <Modal.Title>
            <div className="d-flex align-items-center">
              <FileDollarIcon className="me-1 thumbnail" />
              <p className="m-0 p-0">Asignar fuente de financiamiento</p>
            </div>
          </Modal.Title>
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
            <div className="col-md-8 mx-auto" style={{ position: "relative" }}>
              <small>
                <Table
                  hover
                  responsive
                  size="sm"
                  className="caption-top mt-2 mb-1 animate__animated animate__fadeIn animate__faster"
                >
                  <thead>
                    <tr className="color-header1 text-white">
                      <th className="align-middle my py-0">FF/RR</th>
                      <th className="text-end align-middle m-0 p-0">Saldo</th>
                      <th className="text-end align-middle my py-0">
                        Monto asignado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {saldoPresupItem.map((item, i) => (
                        <RequeComprometeItemFuenteSaldoComponent
                          key={i}
                          saldoFuente={item}
                          saldoPresupItem={saldoPresupItem}
                          setSaldoPresupItem={setSaldoPresupItem}
                        />
                      ))}
                      <tr>
                        <td className="align-middle"></td>
                        <td className="text-end align-middle">Total S/.</td>
                        <td>
                          <Form.Group className="ms-3">
                            <Form.Control
                              className="text-end"
                              size="sm"
                              type="number"
                              placeholder="0.00"
                              // disabled
                              readOnly
                              value={formatNumber(getTotalPrecompromiso())}
                              step={0.01}
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    </>
                  </tbody>
                </Table>
              </small>
              {validateAsignarFuente() && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "-25px",
                  }}
                >
                  <CheckIcon />
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="mx-auto">
            <Button
              variant="primary"
              size="sm"
              className="d-flex align-items-center"
              disabled={!validateAsignarFuente()}
              onClick={onClicAsignarFuente}
            >
              {" "}
              <FileDollarIcon className="me-1 thumbnail" />
              <p className="m-0 p-0">Asignar fuente</p>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
