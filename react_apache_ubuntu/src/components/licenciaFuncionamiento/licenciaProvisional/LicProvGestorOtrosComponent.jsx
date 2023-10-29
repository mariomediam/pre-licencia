import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";

import {
  obtenerLicProvRubros,
  obtenerLicProvUbica,
} from "../../../services/licFuncService";
import { setCurrentLicProv } from "../../../store/slices";

export const LicProvGestorOtrosComponent = () => {
  const dispatch = useDispatch();

  const { accion: accionStr } = useParams();
  const accion = parseInt(accionStr);

  const { currentLicProv } = useSelector((state) => state.licProv);
  const {
    licProvRubro,
    licProvUbica,
    licProvTipo,
    licProvFecEmi,
    licProvFinVig,
    licProvHorAte,
    licProvCerGas,
    licProvObs,
    licProvFormato,
  } = currentLicProv;

  const [rubros, setRubros] = useState([]);
  const [optionsRubros, setOptionsRubros] = useState([]);
  const [optionRubroSelected, setOptionRubroSelected] = useState(
    optionsRubros[0]
  );
  const [dimensiones, setDimensiones] = useState("");

  const [ubicaciones, setUbicaciones] = useState([]);
  const [optionsUbicaciones, setOptionsUbicaciones] = useState([]);
  const [OptionUbicacionSelected, setOptionUbicacionSelected] = useState(optionsUbicaciones[0]);

  // *************************** inicio  ok ***************************
  const onChangeInputFecEmi = (event) => {
    const fecEmi = event.target.value;
    const fechaEmision = new Date(fecEmi);
    fechaEmision.setFullYear(fechaEmision.getFullYear() + 1);
    const fecFin = fechaEmision.toISOString().slice(0, 10);

    dispatch(
      setCurrentLicProv({
        licProvFecEmi: fecEmi,
        licProvIniVig: fecEmi,
        licProvFinVig: fecFin,
      })
    );
  };

  const onChangeInfutFecFin = (event) => {
    const fecFin = event.target.value;
    dispatch(
      setCurrentLicProv({
        D_LicProv_Fec: fecFin,
      })
    );
  };

  const onChangeInputHorAte = (event) => {
    const horAte = event.target.value;
    dispatch(
      setCurrentLicProv({
        licProvHorAte: horAte,
      })
    );
  };

  const onChangeInputCerGas = (event) => {
    const cerGas = event.target.value;
    dispatch(
      setCurrentLicProv({
        licProvCerGas: cerGas,
      })
    );
  };

  const onChangeInputObs = (event) => {
    const obs = event.target.value;
    dispatch(
      setCurrentLicProv({
        licProvObs: obs,
      })
    );
  };

  const onChangeInputFormato = (event) => {
    const formato = event.target.value;
    dispatch(
      setCurrentLicProv({
        licProvFormato: formato,
      })
    );
  };

  // *************************** fin  ok ***************************

  useEffect(() => {
    const obtenerRubros = async () => {
      const rubrosTmp = await obtenerLicProvRubros({ tipo: licProvTipo });
      setRubros(rubrosTmp);
    };

    const obtenerUbicaciones = async () => {
      const ubicacionesTmp = await obtenerLicProvUbica({
        tipo: licProvTipo,
      });
      setUbicaciones(ubicacionesTmp);
    };

    obtenerRubros();
    obtenerUbicaciones();
  }, [licProvTipo]);

  useEffect(() => {
    const options = rubros.map((rubro) => ({
      value: rubro.rubroId,
      label: rubro.rubroDescrip,
    }));

    setOptionsRubros(options);
  }, [rubros]);

  useEffect(() => {
    const options = ubicaciones.map((ubicacion) => ({
      value: ubicacion.ubicaId,
      label: `${ubicacion.ubicaOrden} - ${ubicacion.ubicaDescrip} (${ubicacion.ubicaCodigo})`,
    }));
    setOptionsUbicaciones(options);
  }, [ubicaciones]);

  useEffect(() => {
    if (accion===2 && optionsRubros.length>0){
      setOptionRubroSelected(optionsRubros.filter((rubro) => rubro.value === licProvRubro)[0]);
    }
    //eslint-disable-next-line
  }, [optionsRubros]);

  useEffect(() => {
    if (accion===2 && optionsUbicaciones.length>0){
      setOptionUbicacionSelected(optionsUbicaciones.filter((ubicacion) => ubicacion.value === licProvUbica)[0]);
    }
    //eslint-disable-next-line
  }, [optionsUbicaciones]);

  // **************************

  useEffect(() => {    
    if (optionRubroSelected) {
      dispatch(
        setCurrentLicProv({
          licProvRubro: optionRubroSelected?.value || 0,
        })
      );
      const rubroFiltered = rubros.filter(
        (rubro) => rubro.rubroId === optionRubroSelected?.value
      );
      let dimensionesText = "";
      if (rubroFiltered.length > 0) {
        dimensionesText = rubroFiltered[0].rubroDimension;
      }
      setDimensiones(dimensionesText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionRubroSelected, dispatch]);



  useEffect(() => {
    if (OptionUbicacionSelected){
      dispatch(
        setCurrentLicProv({
          licProvUbica: OptionUbicacionSelected?.value || 0,
        })
      );
    }
    
  }, [OptionUbicacionSelected, dispatch]);

  return (
    <>
      {/* ******************** Rubro ********************* */}
      {/* {JSON.stringify(optionRubroSelected)} */}
      {/* <hr />
      <hr />
      {dimensiones} */}
      <Form.Group className="mt-3">
        <Form.Label className="text-muted mb-1">
          {" "}
          <small>Rubro</small>
        </Form.Label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          value={optionRubroSelected}
          placeholder="Escoger rubro"
          // ref={selectGiros}
          noOptionsMessage={() => "Registro no encontrado"}
          name="optionsRubros"
          onChange={setOptionRubroSelected}
          options={optionsRubros}
        />
      </Form.Group>

      {/* ******************** Ubicación ********************* */}
      <Form.Group className="mt-3">
        <Form.Label className="text-muted mb-1">
          {" "}
          <small>Ubicación</small>
        </Form.Label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          value={OptionUbicacionSelected}
          placeholder="Escoger ubicación"
          // ref={selectGiros}
          noOptionsMessage={() => "Registro no encontrado"}
          name="optionsUbicacaiones"
          onChange={setOptionUbicacionSelected}
          options={optionsUbicaciones}
        />
      </Form.Group>

      {/* ******************** Dimensiones ********************* */}
      <div>
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Dimensiones del módulo</small>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            disabled
            value={dimensiones || ""}
          />
        </Form.Group>
      </div>

      {/* ******************** Horario ********************* */}
      <div>
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Horario de atención</small>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            onChange={onChangeInputHorAte}
            value={licProvHorAte}
          />
        </Form.Group>
      </div>

      {/* ******************** Certificado gas ********************* */}
      <div>
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Certificado de mantenimiento de gas</small>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            onChange={onChangeInputCerGas}
            value={licProvCerGas}
          />
        </Form.Group>
      </div>

      {/* ******************** Observaciones ********************* */}
      <div>
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Observaciones</small>
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder=""
            rows={3}
            onChange={onChangeInputObs}
            value={licProvObs}
          />
        </Form.Group>
      </div>

      {/* ******************** Fecha de emisión ********************* */}
      <div className="col-12 col-sm-3">
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Fecha de emisión</small>
          </Form.Label>
          <Form.Control
            type="date"
            // ref={inputFecIni}
            value={new Date(licProvFecEmi).toISOString().slice(0, 10)}
            // value={licProvFecEmi.toISOString().slice(0, 10)}
            onChange={onChangeInputFecEmi}
            //   value={valores.fecNac}
            //   onChange={(e) => setField("fecNac", e.target.value)}
            //   isInvalid={!!errors.fecNac}
          />

          <Form.Control.Feedback type="invalid">
            {/* {errors.fecNac} */}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* ******************** Fecha de vencimiento ********************* */}
      <div className="col-12 col-sm-3">
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Fecha de vencimiento</small>
          </Form.Label>
          <Form.Control
            type="date"
            name="name_fecNac"
            disabled
            value={new Date(licProvFinVig).toISOString().slice(0, 10)}
            onChange={onChangeInfutFecFin}
            //   value={valores.fecNac}
            //   onChange={(e) => setField("fecNac", e.target.value)}
            //   isInvalid={!!errors.fecNac}
          />

          <Form.Control.Feedback type="invalid">
            {/* {errors.fecNac} */}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* ******************** Número de formato ********************* */}
      <div className="col-12 col-sm-3">
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Número de formato</small>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            onChange={onChangeInputFormato}
            value={licProvFormato}
          />
        </Form.Group>
      </div>
    </>
  );
};
