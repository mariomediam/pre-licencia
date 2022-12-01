import { useState, useEffect } from "react";
import { Breadcrumb, Form } from "react-bootstrap";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { obtenerTipoContribuyente } from "../../services/contribuyenteService";

import { obtenerContribuyenteCodigo } from "../../services/contribuyenteService";

const steps = ["Datos principales", "Domicilio", "Otros"];

export const ContribuyenteEditComponent = ({
  contribEdit
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [valores, setValores] = useState({
    codigoContrib: contribEdit,
    tipoContrib: "",
    nombre: "",
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
    if (
      contribEdit &&
      contribEdit.length > 0
    ) {      
      const contribuyenteTmp = await obtenerContribuyenteCodigo(
        contribEdit
      );
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
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
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
              <div className="col-lg-2">
                <Form.Group
                  md="6"
                  controlId="id_codigoContrib"
                  className="mt-2"
                >
                  <Form.Label className="text-muted mb-0">
                    <small className="mb-0">Código nuevo</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Código"
                    name="name_codigoContrib"
                    value={valores.codigoContrib}
                    readOnly
                    // ref= { inputNombre }
                    onChange={(e) =>
                      setValores({ ...valores, codigoContrib: e.target.value })
                    }
                    // onChange={handleChange}
                    // isInvalid={!!errors.city}
                  />

                  <Form.Control.Feedback type="invalid">
                    {/* {errors.city} */}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <Form.Group md="6" controlId="id_tipoContrib" className="mt-2 col-lg-4">
                <Form.Label className="text-muted mb-0">
                  <small className="mb-0">Tipo de contribuyente</small>
                </Form.Label>
                <Form.Select
                  aria-label="Tipo de contribuyente"
                  value={valores.tipoContrib}
                  onChange={(e) =>
                    setValores({ ...valores, tipoContrib: e.target.value })
                  }
                >
                  {tipoContribuyente.map(({ C004Tip_Cont, C004Nombre }, i) => (
                    <option key={C004Tip_Cont} value={C004Tip_Cont}>
                      {C004Nombre.trim()}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {/* {errors.city} */}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group md="6" controlId="id_nombre" className="mt-2">
                <Form.Label className="text-muted mb-0">
                  <small className="mb-0">Nombre</small>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="name_nombre"
                  value={valores.nombre}
                  // ref= { inputNombre }
                  onChange={(e) =>
                    setValores({ ...valores, nombre: e.target.value })
                  }
                  // onChange={handleChange}
                  // isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid">
                  {/* {errors.city} */}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
