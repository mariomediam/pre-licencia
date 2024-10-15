import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import StairsDownIcon from "../../../../icons/StairsDownIcon";

const PHASES = {
    "G": [ { "id": "", "name": "TODOS" }, { "id": "C", "name": "COMPROMISO" }, { "id": "D", "name": "DEVENGADO" }, { "id": "G", "name": "GIRADO" }, { "id": "P", "name": "PAGADO" }],
    "I": [ { "id": "", "name": "TODOS" }, { "id": "D", "name": "DETERMINADO" }, { "id": "R", "name": "RECAUDADO" }],
}

export const FilterSIAFPhaseComponent = ({ value, setValue, cycle}) => {

  const [filteredPhases, setFilteredPhases] = useState([]);

  useEffect(() => {
    setFilteredPhases(PHASES[cycle] || []);
  }, [cycle]);








  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <StairsDownIcon />
        <small className="ms-1">Fase</small>
      </div>
      <div>
        <Form.Select aria-label="Fase del expediente" value={value} onChange={(e) => setValue(e.target.value)}>
          {filteredPhases.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};
