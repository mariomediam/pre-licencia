import { useState } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RequeElaboraSteppersComponent } from "./RequeElaboraSteppersComponent";

export const RequeElaboraComponent = () => {
  const { currentReque } = useSelector((state) => state.requerimiento);
  const { accion } = currentReque;

  const [activeStep, setActiveStep] = useState(accion === "NUEVO" ? 0 : 1);
  const [skipped, setSkipped] = useState(new Set());

  const steps = [
    "Escoger tipo",
    "Escoger tareas",
    "Agregar bienes o servicios",
    "Ingresar motivo",
    "Revisar y grabar",
  ];

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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* <>
        <Typography sx={{ mb: 1 }}>
            <small className="text-muted">
              Paso {activeStep + 1} de {steps.length}
            </small>
          </Typography>

        </> */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
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
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <RequeElaboraSteppersComponent activeStep={activeStep} />

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="success"
              disabled={activeStep <= 1}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="contained"
              size="small"
            >
              <i className="fas fa-chevron-left me-2"></i> Regresar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {/* <div style={{ position: "relative" }}>
              <div
                style={{ position: "absolute", right: "0px", width: "70px" }}
              >
                <div style={{ position: "fixed", bottom: "25px" }}> */}
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
                {/* </div>
              </div>
            </div> */}
          </Box>
        </>
      )}
    </Box>
  );
};
