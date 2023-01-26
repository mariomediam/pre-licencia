import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Breadcrumb,
  Container,
  Form,
  InputGroup,
  FormControl,
  Col,
  Button as BootStrapButton,
} from "react-bootstrap";
import Button from "@mui/material/Button";
import {
  obtenerTipoDocumento,
  obtenerContribuyenteDocumento,
  obtenerContribuyenteCodigo,
  obtenerDocumentoTipoNro,
  AgregarContribDocumento,
} from "../../services/contribuyenteService";
import Swal from "sweetalert2";
import { Toast } from "../tools/PopMessage";

export const ContribAddDocComponent = ({
  contribEdit,
  setCodContribIni,
  setShowForm,
}) => {
  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [lengthCampo, setLengthCampo] = useState(0);
  const [valores, setValores] = useState({});
  const [errorDocumento, setErrorDocumento] = useState("");
  const inputNroDoc = useRef();
  const selectTipoDoc = useRef();

  const onSelectTipoDocChange = () => {
    const objDocSelect = tipoDocumento
      .filter((tipoDoc) => tipoDoc.C003Cod_Doc === selectTipoDoc.current.value)
      .shift();

    if (
      objDocSelect !== undefined &&
      selectTipoDoc.current.value !== undefined &&
      inputNroDoc.current.value !== undefined
    ) {
      inputNroDoc.current.value = inputNroDoc.current.value.substring(
        0,
        objDocSelect.I003Longitud
      );
      setLengthCampo(objDocSelect.I003Longitud);
    }
  };

  const verTipoDocumentos = async () => {
    if (contribEdit) {
      const contribuyenteDocumentos = await obtenerContribuyenteDocumento(
        contribEdit
      );

      const tipoDocumentoTmp = await obtenerTipoDocumento();
      const tipoDocumentoFilter = tipoDocumentoTmp.filter(
        (tipoDoc) =>
          !contribuyenteDocumentos
            .map((contribDoc) => contribDoc.CodDoc)
            .includes(tipoDoc.C003Cod_Doc)
      );
      setTipoDocumento(tipoDocumentoFilter);
      onSelectTipoDocChange();
    }
  };

  useEffect(() => {
    verContribuyente();
    verTipoDocumentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contribEdit]);

  const verContribuyente = async () => {
    if (contribEdit && contribEdit.length > 0) {
      const contribuyenteTmp = await obtenerContribuyenteCodigo(contribEdit);
      setValores({
        ...valores,
        tipoContrib: contribuyenteTmp.C001Tip_Cont,
        identificacion: contribuyenteTmp.Identificación,
        apePat: contribuyenteTmp.separa_pepat
          ? contribuyenteTmp.separa_pepat
          : "",
        apeMat: contribuyenteTmp.separa_apemat
          ? contribuyenteTmp.separa_apemat
          : "",
        nombre: contribuyenteTmp.separa_nombre
          ? contribuyenteTmp.separa_nombre
          : "",
        sexo: contribuyenteTmp.C001Sexo,
        fecNac: contribuyenteTmp.D001FecNac.toLocaleString().substr(0, 10),
        observ: contribuyenteTmp.C001Motivo.trim(),
        codigoLugar: contribuyenteTmp.C001Cod_Lug.trim(),
        nombreLugar: contribuyenteTmp.Lugar
          ? contribuyenteTmp.Lugar.trim()
          : "",
        codigoCalle: contribuyenteTmp.C001Cod_Calle.trim(),
        nombreCalle: contribuyenteTmp.Calle
          ? contribuyenteTmp.Calle.trim()
          : "",
        direccNro: contribuyenteTmp.Número.trim(),
        direccPiso: contribuyenteTmp.Piso.trim(),
        direccDpto: contribuyenteTmp.Dpto.trim(),
        direccMzna: contribuyenteTmp.Mza.trim(),
        direccLote: contribuyenteTmp.Lote.trim(),
        direccAdic: contribuyenteTmp.C001Direc_Adic.trim(),
        direccProv: contribuyenteTmp.C005Provincia
          ? contribuyenteTmp.C005Provincia.trim()
          : "",
        direccDist: contribuyenteTmp.C005Distrito
          ? contribuyenteTmp.C005Distrito.trim()
          : "",
      });
    }
  };

  const agregarDocumento = async (e) => {
    if (inputNroDoc.current.value.trim().length === 0) {
      setErrorDocumento(`Ingrese número de documento`);
    } else {
      const objDocSelect = tipoDocumento
        .filter(
          (tipoDoc) => tipoDoc.C003Cod_Doc === selectTipoDoc.current.value
        )
        .shift();
      
      if (
        objDocSelect.I003Longitud !== 0 &&
        objDocSelect.I003Longitud !== inputNroDoc.current.value.trim().length
      ) {
        setErrorDocumento(
          `El documento debe tener una longitud de ${objDocSelect.I003Longitud} caracteres.`
        );
      } else {
        const documentosTipoNro = await obtenerDocumentoTipoNro(
          selectTipoDoc.current.value,
          inputNroDoc.current.value.trim()
        );

        let isConfirmed = true;

        if (documentosTipoNro.length > 0) {
          await Swal.fire({
            // title: `El documento ya se encuentra registrado en el contribuyente ${documentosTipoNro[0].C002Cod_Cont.trim()} - ${documentosTipoNro[0].C001Nombre.trim()}.`,
            text: `El ${objDocSelect.C003Nombre.trim()} ${inputNroDoc.current.value.trim()} ya se encuentra registrado en el contribuyente ${documentosTipoNro[0].C002Cod_Cont.trim()} - ${documentosTipoNro[0].C001Nombre.trim()}. ¿Desea trasladarlo al contribuyente ${
              valores.identificacion
            }?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            reverseButtons: true,
          }).then((result) => {
            if (result.isDismissed) {
              isConfirmed = false;
              return false;
            }
          });
        }

        if (isConfirmed) {
          try {
            AgregarContribDocumento(
              contribEdit,
              selectTipoDoc.current.value,
              inputNroDoc.current.value.trim()
            );
            Toast.fire({
              icon: "success",
              title: "El documento se agrego con éxito",
              background: "#F4F6F6",
              timer: 1500,
            });
            setTimeout(() => {
              setCodContribIni(contribEdit);
              setShowForm(1);
            }, 1500);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error grabando documento",
              text: error.response.data.message,
            });
          }
        }
      }
    }
  };

  const inputKeyUp = (event) => {
    setErrorDocumento("");

    if (event.keyCode === 13) {
      agregarDocumento();
    }
  };

  return (
    <div>
      <div className="ps-2">
        <Breadcrumb>
          <Breadcrumb.Item href="/contribuyente/ver_contribuyente">
            Contribuyente
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Agregar documento</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Container>
        <div className="row justify-content-center">
          <div
            className="align-items-center p-2 col-sm-12 col-lg-8"
            style={{ border: "0px solid black" }}
          >
            <div className="d-flex justify-content-end m-0 p-0">
              <Button
                className="mb-0 pb-0"
                variant="outline-dark"
                size="sm"
                title="Cerrar"
                onClick={() => window.location.reload(false)}
              >
                <h3 className="mb-0 pb-0">
                  <i className="fas fa-times"></i>
                </h3>
              </Button>
            </div>
            <h3 className="mt-0 pt-0 text-center">
              <i className="far fa-id-card me-2"></i>
              Agregar documento
            </h3>
          </div>
          <Container>
            <Col md={{ span: 4, offset: 4 }}>
              <div style={{ border: "0px solid black" }}>
                <p className="text-muted pb-0 mb-0 mt-2">
                  <small className="mb-0 pb-0">Contribuyente</small>
                </p>
                {`${contribEdit} ${
                  valores.identificacion && valores.identificacion.trim()
                }`}

                {/* ------------------ TIPO DE DOCUMENTO -------------------*/}

                <Form.Group
                  md="6"
                  controlId="id_tipoContrib"
                  className="align-middle mt-2"
                >
                  <Form.Label className="text-muted mb-0">
                    <small className="mb-0">Tipo de documento</small>
                  </Form.Label>
                  <Form.Select
                    aria-label="Tipo de documento"
                    value={tipoDocumento.C003Cod_Doc}
                    ref={selectTipoDoc}
                    onChange={onSelectTipoDocChange}
                  >
                    {tipoDocumento.map(({ C003Cod_Doc, C003Nombre }, i) => (
                      <React.Fragment key={i}>
                        {valores.tipoContrib === "01" ||
                        (valores.tipoContrib !== "01" &&
                          ["05", "98", "00", "99"].includes(C003Cod_Doc)) ? (
                          <option key={C003Cod_Doc} value={C003Cod_Doc}>
                            {C003Nombre.trim()}
                          </option>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </Form.Select>

                  {/* <Form.Control.Feedback type="invalid">
                    {errors.tipoContrib}
                  </Form.Control.Feedback> */}
                </Form.Group>

                {/* ------------------ NUMERO DE DOCUMENTO -------------------*/}
                <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                  <Form.Label className="text-muted mb-0 mt-0">
                    <small className="mb-0">Número de documento</small>
                  </Form.Label>
                  <InputGroup className="mb-3" hasValidation>
                    <FormControl
                      autoFocus
                      aria-describedby="basic-addon2"
                      required
                      ref={inputNroDoc}
                      onKeyUp={inputKeyUp}
                      isInvalid={errorDocumento}
                      maxLength={lengthCampo === 0 ? 11 : lengthCampo}
                    />
                    <Form.Control.Feedback type="invalid" className="mt-0">
                      <p align="justify">{errorDocumento} </p>
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <hr />
                <div className="d-flex justify-content-end m-0 p-0">
                  <BootStrapButton
                    variant="secondary"
                    size="sm"
                    // onClick={handleClose}
                    className="me-2"
                  >
                    <i className="far fa-times-circle me-1"></i>
                    Cerrar
                  </BootStrapButton>
                  <BootStrapButton
                    variant="primary"
                    onClick={agregarDocumento}
                    size="sm"
                  >
                    <i className="far fa-save me-2"></i>Grabar
                  </BootStrapButton>
                </div>
              </div>
            </Col>
          </Container>
        </div>
      </Container>
    </div>
  );
};
