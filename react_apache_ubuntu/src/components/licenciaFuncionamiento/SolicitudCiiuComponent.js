import React, { useState, useRef, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import { Toast } from "../tools/PopMessage";
import {
  obtenerGiroNegocioPorArea,
  obtenerSolicitud,
  agregarGiroSolicitud,
} from "../../services/licFuncService";

export const SolicitudCiiuComponent = () => {
  const navigate = useNavigate();
  
  const { userName } = useContext(AuthContext);

  const [selectedOption, setSelectedOption] = useState([]);
  const [giros, setGiros] = useState([]);

  const inputSolicitud = useRef();
  const selectGiros = useRef();

  const BuscarGiros = async () => {
    if (inputSolicitud.current.value.trim().length === 5) {
      const solicitud = await obtenerSolicitud(
        inputSolicitud.current.value.trim()
      );

      if (solicitud.Q_DatSol_Area) {
        const girosTmp = await obtenerGiroNegocioPorArea(
          Math.ceil(solicitud.Q_DatSol_Area),
          undefined,
          undefined
        );

        // const options = girosTmp.map(
        //   ({ C_GiroNeg, C_GirNeg_CIIU, N_GirNeg }) => {
        //     return {
        //       value: C_GiroNeg,
        //       label: `${C_GirNeg_CIIU.trim()} ${N_GirNeg.trim()}`,
        //     };
        //   }
        // );
        const options = girosTmp.filter(({C_GiroNeg, C_GirNeg_Padre}) => C_GiroNeg !== C_GirNeg_Padre).map(
          ({ C_GiroNeg, C_GirNeg_CIIU, N_GirNeg }) => {
            return {
              value: C_GiroNeg,
              label: `${C_GirNeg_CIIU.trim()} ${N_GirNeg.trim()}`,
            };
          }
        );
        setGiros(options);
        selectGiros.current.focus();
      }
    } else {
      setGiros([]);
      selectGiros.current.clearValue();
    }
  };

  // useEffect(() => {
  //   console.log(selectedOption);
  // }, [selectedOption]);

  const agregarDocumento = async (e) => {
    try {
      const girosGrabar = selectedOption.map(({ value }) => value);
      await agregarGiroSolicitud(
        inputSolicitud.current.value.trim(),
        girosGrabar,
        userName
      );

      Toast.fire({
        icon: "success",
        title: "CIIUs grabados con éxito",
        background: "#F4F6F6",
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error grabando CIIUs",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div className="col-lg-4 mt-4">
        <Form.Group md="6" controlId="id_apepat" className="mt-2">
          <Form.Label className="text-muted mb-0">
            <small className="mb-0">Solicitud</small>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Número de solicitud"
            name="name_apepat"
            ref={inputSolicitud}
            onChange={BuscarGiros}
            maxLength={5}
          />
        </Form.Group>
      </div>

      <div>
        <Form.Group className="mt-3" controlId="formBasicEmail">
          <Form.Label className="text-muted mb-0">CIIU</Form.Label>
          <Select
            placeholder="Buscar CIIU"
            ref={selectGiros}
            noOptionsMessage={() => "Registro no encontrado"}
            isMulti
            name="colors"
            onChange={setSelectedOption}
            options={giros}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Form.Group>
      </div>
      <hr />
      <div className="d-flex justify-content-end mt-2">
        <Button variant="secondary" onClick={() => navigate("/inicio")}>
          <i className="far fa-times-circle me-1"></i>
          Cerrar
        </Button>
        <Button
          className="ms-2"
          variant="primary"
          onClick={agregarDocumento}
          disabled={!selectedOption.length > 0}
        >
          <i className="far fa-save me-2"></i>Grabar
        </Button>
      </div>
    </>
  );
};
