import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export const ContribEditDomiciComponent = ({
  valores,
  setField,
  tipoContribuyente,
  errors,
}) => {
  return (
    <div>
      <Form.Group md="6" controlId="id_codigoLugar" className="mt-2">
        <Form.Label className="text-muted mb-0">
          <small className="mb-0">Lugar</small>
        </Form.Label>
        {/* <Form.Control
          type="text"
          placeholder="Código lugar"
          name="name_codigoLugar"
          value={valores.codigoLugar}          
          onChange={(e) => setField("codigoLugar", e.target.value)}
          isInvalid={!!errors.codigoLugar}
        /> */}
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Código lugar"
            type="text"
            placeholder="Código lugar"
            name="name_codigoLugar"
            value={valores.codigoLugar}
            onChange={(e) => setField("codigoLugar", e.target.value)}
            isInvalid={!!errors.codigoLugar}
          />
          <Form.Control
            aria-label="nombreLugar"
            type="text"
            placeholder="Nombre lugar"
            name="name_nombreLugar"
            value={valores.nombreLugar}
            onChange={(e) => setField("nombreLugar", e.target.value)}
            isInvalid={!!errors.nombreLugar}
          />
        </InputGroup>

        <Form.Control.Feedback type="invalid">
          {errors.codigoLugar}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};
