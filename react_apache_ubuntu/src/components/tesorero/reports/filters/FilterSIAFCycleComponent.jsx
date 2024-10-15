import { Form } from "react-bootstrap";

import ClockIcon from "../../../../icons/ClockIcon";

const CYCLE = [
  {
    id: "G",
    name: "GASTO",
  },
  {
    id: "I",
    name: "INGRESO",
  },
];

export const FilterSIAFCycleComponent = ({value, setValue}) => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <ClockIcon />
        <small className="ms-1">Ciclo</small>
      </div>
      <div>
        <Form.Select aria-label="Default select example" value={value} onChange={(e) => setValue(e.target.value)}>
          {CYCLE.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};
