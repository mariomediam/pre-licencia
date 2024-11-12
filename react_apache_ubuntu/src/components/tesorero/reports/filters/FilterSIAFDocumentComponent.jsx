import { useEffect, useState } from "react";
import Select from "react-select";

import FileDollarIcon from "../../../../icons/FileDollarIcon";
import { obtenerMaestroDocumento } from "../../../../services/siafService";

export const FilterSIAFDocumentComponent = ({ value, setValue }) => {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerMaestroDocumento();

      const documentos = data.map(({ COD_DOC, NOMBRE }) => ({
        value: COD_DOC,
        label: `${COD_DOC} - ${NOMBRE}`,
      }));
      setDocumentos(documentos);
    };
    fetchData();
  }, []);

  
  return (
    <div >
      <div>
        <FileDollarIcon />
        <small className="ms-1">Documento</small>
      </div>
      <div>
        <Select
          placeholder=""          
          isClearable
          noOptionsMessage={() => "Registro no encontrado"}
          name="colors"
          onChange={setValue}
          options={documentos}
          value={value}
          className="basic-multi-select"
          classNamePrefix="select"           
          menuPortalTarget={document.body}
           
        />
      </div>
    </div>
  );
};
