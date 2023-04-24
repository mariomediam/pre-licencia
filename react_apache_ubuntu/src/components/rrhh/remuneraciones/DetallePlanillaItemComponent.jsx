export const DetallePlanillaItemComponent = ({
  d_ano,
  d_mes,
  c_tippla_id,
  c_plani_nro,
  c_traba_dni,
  n_nombre,
  n_conlab_nombre,
  q_bruto,
  q_dscto,
  q_aporte,
  q_liquido,
}) => {
  return (
    <>
      {/*  crear td con valor de q_dscto con 2 decimales y alineado a la derecha */}

      <td className="align-middle m-1 p-1">
        {c_traba_dni} {n_nombre} <br />{" "}
        <small>
          <small>{n_conlab_nombre}</small>
        </small>
      </td>
      <td className="text-right align-middle m-1 p-1">{q_bruto.toFixed(2)}</td>
      <td className="text-right align-middle m-1 p-1">{q_dscto.toFixed(2)}</td>
      <td className="text-right align-middle m-1 p-1">
        {q_aporte.toFixed(2)}
      </td>
      <td className="text-right align-middle m-1 p-1">
        {q_liquido.toFixed(2)}
      </td>
    </>
  );
};
