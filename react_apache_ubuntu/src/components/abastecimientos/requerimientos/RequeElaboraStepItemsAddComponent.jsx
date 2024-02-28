import { useEffect, useState, useRef } from "react";
import { Card, Form, Modal } from "react-bootstrap";
import Select from "react-select";

import { obtenerBBSSDisponibleOrden } from "../../../services/abastecService";

export const RequeElaboraStepItemsAddComponent = ({
  show,
  handleClose,
  clasificador,
  C_biesertipo,
  C_anipre,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bbss, setBbss] = useState([]);
  const [bbssSelected, setBbssSelected] = useState({})
  const controlSelectBBSS = useRef(null);


  const { C_clapre, C_secfun, C_depen, C_activpoi, C_objpoi, C_metapoi } =
    clasificador;

    const onChangeControlSelectBBSS = (e) => {
        if (e?.value) {
          console.log(e.value)
        }
      };

  useEffect(() => {
    setIsLoading(true);
    const getBBSS = async () => {
      if (C_anipre && C_depen && C_biesertipo && C_clapre) {
        if (controlSelectBBSS.current) {
          controlSelectBBSS.current.clearValue();
        }
        const file = "codigo";
        const data = await obtenerBBSSDisponibleOrden(
          C_anipre,
          "",
          C_depen,
          C_biesertipo,
          file,
          C_clapre
        );
        const bbssTmp = data.map(
          ({ C_BIESER, N_BIESER_DESC, N_UNIMED_DESC, C_BIESERTIPO }) => {
            return {
              value: C_BIESER,
              label: `${
                C_BIESERTIPO === "01"
                  ? `${N_BIESER_DESC} (${N_UNIMED_DESC})`
                  : N_BIESER_DESC
              } `,
            };
          }
        );
        setBbss(bbssTmp || []);
      }
      setIsLoading(false);
    };
    getBBSS();
  }, [C_anipre, C_depen, C_biesertipo, C_clapre]);

  return (
    <div>
      <div>
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
                alt={`Agregar ${C_biesertipo === "01" ? "bien" : "servicio"}`}
              />
              {`Agregar ${C_biesertipo === "01" ? "bien" : "servicio"}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-3">
              <Card>
                <Card.Header>
                  <div className="d-flex flex-wrap gap-3 justify-content-between">
                    <p className="m-0 p-0">
                      <small className="text-muted">
                        Secuencia funcional:{" "}
                      </small>
                      {C_secfun}
                    </p>
                    <p className="m-0 p-0">
                      <small className="text-muted">Tarea operativa: </small>
                      {C_activpoi}
                    </p>
                    <p className="m-0 p-0">
                      <small className="text-muted">Clasificador: </small>
                      {C_clapre}
                    </p>
                    <p className="m-0 p-0">
                      <small className="text-muted">Objetivo / Meta: </small>
                      {C_objpoi} / {C_metapoi}
                    </p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-muted mb-0">
                      <small>
                        {" "}
                        {C_biesertipo === "01" ? "Bien" : "Servicio"}
                      </small>
                    </Form.Label>
                    <Select
                      placeholder={`Seleccionar ${
                        C_biesertipo === "01" ? "bien" : "servicio"
                      }`}
                      ref={controlSelectBBSS}
                      noOptionsMessage={() => "Registro no encontrado"}
                      name="bbss"
                      onChange={onChangeControlSelectBBSS}
                      options={bbss}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </Form.Group>

                  {C_biesertipo === "01" && (
                    <Form.Group className="mb-2 col-md-3">
                      <Form.Label className="text-muted mb-0">
                        <small> Precio unitario S/. </small>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        step="0.01"
                        className="text-end"
                        // defaultValue={active?.ubicaUTMNorte}
                        // ref={inputUTMNorte}
                      />
                    </Form.Group>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
