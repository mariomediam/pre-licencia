import { useRef } from "react";
import AsyncSelect from "react-select/async";

import UserCheckIcon from "../../../../icons/UserCheckIcon";

import { obtenerProveedorSIGA } from "../../../../services/siafService";

export const FilterSIGAProviderComponent = ({ value, setValue }) => {
  const debounceRef = useRef(null);

  const filterProveedorSIAF = async (inputValue) => {
    if (!inputValue) {
      return [];
    }

    const data = await obtenerProveedorSIGA(inputValue);
    const personas = data.map(({ c_prov, n_prov }) => ({
      value: c_prov,
      label: `${c_prov} - ${n_prov}`,
    }));
    return personas;
  };

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(async () => {
        const data = await filterProveedorSIAF(inputValue);
        resolve(data);
      }, 1500);
    });
  };

  return (
    <div>
      <div className="d-flex align-items-end text-color-default mb-2">
        <UserCheckIcon />
        <small className="ms-1">Proveedor</small>
      </div>
      <div>
        <AsyncSelect          
          placeholder=""          
          isClearable
          noOptionsMessage={() => "Registro no encontrado"}          
          loadOptions={promiseOptions}
          onChange={setValue}
          value={value}
          menuPortalTarget={document.body}
        />
      </div>
    </div>
  );
}
