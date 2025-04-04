import { Form } from "react-bootstrap";
import CashRegisterIcon from "../../../../icons/CashRegisterIcon";

export const FilterSIAFCurrentAccountComponent = ({ value, setValue }) => {
  return (
    <div>
      <div className="d_flex align-items-end text-color-default mb-2">
        <CashRegisterIcon />
        <small className="ms-1">Cta. Cte.</small>
      </div>
      <div>
        <Form.Control
          type="text"
          aria-describedby="Cuenta corriente"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
