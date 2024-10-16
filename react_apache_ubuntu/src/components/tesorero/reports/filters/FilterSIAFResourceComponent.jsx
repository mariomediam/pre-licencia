import { Form } from "react-bootstrap";
import CoinsIcon from "../../../../icons/CoinsIcon";

export const FilterSIAFResourceComponent = ({ value, setValue }) => {
  console.log("Se renderiza FilterSIAFResourceComponent");
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <CoinsIcon />
        <small className="ms-1">Recurso</small>
      </div>

      <div>
        <Form.Control
          type="text"
          aria-describedby="Tipo de recurso"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>      
    </div>
  );
};
