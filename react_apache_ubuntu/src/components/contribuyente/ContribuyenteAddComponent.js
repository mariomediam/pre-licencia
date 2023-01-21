import { useState, useEffect, useContext } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext";
import {
  obtenerTipoContribuyente,
  consultarContribuyenteCodigo,
  obtenerDocumentoTipoNro,
  obtenerCorrelativoCodContribuyente,
  insertContribuyenteAll,
  verificaNombreContribuyente,
} from "../../services/contribuyenteService";
import { ContribAddTipoContComponent } from "./ContribAddTipoContComponent";
import { ContribEditDatPriComponent } from "./ContribEditDatPriComponent";
import { ContribEditDomiciComponent } from "./ContribEditDomiciComponent";
import { ContribEditOtrosComponent } from "./ContribEditOtrosComponent";
import { Toast } from "../tools/PopMessage";

const steps = [
  "Tipo de contribuyente",
  "Datos principales",
  "Domicilio",
  "Otros",
];

export const ContribuyenteAddComponent = ({
  setCodContribIni,
  setShowForm,
}) => {
  const { userName } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [valores, setValores] = useState({
    showForm: 3,
    codigoContrib: "",
    tipoContrib: "01",
    tipoAddContrib: "PN",
    tipoDocum: "01",
    homonimo: "",
    codigoAnt: "",
    apePat: "",
    apeMat: "",
    nombre: "",
    sexo: "M",
    fecNac: "",
    codigoLugar: "",
    nombreLugar: "",
    codigoCalle: "",
    nombreCalle: "",
    direccNro: "",
    direccPiso: "",
    direccDpto: "",
    direccMzna: "",
    direccLote: "",
    direccAdic: "",
    direccProv: "",
    direccDist: "",
    direccAdicio: "",
    observ: "",
    documentos: [],
    telefonos: [],
    emails: [],
    naciones: [],
  });
  const [skipped, setSkipped] = useState(new Set());
  const [tipoContribuyente, setTipoContribuyente] = useState([]);
  const [errors, setErrors] = useState({});

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;

    const newErrors = await findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      try {
        if (activeStep === 0) {
          // GENERA DOCUMENTO Y NACIONALIDAD
          let setDocumNacionNew = {};
          let nombreDocum = "",
            nroDocum = "";
          if (valores.tipoDocum === "01") {
            nombreDocum = "D.N.I.";
            nroDocum = valores.codigoContrib;
          } else if (valores.tipoDocum === "05") {
            nombreDocum = "RUC";
            nroDocum = valores.codigoContrib;
          } else if (valores.tipoDocum === "06") {
            const { Codigo } = await obtenerCorrelativoCodContribuyente();
            nombreDocum = "COD. INT E";
            nroDocum = Codigo;
            setDocumNacionNew = { ...setDocumNacionNew, codigoContrib: Codigo };
          }
          setDocumNacionNew = {
            ...setDocumNacionNew,
            documentos: [
              {
                CodDoc: valores.tipoDocum,
                Descripción: nombreDocum,
                Número: nroDocum,
                "": "NN",
              },
            ],
          };

          if (valores.tipoDocum === "01") {
            setDocumNacionNew = {
              ...setDocumNacionNew,
              naciones: [
                {
                  Codigo: "051",
                  Pais: "PERÚ",
                  Gentilicio: "PERUANO",
                  "": "NN",
                },
              ],
            };
          }

          setField(setDocumNacionNew);
        }

        if (activeStep === steps.length - 1) {
          await insertarContribuyente();
          Toast.fire({
            icon: "success",
            title: "El contribuyente se agrego con éxito",
            background: "#F4F6F6",
            timer: 1500,
          });
          setTimeout(() => {
            setCodContribIni(valores.codigoContrib);
            setShowForm(1);
          }, 1500);
        }

        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error grabando contribuyente",
          text: error.response.data.message,
        });
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const verTipoContribuyente = async () => {
    const tipoContribTmp = await obtenerTipoContribuyente();
    setTipoContribuyente(tipoContribTmp);
  };

  const insertarContribuyente = async () => {
    let objContribuyente = { ...valores };

    // ELIMINO DOBLES ESPACIOS EN BLANCO
    objContribuyente.nombre = objContribuyente.nombre
      .replace(/\s+/g, " ")
      .trim();
    if (objContribuyente.tipoContrib === "01") {
      objContribuyente.apePat = objContribuyente.apePat
        .replace(/\s+/g, " ")
        .trim();
      objContribuyente.apeMat = objContribuyente.apeMat
        .replace(/\s+/g, " ")
        .trim();
      objContribuyente.nombreCompleto = `${objContribuyente.apePat.trim()}  ${objContribuyente.apeMat.trim()}-${objContribuyente.nombre.trim()}`;
    } else {
      objContribuyente.apePat = "";
      objContribuyente.apeMat = "";
      objContribuyente.nombreCompleto = objContribuyente.nombre.trim();
    }

    objContribuyente.responsable = userName;
    await insertContribuyenteAll(
      objContribuyente.codigoContrib,
      objContribuyente
    );
  };

  useEffect(() => {
    verTipoContribuyente();
    // verContribuyente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = (field, value) => {
    if (typeof field === "string") {
      setValores({
        ...valores,
        [field]: value,
      });
      // Check and see if errors exist, and remove them from the error object:
      if (!!errors[field])
        setErrors({
          ...errors,
          [field]: null,
        });
    } else {
      setValores({ ...valores, ...field });

      let errorsTpm = {};

      // Object.keys(field).forEach((key) => (field[key] = null));

      Object.keys(field).forEach(
        (key) => !!errors[key] && (errorsTpm[key] = null)
      );

      setErrors({ ...errors, ...errorsTpm });
    }
  };

  const findFormErrors = async () => {
    const {
      codigoContrib,
      tipoContrib,
      apePat,
      apeMat,
      nombre,
      observ,
      codigoLugar,
      nombreLugar,
      codigoCalle,
      nombreCalle,
      direccNro,
      direccPiso,
      direccDpto,
      direccMzna,
      direccLote,
      tipoDocum,
    } = valores;
    const newErrors = {};

    if (activeStep === 0) {
      //   tipoContrib errors
      if (!tipoContrib || tipoContrib === "")
        newErrors.codigoContrib = "Seleccione tipo de contribuyente";

      if (tipoDocum !== "06") {
        if (!codigoContrib || codigoContrib === "") {
          newErrors.codigoContrib = "Ingrese número de documento";
        } else {
          if (tipoDocum === "01" && !/^[0-9]{8}$/.test(codigoContrib.trim())) {
            newErrors.codigoContrib =
              "Número de documento debe tener 8 dígitos";
          } else if (
            tipoDocum === "05" &&
            !/^[0-9]{11}$/.test(codigoContrib.trim())
          ) {
            newErrors.codigoContrib =
              "Número de documento debe tener 11 dígitos";
          } else {
            const validaContrib = await consultarContribuyenteCodigo(
              codigoContrib
            );
            if (Object.keys(validaContrib).length !== 0) {
              const { C001Cod_Cont, C001Nombre } = validaContrib;
              newErrors.codigoContrib = `Ya existe el código: ${C001Cod_Cont.trim()} para el contribuyente: ${C001Nombre.trim()}`;
            } else {
              const validaDocum = await obtenerDocumentoTipoNro(
                tipoDocum,
                codigoContrib
              );
              if (validaDocum.length > 0) {
                const { C002Cod_Cont, C001Nombre } = validaDocum.shift();
                newErrors.codigoContrib = `Ya existe el documento: ${codigoContrib.trim()} para el contribuyente: ${C002Cod_Cont} ${C001Nombre.trim()}`;
              }
            }
          }
        }
      }
    } else if (activeStep === 1) {
      // codigoContrib errors
      if (!codigoContrib || codigoContrib === "")
        newErrors.codigoContrib = "Código no válido";

      // apePat errors
      if (tipoContrib === "01") {
        if (!apePat || apePat.trim() === "") {
          newErrors.apePat = "Ingrese apellido paterno";
        } else {
          const { Var: verificaApepat } = await verificaNombreContribuyente(
            tipoContrib,
            apePat.trim()
          );

          if (verificaApepat === "F") {
            newErrors.apePat = "Ingreso caracteres extraños";
          }
        }
      }

      // apeMat errors
      if (tipoContrib === "01") {
        if (apeMat && apeMat.trim() !== "") {
          const { Var: verificaApeMat } = await verificaNombreContribuyente(
            tipoContrib,
            apeMat.trim()
          );

          if (verificaApeMat === "F") {
            newErrors.apeMat = "Ingreso caracteres extraños";
          }
        }
      }

      // nombre errors
      if (!nombre || nombre.trim() === "")
        newErrors.nombre = "Ingrese Nombre / Razón social";
      else {
        const { Var: verificaNombre } = await verificaNombreContribuyente(
          tipoContrib,
          nombre.trim()
        );

        if (verificaNombre === "F") {
          newErrors.nombre = "Ingreso caracteres extraños";
        }
      }

      // observ errors
      if (!observ || observ === "") newErrors.observ = "Ingrese observaciones";
      else if (observ.length > 800)
        newErrors.observ = "Las observaciones son demasiado largas";
    } else if (activeStep === 2) {
      // lugar errors
      if (
        !codigoLugar ||
        codigoLugar === "" ||
        !nombreLugar ||
        nombreLugar === ""
      )
        newErrors.codigoLugar = "Ingrese lugar";

      // calle errors
      if (
        !codigoCalle ||
        codigoCalle === "" ||
        !nombreCalle ||
        nombreCalle === ""
      )
        newErrors.codigoCalle = "Ingrese calle";

      // numero, piso, dpto, mzna, lote errors
      if (
        (!direccNro || direccNro === "") &&
        (!direccPiso || direccPiso === "") &&
        (!direccDpto || direccDpto === "") &&
        (!direccMzna || direccMzna === "") &&
        (!direccLote || direccLote === "")
      )
        newErrors.direccNro =
          "Ingrese número y/o piso y departamento y/o Manzana y lote";

      // piso errors
      if (
        direccDpto &&
        direccDpto.length > 0 &&
        (!direccPiso || direccPiso === "")
      )
        newErrors.direccPiso = "Si ingreso departamento debe ingresar piso";

      // dpto errors
      if (
        direccPiso &&
        direccPiso.length > 0 &&
        (!direccDpto || direccDpto === "")
      )
        newErrors.direccDpto = "Si ingreso piso debe ingresar departamento";

      // direccMzna errors
      if (
        direccLote &&
        direccLote.length > 0 &&
        (!direccMzna || direccMzna === "")
      )
        newErrors.direccMzna = "Si ingreso lote debe ingresar manzana";

      // direccLote errors
      if (
        direccMzna &&
        direccMzna.length > 0 &&
        (!direccLote || direccLote === "")
      )
        newErrors.direccLote = "Si ingreso manzana debe ingresar lote";
    }

    return newErrors;
  };

  return (
    <>
      <div className="ps-2">
        <Breadcrumb>
          <Breadcrumb.Item href="/contribuyente/ver_contribuyente">
            Contribuyente
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Agregar contribuyente</Breadcrumb.Item>
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
              <i className="fas fa-user-plus me-2"></i>
              Agregar contribuyente
            </h3>

            <Box sx={{ width: "100%" }} className="mt-4 mb-3">
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption" key={index}>
                        Optional
                      </Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps} key={index}>
                        {label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>
              Step {activeStep + 1}
            </Typography> */}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep <= 1}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      variant="contained"
                      size="small"
                    >
                      <i className="fas fa-chevron-left me-2"></i> Regresar
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}

                    <Button
                      onClick={handleNext}
                      variant="contained"
                      size="small"
                      color={
                        activeStep === steps.length - 1 ? "primary" : "success"
                      }
                    >
                      {activeStep === steps.length - 1 ? (
                        <div className="m-0 p-0">
                          <i className="far fa-save"></i> Grabar
                        </div>
                      ) : (
                        <div>
                          Siguiente<i className="fas fa-chevron-right ms-2"></i>
                        </div>
                      )}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
            <hr />
            {activeStep === 0 ? (
              <div>
                <ContribAddTipoContComponent
                  valores={valores}
                  setField={setField}
                  tipoContribuyente={tipoContribuyente}
                  key={valores.codigoContrib}
                  errors={errors}
                />
              </div>
            ) : (
              <div>
                {activeStep === 1 ? (
                  <div>
                    <ContribEditDatPriComponent
                      valores={valores}
                      setField={setField}
                      tipoContribuyente={tipoContribuyente}
                      key={valores.codigoContrib}
                      errors={errors}
                    />
                  </div>
                ) : (
                  <div>
                    {activeStep === 2 ? (
                      <div>
                        <ContribEditDomiciComponent
                          valores={valores}
                          setField={setField}
                          tipoContribuyente={tipoContribuyente}
                          key={valores.codigoContrib}
                          errors={errors}
                        />
                      </div>
                    ) : (
                      <div>
                        <ContribEditOtrosComponent
                          valores={valores}
                          setField={setField}
                          key={valores.codigoContrib}
                          errors={errors}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <hr />
            <Box sx={{ width: "100%" }} className="mt-0 mb-3">
              {activeStep === steps.length ? (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>
              Step {activeStep + 1}
            </Typography> */}

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 0 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep <= 1}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      variant="contained"
                      size="small"
                    >
                      <i className="fas fa-chevron-left me-2"></i> Regresar
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}

                    <Button
                      onClick={handleNext}
                      variant="contained"
                      size="small"
                      color={
                        activeStep === steps.length - 1 ? "primary" : "success"
                      }
                    >
                      {activeStep === steps.length - 1 ? (
                        <div className="m-0 p-0">
                          <i className="far fa-save"></i> Grabar
                        </div>
                      ) : (
                        <div>
                          Siguiente<i className="fas fa-chevron-right ms-2"></i>
                        </div>
                      )}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
        </div>
      </Container>
    </>
  );
};
