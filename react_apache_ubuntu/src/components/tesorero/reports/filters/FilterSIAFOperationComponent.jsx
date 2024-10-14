import { Form } from "react-bootstrap";

import HttpOptionsIcon from "../../../../icons/HttpOptionsIcon";

export const FilterSIAFOperationComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2" title="Tipo de operación">
        <HttpOptionsIcon />
        <small className="ms-1">Operación</small>
      </div>
      <div>
        <Form.Control type="text" aria-describedby="Tipo de operación" />
      </div>
    </div>
  );
};
