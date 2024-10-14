import { useState } from "react";
import Select from "react-select";

import FileDollarIcon from "../../../../icons/FileDollarIcon";
import UserCheckIcon from "../../../../icons/UserCheckIcon";

export const FilterSIGAProviderComponent = () => {
    const initialDocuments = [
        { value: "000", label: "DANIEL" },
        { value: "001", label: "MARCO" },
        { value: "002", label: "MARIO" },
        { value: "003", label: "WALTER" },
      ];
      const [giros, setGiros] = useState(initialDocuments);
    
      return (
        <div>
          <div className="d-flex align-items-end text-color-default mb-2">
            <UserCheckIcon />
            <small className="ms-1">Proveedor</small>
          </div>
          <div>
            <Select
              placeholder=""
              // ref={selectGiros}
              noOptionsMessage={() => "Registro no encontrado"}
              name="colors"
              // onChange={setSelectedOption}
              options={giros}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>
      );
}
