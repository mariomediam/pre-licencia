import { Form } from "react-bootstrap";

import CalendarStats from "../../../../icons/CalendarStatsIcon";

export const FilterPeriodComponent = ({ value, setValue }) => {
  let dateStart = "";
  let dateEnd = "";

  if (value.length > 0) {
    dateStart = value[0];
    dateEnd = value[1];
  }

  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <CalendarStats />
        <small className="ms-1">Periodo</small>
      </div>
      <div className="d-flex gap-2">
        <Form.Control
          type="date"
          placeholder=""
          style={{ maxWidth: "160px" }}
          value={dateStart}
          onChange={(e) => setValue([e.target.value, dateEnd])}
        />
        <Form.Control
          type="date"
          placeholder=""
          style={{ maxWidth: "160px" }}
          value={dateEnd}
          onChange={(e) => setValue([dateStart, e.target.value])}
        />
      </div>
    </div>
  );
};
