import { useState } from "react";
import Select from "react-select";

import FileDollarIcon from '../../../../icons/FileDollarIcon'

export const FilterSIAFDocumentComponent = () => {

//     COD_DOC	NOMBRE
// 000	SIN DOCUMENTO                                                                                                                                         
// 001	FACTURA                                                                                                                                               
// 002	BOLETA DE VENTA                                                                                                                                       
// 003	ACTA DE ENTREGA                                                                                                                                       


const initialDocuments = [
    { value: '000', label: 'SIN DOCUMENTO' },
    { value: '001', label: 'FACTURA' },
    { value: '002', label: 'BOLETA DE VENTA' },
    { value: '003', label: 'ACTA DE ENTREGA' }
]
    const [giros, setGiros] = useState(initialDocuments);

  return (
    <div>
    <div className='d-flex align-items-end text-color-default mb-2'>
        <FileDollarIcon />
         <small className="ms-1">Documento</small>   
    </div>
    <div>
    <Select
            placeholder=""
            // ref={selectGiros}
            isClearable 
            noOptionsMessage={() => "Registro no encontrado"}            
            name="colors"
            // onChange={setSelectedOption}
            options={giros}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        

    </div>
</div>
  )
}
