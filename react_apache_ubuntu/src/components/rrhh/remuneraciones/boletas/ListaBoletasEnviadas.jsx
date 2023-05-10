import React from "react";
import { transformarFecha } from "../../../../utils/varios";

export const ListaBoletasEnviadas = ({
  d_ano,
  d_mes,
  c_tippla_id,
  c_plani_nro,
  c_traba_dni,
  n_nombre,
  n_traba_correo,
  d_datetime_insert,
  n_user_insert,
}) => {
  return (
    <>
      <td className="align-middle m-1 p-1">
        <small>{c_traba_dni} {n_nombre}</small>
      </td>
      <td className="text-right align-middle m-1 p-1"><small>{n_traba_correo}</small></td>
      <td className="text-right align-middle m-1 p-1"><small>{transformarFecha( d_datetime_insert)}</small></td>
      <td className=" m-1 p-1"><small>{n_user_insert}</small></td>
    </>
  );
};
