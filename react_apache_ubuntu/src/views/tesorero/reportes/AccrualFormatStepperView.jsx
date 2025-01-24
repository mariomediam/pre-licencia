import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import ChevronRightIcon from "../../../icons/ChevronRightIcon";
import DeviceFloppyIcon from "../../../icons/DeviceFloppyIcon";
import ChevronLeftIcon from "../../../icons/ChevronLeftIcon";
import RotateClockwiseIcon from "../../../icons/RotateClockwiseIcon";
import { AccrualFormatStep0 } from "../../../components/tesorero/reports/filters/AccrualFormatStepper/AccrualFormatStep0";
import { AccrualFormatStep1 } from "../../../components/tesorero/reports/filters/AccrualFormatStepper/AccrualFormatStep1";
import { AccrualFormatStep2 } from "../../../components/tesorero/reports/filters/AccrualFormatStepper/AccrualFormatStep2";
import {
  downloadAccrualFormat,
  procesoActualizarRegistro,
} from "../../../services/siafService";

const steps = ["Seleccionar expediente", "Seleccionar fase", "Generar formato"];

export const AccrualFormatStepperView = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expedErrors, setExpedErrors] = useState({});

  const [retentions, setRetentions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentExped, currentSecuencia } = useSelector((state) => state.siaf);
  const { anioExped, numeroExped } = currentExped;
  const {
    anioExped: anioSecuencia,
    numeroExped: numeroSecuencia,
    secuencia,
    correlativo,
    MONTO_NACIONAL = 0,
  } = currentSecuencia;

  const handleNext = async () => {
    if (validateStep(activeStep)) {
      if (activeStep === 0) {
        setIsLoading(true);
        const params = {
          anio: anioExped,
          expediente: numeroExped,
        };
        await procesoActualizarRegistro(params);
        setIsLoading(false);
      }

      if (activeStep === steps.length - 1) {
        await donwloadFormat();
        return;
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AccrualFormatStep0
            expedErrors={expedErrors}
            setExpedErrors={setExpedErrors}
          />
        );
      case 1:
        return (
          <AccrualFormatStep1
            expedErrors={expedErrors}
            setExpedErrors={setExpedErrors}
          />
        );
      case 2:
        return (
          <AccrualFormatStep2
            retentions={retentions}
            setRetentions={setRetentions}
            expedErrors={expedErrors}
            setExpedErrors={setExpedErrors}
          />
        );
      default:
        return <></>;
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return validateStep0();
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      default:
        return false;
    }
  };

  const validateStep0 = () => {
    let errors = {};

    if (anioExped.length !== 4) {
      errors.anioExped = "El año del expediente debe tener 4 dígitos";
    }
    if (numeroExped.length === 0) {
      errors.numeroExped = "El número del expediente es requerido";
    }
    setExpedErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep1 = () => {
    let errors = {};

    if (
      !secuencia ||
      !correlativo ||
      anioExped !== anioSecuencia ||
      numeroExped !== numeroSecuencia
    ) {
      errors.selectedSecuencia = "Debe seleccionar una fase";
    }

    setExpedErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    let errors = {};

    const retentionsLessZero = retentions.filter(
      (retention) => retention.value < 0
    );

    const sumRetentions = retentions.reduce(
      (acc, retention) => acc + retention.value,
      0
    );

    for (const retention of retentionsLessZero) {
      errors[retention.code] = "El monto debe ser mayor o igual a 0";
    }

    if (sumRetentions > MONTO_NACIONAL) {
      errors.totalRetentions =
        "La suma de las retenciones no debe superar el monto fase";
    }

    setExpedErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderStepLabel = (label, index) => (
    <StepLabel
      StepIconProps={{
        sx: {
          color: activeStep === index ? "primary.main" : "grey.500",
        },
      }}
    >
      <Typography
        sx={{
          color: activeStep === index ? "primary.main" : "grey.500",
          fontWeight: activeStep === index ? "bold" : "normal",
        }}
      >
        {label}
      </Typography>
    </StepLabel>
  );

  const renderButonNext = {
    0: {
      true: (
        <>
          <CircularProgress size="24px" className="me-2" />
          <span className="pt-1">Buscando...</span>
        </>
      ),
      false: (
        <>
          <span className="pt-1 ps-1">Siguiente</span>
          <ChevronRightIcon />
        </>
      ),
    },
    1: {
      true: (
        <>
          <span className="pt-1 ps-1">Siguiente</span>
          <ChevronRightIcon />
        </>
      ),
      false: (
        <>
          <span className="pt-1 ps-1">Siguiente</span>
          <ChevronRightIcon />
        </>
      ),
    },
    2: {
      true: (
        <>
          <CircularProgress size="24px" className="me-2" />
          <span className="pt-1">Descargando...</span>
        </>
      ),
      false: (
        <>
          <DeviceFloppyIcon className="me-1" />
          <span className="pt-1 pe-1">Descargar formato</span>
        </>
      ),
    },
  };

  const renderButtons = () => (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button
        color="success"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
        variant="contained"
        size="small"
      >
        <div className="d-flex align-items-center">
          <ChevronLeftIcon />
          <span className="pt-1 pe-1">Regresar</span>
        </div>
      </Button>
      {activeStep === steps.length - 1 && (
        <Button
          onClick={onClicButtonRestart}
          variant="contained"
          size="small"
          color="secondary"
        >
          <div className="d-flex align-items-center">
            <RotateClockwiseIcon className="me-1" />
            <span className="pt-1 pe-1">Reiniciar</span>
          </div>
        </Button>
      )}
      <Box sx={{ flex: "1 1 auto" }} />
      <Button
        onClick={handleNext}
        variant="contained"
        size="small"
        color={activeStep === steps.length - 1 ? "primary" : "success"}
        disabled={isLoading}
        // disabled={activeStep === steps.length - 1 && isLoading}
      >
        <div className="d-flex align-items-center">
          {renderButonNext[activeStep][isLoading]}
        </div>
      </Button>
    </Box>
  );

  const donwloadFormat = async () => {
    try {
      setIsLoading(true);
      const params = {
        anio: anioSecuencia,
        expediente: numeroSecuencia,
        secuencia: secuencia,
        correlativo: correlativo,
        retentions,
      };
      const accrualFormat = await downloadAccrualFormat(params);
      const name_file = `Formarto Devengado SIAF ${numeroSecuencia}-${anioSecuencia}-${secuencia}`;
      const url = URL.createObjectURL(accrualFormat);
      const link = document.createElement("a");
      link.href = url;
      link.download = name_file;
      link.target = "_blank";
      link.click();
      setIsLoading(false);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onClicButtonRestart = () => {
    window.location.reload();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={false}>
            {renderStepLabel(label, index)}
          </Step>
        ))}
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
          <Box sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Box>
          {renderButtons()}
        </>
      )}
    </Box>
  );
};
