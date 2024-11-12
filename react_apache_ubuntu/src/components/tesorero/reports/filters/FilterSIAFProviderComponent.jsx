import { useRef } from "react";
import AsyncSelect from "react-select/async";

import UserCheckIcon from "../../../../icons/UserCheckIcon";

import { obtenerPersona } from "../../../../services/siafService";

export const FilterSIAFProviderComponent = ({ value, setValue }) => {
  const debounceRef = useRef(null);

  const filterPersonas = async (inputValue) => {
    if (!inputValue) {
      return [];
    }

    const data = await obtenerPersona(inputValue);
    const personas = data.map(({ RUC, NOMBRE }) => ({
      value: RUC,
      label: `${RUC} - ${NOMBRE}`,
    }));
    return personas;
  };

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(async () => {
        const data = await filterPersonas(inputValue);
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
};
