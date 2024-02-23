
import { useDispatch, useSelector } from "react-redux";

import { setCurrentRequerimiento } from "../../../store/slices";


export const RequeElaboraStepTareasItemSaldoDetComponent = ({
  C_secfun,
  C_activpoi,
  C_depen,
  clasificador,
}) => {
  const dispatch = useDispatch();

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { requeClasificadores } = currentReque;

  const { C_clapre, C_objpoi, C_metapoi, selecc, saldos = []} = clasificador;
  
  const onChangeChecked = (e) => {
    const checked = e.target.checked;
    const elementoBuscado = {
      C_clapre: C_clapre,
      C_secfun: C_secfun,
      C_depen: C_depen,
      C_activpoi: C_activpoi,
      C_objpoi: C_objpoi,
      C_metapoi: C_metapoi,
    };

    const existe = requeClasificadores.some(
      (elemento) => JSON.stringify(elemento) === JSON.stringify(elementoBuscado)
    );

    let requeClasificadoresUpdate = [...requeClasificadores];

    if (checked && !existe) {
      requeClasificadoresUpdate.push(elementoBuscado);
    } else if (!checked && existe) {
      const index = requeClasificadoresUpdate.findIndex(
        (elemento) =>
          JSON.stringify(elemento) === JSON.stringify(elementoBuscado)
      );
      requeClasificadoresUpdate.splice(index, 1);
    }

    dispatch(
      setCurrentRequerimiento({
        requeClasificadores: requeClasificadoresUpdate,
      })
    );    
  };

  return (
    <>
      <td className="align-middle pe-3 ">{C_clapre}</td>
      <td className="align-middle ">
        {C_objpoi} - {C_metapoi}
      </td>
      <td className="align-middle">
        {saldos.map((s, i) => (
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
          {saldos.map((s, i) => (
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
      <td style={{ verticalAlign: "middle" }}>
        <div className="ms-3 form-check">
          <input
            className="form-check-input"
            type="checkbox"   
            checked={selecc}                     
            id="flexCheckChecked"
            onChange={onChangeChecked}
          />
        </div>
      </td>
    </>
  );
};
