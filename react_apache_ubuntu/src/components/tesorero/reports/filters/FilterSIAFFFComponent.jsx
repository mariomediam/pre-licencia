import { Form } from "react-bootstrap";
import CashIcon from "../../../../icons/CashIcon";

export const FilterSIAFFFComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <CashIcon />
        <small className="ms-1">Rubro</small>
      </div>
      <div>
        <Form.Control type="text" aria-describedby="Fuente de financiamiento" />
      </div>
    </div>
  );
};
