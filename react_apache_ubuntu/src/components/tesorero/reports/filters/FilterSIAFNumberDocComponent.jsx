import { Form } from "react-bootstrap";
import Number123Icon from "../../../../icons/Number123Icon";

export const FilterSIAFNumberDocComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <Number123Icon className="pt-1" />
        <small className="ms-1">Número de documento</small>
      </div>
      <div>
        <Form.Control type="text" aria-describedby="Número de documento" />
      </div>
    </div>
  );
};
