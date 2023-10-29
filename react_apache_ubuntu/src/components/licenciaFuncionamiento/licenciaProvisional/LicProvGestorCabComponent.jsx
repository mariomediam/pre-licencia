import { useDispatch, useSelector } from "react-redux";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { setCurrentLicProv, setExpedSolici } from "../../../store/slices";

export const LicProvGestorCabComponent = ({ accion }) => {
  const dispatch = useDispatch();

  const { currentLicProv } = useSelector((state) => state.licProv);

  const { licProvExpNro, licProvExpAnio, licProvNro, licProvRenov } = currentLicProv;

  const onChangeInputExpedNro = (event) => {
    const expedNro = event.target.value;
    dispatch(setCurrentLicProv({ licProvExpNro: expedNro }));
  };

  const onBlurInpurExpedNro = (event) => {
    const expedNro = event.target.value;
    if (expedNro.length > 0) {
      dispatch(
        setCurrentLicProv({          
          licProvExpNro: expedNro.padStart(8, "0"),
        })
      );
    }
  };

  const onChangeInputExpedAnio = (event) => {
    const expedAnio = event.target.value;
    dispatch(setCurrentLicProv({ licProvExpAnio: expedAnio }));
  };

  const onBlurInputExpedAnio = (event) => {
    const expedAnio = event.target.value;
    if (expedAnio.length > 0) {
      dispatch(
        setCurrentLicProv({          
          licProvExpAnio: expedAnio.padStart(4, "0"),
        })
      );
    }
  };

  const onClicBuscarExpedSolici = async () => {
    dispatch(setExpedSolici());
  };

  return (
    <>
      {accion !== 1 && (
        <div className="col-12 col-sm-6">
          <Form.Label className="text-muted mb-0">
            <small className="mb-0">Autorización</small>
          </Form.Label>
          <h4 className="mt-0 mb-3">{licProvNro.toString().padStart(5, "0")} {licProvRenov && `Renov ${licProvRenov.toString().padStart(5, "0")}`}</h4>
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
                name="licProvExpNro"
                className="px-2 px-sm-3"
                onChange={onChangeInputExpedNro}
                onBlur={onBlurInpurExpedNro}
                value={licProvExpNro}
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
                  onChange={onChangeInputExpedAnio}
                  onBlur={onBlurInputExpedAnio}
                  value={licProvExpAnio}
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
