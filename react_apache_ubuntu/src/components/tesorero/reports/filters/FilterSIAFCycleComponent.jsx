import { Form } from "react-bootstrap";

import CalendarStats from "../../../../icons/CalendarStatsIcon";

export const FilterSIAFCycleComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <CalendarStats />
        <small className="ms-1">Ciclo</small>
      </div>
      <div className="d-flex gap-2" style={{minWidth: "200px"}}>
        <Form.Select aria-label="Default select example">
          <option>Gasto</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>
    </div>
  );
};
