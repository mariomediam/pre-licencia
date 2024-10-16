import { Form } from "react-bootstrap";
import CircleLetterF from "../../../../icons/CircleLetterF";

export const FilterSIAFGoalComponent = ({ value, setValue }) => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <CircleLetterF />
        <small className="ms-1">Meta</small>
      </div>
      <div>
        <Form.Control
          type="text"
          aria-describedby="Meta presupuestal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
