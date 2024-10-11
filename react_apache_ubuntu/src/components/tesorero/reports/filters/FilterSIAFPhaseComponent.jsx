import { Form } from "react-bootstrap";

import StairsDownIcon from "../../../../icons/StairsDownIcon";

export const FilterSIAFPhaseComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <StairsDownIcon />
        <small className="ms-1">Fase</small>
      </div>
      <div>
        <Form.Select aria-label="Default select example">
          <option>GIRADO</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>
    </div>
  );
};
