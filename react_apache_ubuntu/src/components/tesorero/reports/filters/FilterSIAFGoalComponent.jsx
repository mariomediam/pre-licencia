import { Form } from "react-bootstrap";
import CircleLetterF from "../../../../icons/CircleLetterF";

export const FilterSIAFGoalComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <CircleLetterF />
        <small className="ms-1">Meta</small>
      </div>
      <div>
        <Form.Control type="text" aria-describedby="Meta presupuestal" />
      </div>
    </div>
  );
};
