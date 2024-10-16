import { useEffect, useState } from "react";
import Select from "react-select";

import UserCheckIcon from "../../../../icons/UserCheckIcon";

import { obtenerPersona } from "../../../../services/siafService";

export const FilterSIAFProviderComponent = ({ value, setValue }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listPersonas, setListPersonas] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (value && value.length > 3) {
  //       const data = await obtenerPersona(value);
  //       const personas = data.map(({ RUC, NOMBRE }) => ({
  //         value: RUC,
  //         label: `${RUC} - ${NOMBRE}`,
  //       }));  

  //       setListPersonas(personas);
  //     } else {
  //       setListPersonas([]);
  //     }
  //   };
  //   fetchData();
  // }, [value]);

  useEffect(() => {
    console.log("Se disparooooo")
    // console.log("************* 1 *************");
    // const delayDebounceFn = setTimeout(() => {
    //   if (searchTerm) {
    //     obtenerPersona(searchTerm).then((result) => {
    //       setListPersonas(result);
    //       console.log("************* 2 *************");
    //     }).catch((error) => {
    //       console.error("Error fetching personas:", error);
    //     });
    //   }
    // }, 5000);

    // return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };

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
          onChange={setSearchTerm}
          // onInput={(e) => setSearchTerm(e.target.value)}
          options={listPersonas}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
};
