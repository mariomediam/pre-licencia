import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonGroup,
  Form,
  Image,
  InputGroup,
  FormControl,
  Button,
  ToggleButton,
} from "react-bootstrap";
import {
  consultarContribuyenteCodigo,
  obtenerContribuyenteDocumento,
} from "../../../services/contribuyenteService";

import Loading from "../../Loading";
import { setCurrentLicProv } from "../../../store/slices";

export const LicProvGestorTitularComponent = ({
  accion,
  licProvData,
  setLicProvData,
}) => {
  const dispatch = useDispatch();

  const [titDocumentos, setTitDocumentos] = useState([]);

  const { currentLicProv, isLoading } = useSelector((state) => state.licProv);
  const { C_LicProv_TitCod } = currentLicProv;

  const inputTitNombre = useRef("");
  const inputTitImagen = useRef("");

  const onChangeSelectDocumento = (event) => {
    const documento = event.target.value;
    const [CodDoc, Número] = documento.split("|");
    dispatch(
      setCurrentLicProv({
        ...currentLicProv,
        C_LicProv_TitTipDoc: CodDoc,
        M_LicProv_TitNroDoc: Número,
      })
    );
  };

  const onChangeInputFileImage = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const extension = file.name.split(".").pop().toLowerCase();
  
      if (extension === "jpg" || extension === "jpeg") {
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
          dispatch(
            setCurrentLicProv({
              ...currentLicProv,
              N_LicProv_TitImg: base64String
            })
          );
        };
  
        reader.readAsDataURL(file);
      } else {
        alert("Solo se permiten archivos JPG");
      }
    }
  };

  const onClickBtnAddFileImage = () => {
    inputTitImagen.current.click();
  }

  const onClickBtnDelFileImage = () => {
    dispatch(
      setCurrentLicProv({
        ...currentLicProv,
        N_LicProv_TitImg: ""
      })
    );
  }

  useEffect(() => {
    try {
      inputTitNombre.current.value = "";
      setTitDocumentos([]);
      const buscarDatosTitular = async () => {
        const { C001Nombre } = await consultarContribuyenteCodigo(
          C_LicProv_TitCod
        );
        inputTitNombre.current.value = C001Nombre || "";
      };

      const buscarDocumentosTitular = async () => {
        const documentos = await obtenerContribuyenteDocumento(
          C_LicProv_TitCod
        );
        setTitDocumentos(documentos);
      };
      if (C_LicProv_TitCod) {
        buscarDatosTitular();
        buscarDocumentosTitular();
      }
    } catch (error) {}
  }, [C_LicProv_TitCod]);

  useEffect(() => {
    if (titDocumentos.length > 0) {
      const { CodDoc, Número } = titDocumentos[0];
      dispatch(
        setCurrentLicProv({
          ...currentLicProv,
          C_LicProv_TitTipDoc: CodDoc || "",
          M_LicProv_TitNroDoc: Número?.trim() || "",
        })
      );
    } else {
      dispatch(
        setCurrentLicProv({
          ...currentLicProv,
          C_LicProv_TitTipDoc: "",
          M_LicProv_TitNroDoc: "",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titDocumentos]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* ******************** Código ********************* */}
          <div className="col-12 col-sm-6">
            <Form.Label className="text-muted mb-1">
              <small className="">Titular</small>
            </Form.Label>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <InputGroup>
                <FormControl
                  placeholder="Código"
                  maxLength="11"
                  disabled
                  value={C_LicProv_TitCod || ""}
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
              <Form.Select
                aria-label="Default select example"
                onChange={onChangeSelectDocumento}
              >
                {titDocumentos.map(({ CodDoc, Descripción, Número }) => (
                  <option
                    key={`${CodDoc}|${Número.toString().trim()}`}
                    value={`${CodDoc}|${Número.toString().trim()}`}
                  >
                    {Descripción.toString().trim()} {Número}
                  </option>
                ))}
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
              src={currentLicProv.N_LicProv_TitImg.length > 0 ?
                `data:image/jpeg;base64,${currentLicProv.N_LicProv_TitImg}` :
              "/images/default-user.jpg"}
              thumbnail
            />

            <ButtonGroup className="d-flex ">
              <ToggleButton
                type="button"
                variant="primary"
                name="radio"
                onClick={onClickBtnAddFileImage}
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
                onClick={onClickBtnDelFileImage}
                // value={radio.value}
                // checked={radioValue === radio.value}
                // onChange={(e) => setRadioValue(e.currentTarget.value)}
                
              >
                <i className="fas fa-minus-square"></i>
              </ToggleButton>
            </ButtonGroup>
          </div>
          <Form.Group controlId="formFile" className="d-none">            
            <Form.Control ref={inputTitImagen} type="file" accept="image/jpeg" onChange={onChangeInputFileImage}/>
          </Form.Group>
        </>
      )}
    </>
  );
};
