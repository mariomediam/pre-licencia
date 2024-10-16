import { Form } from "react-bootstrap";
import Number123Icon from "../../../../icons/Number123Icon";

export const FilterSIAFNumberDocComponent = ({value, setValue}) => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <Number123Icon className="pt-1" />
        <small className="ms-1">Número de documento</small>
      </div>
      <div>
        <Form.Control type="text" aria-describedby="Número de documento" value={value} onChange={(e) => setValue(e.target.value)}/>
      </div>
    </div>
  );
};
