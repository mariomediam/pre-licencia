import { Form } from "react-bootstrap";
import CashRegisterIcon from "../../../../icons/CashRegisterIcon";

export const FilterSIGAAccountingPLanComponent = () => {
  return (
    <div>
      <div className="d_flex align-items-end text-color-default mb-2">
            <CashRegisterIcon />
            <small className="ms-1">Plan contable</small>

      </div>
      <div>
        <Form.Control type="text" aria-describedby="Cuenta corriente" />
      </div>
    </div>
  )
}
