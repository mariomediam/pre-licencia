import React from 'react'

export const RequeElaboraStepTareasItemSaldoComponent = ({ tarea } ) => {

    const { C_clapre, C_fuefin, C_recurso, C_objpoi, C_metapoi, Q_monto } = tarea;
  return (
    <>
      <td className="align-middle pe-3 ">
       {C_clapre}
      </td>
      <td className="align-middle">
        {C_fuefin} - {C_recurso}
      </td>
      <td className="align-middle ">{C_objpoi} - {C_metapoi}</td>
      <td className="align-middle ">{Q_monto}</td>
      
      
    </>
  )
}
