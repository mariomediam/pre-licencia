import { useRef } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { obtenerExpedientePorNroAnio } from "../../../services/tradocService";

export const LicProvGestorCabComponent = ({ accion, licProvData, setLicProvData }) => {
  const inputExpedNro = useRef();
  const inputExpedAnio = useRef();

  const onClicBuscarExpedSolici = async () => {
    inputExpedNro.current.value = inputExpedNro.current.value
      .trim()
      .padStart(8, "0");
    const expedNro = inputExpedNro.current.value;
    const expedAnio = inputExpedAnio.current.value;

    const { ExpedSolici } = await obtenerExpedientePorNroAnio(
      expedNro,
      expedAnio
    );
    setLicProvData((prevState) => ({
      ...prevState,
      C_Exped: expedNro,
      C_Exped_Anio: expedAnio,
      C_LicProv_TitCod: ExpedSolici,
    }));
  };

  return (
    <>
      {accion !== 1 && (
        <div className="col-12 col-sm-6">
          <Form.Label className="text-muted mb-0">
            <small className="mb-0">Autorización</small>
          </Form.Label>
          <h4 className="mt-0 mb-3">00001 Renov 0001</h4>
        </div>
      )}

      <div className="col-12 col-sm-6">
        {/* ------------------ EXPEDIENTE -------------------*/}
        <Form.Label className="text-muted ">
          <small className="mb-0">Expediente SIGE</small>
        </Form.Label>
        <div className="row ">
          <div className="col-4 pe-0">
            <Form.Group>
              <Form.Control
                type="text"
                maxLength="8"
                placeholder="Número"
                name="c_exped"
                className="px-2 px-sm-3"
                ref={inputExpedNro}
                // value={valores.codigoLugar}
                // onChange={(e) => setField("codigoLugar", e.target.value)}
                // isInvalid={!!errors.codigoLugar}
              />
              <Form.Control.Feedback type="invalid">
                {/* {errors.codigoLugar} */}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-8 ps-0">
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <InputGroup>
                <FormControl
                  placeholder="Año"
                  maxLength="4"
                  ref={inputExpedAnio}
                  // value={`${valores.nombreLugar} / ${valores.direccProv} - ${valores.direccDist}`}
                />
                {accion !== 3 && (
                  <Button
                    variant="outline-primary"
                    id="button-addon2"
                    title="Buscar"
                    onClick={onClicBuscarExpedSolici}
                  >
                    Obtener titular
                  </Button>
                )}
              </InputGroup>
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};
