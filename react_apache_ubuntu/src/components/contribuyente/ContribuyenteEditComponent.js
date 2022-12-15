import { useState, useEffect, useContext } from "react";
import { Breadcrumb } from "react-bootstrap";
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
  obtenerContribuyenteCodigo,
  obtenerContribuyenteDocumento,
  obtenerContribuyenteTelefono,
  obtenerContribuyenteDirElect,
  obtenerContribuyenteNacion,
  updateContribuyenteAll,
} from "../../services/contribuyenteService";
import { ContribEditDatPriComponent } from "./ContribEditDatPriComponent";
import { ContribEditDomiciComponent } from "./ContribEditDomiciComponent";
import { ContribEditOtrosComponent } from "./ContribEditOtrosComponent";
import { Toast } from "../tools/PopMessage";

const steps = ["Datos principales", "Domicilio", "Otros"];

export const ContribuyenteEditComponent = ({ contribEdit, setCodContribIni, setShowForm }) => {

  
  const { userName } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [valores, setValores] = useState({
    showForm: 3,
    codigoContrib: contribEdit,
    tipoContrib: "",
    homonimo: "",
    codigoAnt: "",
    apePat: "",
    apeMat: "",
    nombre: "",
    sexo: "",
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

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      try {
        if (activeStep === steps.length - 1) {          
          await actualizarContribuyente();
          Toast.fire({
            icon: "success",
            title: "El contribuyente se actualizo con éxito",
            background: "#F4F6F6",
            timer: 1500,
          });
          setTimeout(() => {
            setCodContribIni(contribEdit);
            setShowForm(1);
          }, 1500)
          
        }        

        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error grabando contribuyente',
          text: error.response.data.message
        })
        
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

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const verContribuyente = async () => {    
    if (contribEdit && contribEdit.length > 0) {
      const contribuyenteTmp = await obtenerContribuyenteCodigo(contribEdit);
      const documentosTmp = await obtenerContribuyenteDocumento(contribEdit);
      const telefonosTmp = await obtenerContribuyenteTelefono(contribEdit);
      const emailTmp = await obtenerContribuyenteDirElect(contribEdit);
      const nacionesTmp = await obtenerContribuyenteNacion(contribEdit);
      setValores({
        ...valores,
        tipoContrib: contribuyenteTmp.C001Tip_Cont,
        apePat: contribuyenteTmp.separa_pepat,
        apeMat: contribuyenteTmp.separa_apemat,
        nombre: contribuyenteTmp.separa_nombre,
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
        documentos: documentosTmp,
        telefonos: telefonosTmp,
        emails: emailTmp,
        naciones: nacionesTmp,
      });
    }
  };

  const verTipoContribuyente = async () => {
    const tipoContribTmp = await obtenerTipoContribuyente();
    setTipoContribuyente(tipoContribTmp);
  };

  const actualizarContribuyente = async () => {
    let objContribuyente = { ...valores };
    objContribuyente.nombreCompleto =
      objContribuyente.tipoContrib === "01"
        ? `${objContribuyente.apePat.trim()}  ${objContribuyente.apeMat.trim()}-${objContribuyente.nombre.trim()}`
        : objContribuyente.nombre.trim();
    objContribuyente.responsable = userName;
    await updateContribuyenteAll(
      objContribuyente.codigoContrib,
      objContribuyente
    );
   
  };

  // useEffect(() => {
  //   verContribuyente();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [codigoContribSelecc]);

  useEffect(() => {
    verTipoContribuyente();
    verContribuyente();
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

  const findFormErrors = () => {
    const {
      codigoContrib,
      tipoContrib,
      apePat,
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
    } = valores;
    const newErrors = {};

    if (activeStep === 0) {
      // codigoContrib errors
      if (!codigoContrib || codigoContrib === "")
        newErrors.codigoContrib = "Código no válido";

      // tipoContrib errors
      if (!tipoContrib || tipoContrib === "")
        newErrors.tipoContrib = "Seleccione tipo de contribuyente";
      else if (tipoContrib === "01" && (!apePat || apePat === ""))
        newErrors.apePat = "Ingrese apellido paterno";

      // nombre errors
      if (!nombre || nombre === "")
        newErrors.nombre = "Ingrese Nombre / Razón social";
      else if (nombre.length > 150)
        newErrors.nombre = "El nombre es demasiado largo!";

      // observ errors
      if (!observ || observ === "") newErrors.observ = "Ingrese observaciones";
      else if (observ.length > 800)
        newErrors.observ = "Las observaciones son demasiado largas";
    } else if (activeStep === 1) {
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
    <div>
      <div className="ps-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Contribuyente</Breadcrumb.Item>
          <Breadcrumb.Item active>Editar contribuyente</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="row justify-content-center">
        <div
          className="align-items-center p-2 col-sm-12 col-lg-8"
          style={{ border: "0px solid black" }}
        >
          <h3 className="mt-0 text-center">
            <i className="fas fa-user-edit me-1"></i>
            Editar contribuyente
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
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="contained"
                    size="small"
                  >
                    <i className="fas fa-chevron-left me-2"></i> Regresar
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
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
          {activeStep === 0 ? (
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
              {activeStep === 1 ? (
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
          <Box sx={{ width: "100%" }} className="mt-4 mb-3">
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
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="contained"
                    size="small"
                  >
                    <i className="fas fa-chevron-left me-2"></i> Regresar
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
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
    </div>
  );
};
