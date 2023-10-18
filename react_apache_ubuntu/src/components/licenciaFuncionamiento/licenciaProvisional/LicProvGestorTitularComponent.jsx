import { useEffect, useRef } from "react";
import {
  ButtonGroup,
  Form,
  Image,
  InputGroup,
  FormControl,
  Button,
  ToggleButton,
} from "react-bootstrap";
import { consultarContribuyenteCodigo, obtenerContribuyenteDocumento } from "../../../services/contribuyenteService";
import { useState } from "react";
import Loading from "../../Loading";


export const LicProvGestorTitularComponent = ({
  accion,
  licProvData,
  setLicProvData,
}) => {
  const [cargando, setCargando] = useState(false);
  const [titDocumentos, setTitDocumentos] = useState([])

  const { C_LicProv_TitCod } = licProvData;
  const inputTitCodigo = useRef("");
  const inputTitNombre = useRef("");
  const selectTitDocumento = useRef("");

  const onClickGrabar = () => {
    console.log(selectTitDocumento.current.value)
  }

  useEffect(() => {
    try {
      
      console.log(cargando)
      inputTitCodigo.current.value = C_LicProv_TitCod || "";

      const buscarDatosTitular = async () => {
        setCargando(true);
        const { C001Nombre } = await consultarContribuyenteCodigo(
          C_LicProv_TitCod
        );
        inputTitNombre.current.value = C001Nombre || "";
      };

      const buscarDocumentosTitular = async () => {
        const documentos = await obtenerContribuyenteDocumento(C_LicProv_TitCod);
        setTitDocumentos(documentos);
      }
      if (C_LicProv_TitCod) {
        buscarDatosTitular();
        buscarDocumentosTitular();
      }
    } catch (error) {
    } finally {
      setCargando(false);
      console.log(cargando)
    }
  }, [C_LicProv_TitCod, cargando]);



  return (
    <>
      {cargando ? (
        <Loading />
      ) : (
        <>
          {/* ******************** Código ********************* */}
          <div className="col-12 col-sm-6">
            <Form.Label className="text-muted mb-1">
              <small className="">Titular {cargando.toString()} aaaa</small>
            </Form.Label>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <InputGroup>
                <FormControl
                  placeholder="Código"
                  maxLength="11"
                  disabled
                  ref={inputTitCodigo}
                />

                <Button
                  variant="outline-primary"
                  id="button-addon2"
                  title="Buscar"
                  // onClick={handleBuscarLugarShow}
                >
                  <i className="fas fa-search"></i>{" "}
                  {accion === 3 && "Cambiar por conyuge"}
                </Button>
              </InputGroup>
            </Form.Group>
          </div>

          {/* ******************** Nombre ********************* */}
          <div>
            <Form.Group className="text-muted mt-3">
              <Form.Label className="mb-1">
                {" "}
                <small>Nombre</small>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                disabled
                ref={inputTitNombre}
              />
            </Form.Group>
          </div>

          {/* ******************** Documento ********************* */}
          <div className="col-12 col-sm-6">
            <Form.Group className="text-muted mt-3">
              <Form.Label className="mb-1">
                {" "}
                <small>Documento</small>
              </Form.Label>
              <Form.Select aria-label="Default select example" ref={selectTitDocumento}>

              {titDocumentos.map(({CodDoc, Descripción, Número}) => (
                <option key={`${CodDoc}-${Número.toString().trim()}`} value={`${CodDoc}-${Número.toString().trim()}`}>{Descripción.toString().trim()} {Número}</option>
              ))}



                {/* <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option> */}
              </Form.Select>
            </Form.Group>
          </div>

          {/* ******************** Imagen ********************* */}
          <div className="d-block col-12 col-sm-3 mt-3">
            <Form.Label className="text-muted mb-1">
              {" "}
              <small>Imagen</small>
            </Form.Label>
            <Image
              src="https://media.istockphoto.com/id/1268988213/vector/illustration-of-a-young-woman-in-a-suit-id-photo-size.jpg?s=612x612&w=0&k=20&c=XJwY7mrLPCF5hkGqcs_W_aNThDIBvfWXTDJ_vsX4GyY="
              thumbnail
            />

            <ButtonGroup className="d-flex ">
              <ToggleButton
                type="button"
                variant="primary"
                name="radio"
                // value={radio.value}
                // checked={radioValue === radio.value}
                // onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                <i className="fas fa-plus-square"></i>
              </ToggleButton>
              <ToggleButton
                type="button"
                variant="danger"
                name="radio"
                // value={radio.value}
                // checked={radioValue === radio.value}
                // onChange={(e) => setRadioValue(e.currentTarget.value)}
                onClick={onClickGrabar}
              >
                <i className="fas fa-minus-square"></i>
              </ToggleButton>
            </ButtonGroup>
          </div>
        </>
      )}
    </>
  );
};
