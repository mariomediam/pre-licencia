import { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { obtenerTipoContribuyente } from "../../services/contribuyenteService";
import { obtenerContribuyenteCodigo } from "../../services/contribuyenteService";
import { ContribEditDatPriComponent } from "./ContribEditDatPriComponent";

const steps = ["Datos principales", "Domicilio", "Otros"];

export const ContribuyenteEditComponent = ({ contribEdit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [valores, setValores] = useState({
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
  });
  const [skipped, setSkipped] = useState(new Set());
  const [tipoContribuyente, setTipoContribuyente] = useState([]);

  // const inputNombre = useRef();

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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
    console.log("Ver contribuyente " + contribEdit);
    if (contribEdit && contribEdit.length > 0) {
      const contribuyenteTmp = await obtenerContribuyenteCodigo(contribEdit);
      setValores({
        ...valores,
        tipoContrib: contribuyenteTmp.C001Tip_Cont,
        apePat: contribuyenteTmp.separa_pepat,
        apeMat: contribuyenteTmp.separa_apemat,
        nombre: contribuyenteTmp.separa_nombre,
        sexo: contribuyenteTmp.C001Sexo,
        fecNac: contribuyenteTmp.D001FecNac.toLocaleString().substr(0,10),
        observ: contribuyenteTmp.C001Motivo
      });
      // setDocumentos(documentosTmp);
      console.log(contribuyenteTmp);
    }
  };

  const verTipoContribuyente = async () => {
    console.log("Listar tipo de contribuyente");
    const tipoContribTmp = await obtenerTipoContribuyente();
    setTipoContribuyente(tipoContribTmp);
    console.log(tipoContribTmp);
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
                    <Typography variant="caption" key={index}>Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}  key={index}>{label}</StepLabel>
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
                setValores={setValores}
                tipoContribuyente={tipoContribuyente}
                key = {valores.codigoContrib}
              />
            </div>
          ) : null}
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
