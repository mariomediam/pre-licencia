import { Form } from "react-bootstrap";

import ClockIcon from "../../../../icons/ClockIcon";

export const FilterSIAFCycleComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <ClockIcon />
        <small className="ms-1">Ciclo</small>
      </div>
      <div>
        <Form.Select aria-label="Default select example">
          <option>Gasto</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>
    </div>
  );
};
