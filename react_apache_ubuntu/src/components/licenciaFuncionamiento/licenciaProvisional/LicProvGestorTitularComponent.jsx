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
import { BuscarContribuyenteModalComponent } from "../../contribuyente/BuscarContribuyenteModalComponent";

export const LicProvGestorTitularComponent = ({
  accion,
}) => {
  const dispatch = useDispatch();

  const [titDocumentos, setTitDocumentos] = useState([]);
  const [showBuscarContrib, setShowBuscarContrib] = useState(false);

  const handleBuscarContribClose = () => setShowBuscarContrib(false);
  const handleBuscarContribShow = () => setShowBuscarContrib(true);

  const { currentLicProv, isLoading } = useSelector((state) => state.licProv);
  const { licProvTitCod } = currentLicProv;

  const inputTitNombre = useRef("");
  const inputTitImagen = useRef("");

  const onChangeSelectDocumento = (event) => {
    const documento = event.target.value;
    const [CodDoc, Número] = documento.split("|");
    dispatch(
      setCurrentLicProv({        
        licProvTitTipCod: CodDoc,
        licProvTitNroDoc: Número,
      })
    );
  };

  const setTitCodigo = (codigo) => {
    dispatch(
      setCurrentLicProv({
        licProvTitCod: codigo,
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
              licProvTitImg: base64String
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
        licProvTitImg: ""
      })
    );
  }

  useEffect(() => {
    try {
      inputTitNombre.current.value = "";
      setTitDocumentos([]);
      const buscarDatosTitular = async () => {
        const { C001Nombre } = await consultarContribuyenteCodigo(
          licProvTitCod
        );
        inputTitNombre.current.value = C001Nombre || "";
      };

      const buscarDocumentosTitular = async () => {
        const documentos = await obtenerContribuyenteDocumento(
          licProvTitCod
        );
        setTitDocumentos(documentos);
      };
      if (licProvTitCod) {
        buscarDatosTitular();
        buscarDocumentosTitular();
      }
    } catch (error) {}
  }, [licProvTitCod]);

  useEffect(() => {
    if (titDocumentos.length > 0) {
      const { CodDoc, Número } = titDocumentos[0];
      dispatch(
        setCurrentLicProv({          
          licProvTitTipCod: CodDoc || "",
          licProvTitNroDoc: Número?.trim() || "",
        })
      );
    } else {
      dispatch(
        setCurrentLicProv({          
          licProvTitTipCod: "",
          licProvTitNroDoc: "",
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
                  value={licProvTitCod || ""}
                />

                <Button
                  variant="outline-primary"
                  id="button-addon2"
                  title="Buscar"
                  onClick={handleBuscarContribShow}
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
              src={currentLicProv.licProvTitImg.length > 100 ?
                `data:image/jpeg;base64,${currentLicProv.licProvTitImg}` :
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
          <BuscarContribuyenteModalComponent setField={setTitCodigo} show={showBuscarContrib} handleClose={handleBuscarContribClose} />
        </>
      )}
    </>
  );
};
