import { Form } from "react-bootstrap";

import CalendarStats from "../../../../icons/CalendarStatsIcon";

export const FilterPeriodComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <CalendarStats />
        <small className="ms-1">Periodo</small>
      </div>
      <div className="d-flex gap-2">
        
            <Form.Control type="date" placeholder="" style={{ maxWidth: "160px"}} defaultValue={Date.now()}/>
            <Form.Control type="date" placeholder="" style={{ maxWidth: "160px"}} defaultValue={Date.now()}/>
          
        
      </div>
    </div>
  );
};
