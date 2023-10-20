import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { useEffect, useState } from "react";
import { obtenerLicProvRubros } from "../../../services/licFuncService";
import { setCurrentLicProv } from "../../../store/slices";

export const LicProvGestorOtrosComponent = () => {
  const dispatch = useDispatch();

  const { currentLicProv, isLoading } = useSelector((state) => state.licProv);
  const { C_Rubro, C_LicProv_Tipo } = currentLicProv;

  const [rubros, setRubros] = useState([]);
  const [optionsRubros, setOptionsRubros] = useState([]);
  const [rubroSelected, setRubroSelected] = useState(0);
  const [dimensiones, setDimensiones] = useState("");

  const onChangeSelectRubro = () => {
    console.log(event.target);
    // const rubro = event.target.value;
    // dispatch({...currentLicProv, C_Rubro: rubro});
  };

  useEffect(() => {
    const obtenerRubros = async () => {
      const rubrosTmp = await obtenerLicProvRubros({ tipo: C_LicProv_Tipo });
      setRubros(rubrosTmp);
    };
    obtenerRubros();
  }, [C_LicProv_Tipo]);

  useEffect(() => {
    const options = rubros.map((rubro) => ({
      value: rubro.rubroId,
      label: rubro.rubroDescrip,
    }));

    setOptionsRubros(options);
  }, [rubros]);

  useEffect(() => {
    if (optionsRubros.length > 0) {
      setRubroSelected(optionsRubros[0]);
    }
  }, [optionsRubros]);

  useEffect(() => {
    dispatch(
      setCurrentLicProv({
        ...currentLicProv,
        C_Rubro: rubroSelected?.value || 0,
      })
    );
    const rubroFiltered = rubros.filter(
      (rubro) => rubro.rubroId === rubroSelected.value
    );
    let dimensionesText = "";
    if (rubroFiltered.length > 0) {
      dimensionesText = rubroFiltered[0].rubroDimension;
    }
    setDimensiones(dimensionesText);
  }, [rubroSelected]);

  return (
    <>
      {/* ******************** Rubro ********************* */}
      {/* {JSON.stringify(rubroSelected)}
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
          value={rubroSelected}
          placeholder="Escoger rubro"
          // ref={selectGiros}
          noOptionsMessage={() => "Registro no encontrado"}
          name="optionsRubros"
          onChange={setRubroSelected}
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
          placeholder="Escoger ubicación"
          // ref={selectGiros}
          noOptionsMessage={() => "Registro no encontrado"}
          isMulti
          name="colors"
          // onChange={setSelectedOption}
          // options={giros}
          className="basic-multi-select"
          classNamePrefix="select"
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
          <Form.Control type="text" placeholder="" />
        </Form.Group>
      </div>

      {/* ******************** Certificado gas ********************* */}
      <div>
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Certificado de mantenimiento de gas</small>
          </Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
      </div>

      {/* ******************** Observaciones ********************* */}
      <div>
        <Form.Group className="text-muted mt-3">
          <Form.Label className="mb-1">
            {" "}
            <small>Observaciones</small>
          </Form.Label>
          <Form.Control as="textarea" placeholder="" rows={3} />
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
            name="name_fecNac"
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
          <Form.Control type="text" placeholder="" />
        </Form.Group>
      </div>
    </>
  );
};
