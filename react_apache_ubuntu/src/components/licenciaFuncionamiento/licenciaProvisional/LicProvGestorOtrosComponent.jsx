import { Form } from "react-bootstrap";
import Select from "react-select";

export const LicProvGestorOtrosComponent = () => {
  return (
    <>
      {/* ******************** Rubro ********************* */}
      <Form.Group className="mt-3">
        <Form.Label className="text-muted mb-1">
          {" "}
          <small>Rubro</small>
        </Form.Label>
        <Select
          placeholder="Escoger rubro"
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
          <Form.Control type="text" placeholder="" disabled />
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
          <Form.Control as="textarea" placeholder="" rows={3}/>
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
