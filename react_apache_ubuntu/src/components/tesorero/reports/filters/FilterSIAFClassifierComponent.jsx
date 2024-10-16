import { Form } from "react-bootstrap";
import TagIcon from "../../../../icons/TagIcon";

export const FilterSIAFClassifierComponent = ({ value, setValue }) => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <TagIcon />
        <small className="ms-1">Clasificador</small>
      </div>
      <div>
        <Form.Control
          type="text"
          aria-describedby="Clasificador de gastos"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
