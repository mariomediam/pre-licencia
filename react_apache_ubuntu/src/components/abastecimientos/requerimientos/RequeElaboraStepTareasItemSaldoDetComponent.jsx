export const RequeElaboraStepTareasItemSaldoDetComponent = ({ saldos }) => {
  const { C_clapre, C_objpoi, C_metapoi, saldo } = saldos;

  return (
    <>
      <td className="align-middle pe-3 ">{C_clapre}</td>
      <td className="align-middle ">
        {C_objpoi} - {C_metapoi}
      </td>
      <td className="align-middle">
        {saldo.map((s, i) => (
          <div key={i}>
            <p className="m-0 p-0 text-truncate">
              <small>
                {s.C_fuefin} / {s.C_recurso}
              </small>
            </p>
          </div>
        ))}
      </td>

      <td className="align-middle ">
        <>
          {saldo.map((s, i) => (
            <p key={i} className="m-0 p-0 text-end">
              <small className="">
                {s.Q_monto > 0 || s.Q_monto < 0
                  ? parseFloat(s.Q_monto).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "-"}
              </small>
            </p>
          ))}
        </>
      </td>
      <td>
        <div className="ms-3  form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            
          />
         
        </div>
      </td>
    </>
  );
};
