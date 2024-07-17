
import { useDispatch, useSelector } from "react-redux";

import { setCurrentRequerimiento } from "../../../store/slices";


export const RequeElaboraStepTareasItemSaldoDetComponent = ({
  C_secfun,
  C_activpoi,
  C_depen,
  clasificador,
  N_metapresup_desc,
  N_activpoi_desc,
}) => {
  const dispatch = useDispatch();

  const { currentReque } = useSelector((state) => state.requerimiento);
  const { requeClasificadores } = currentReque;

  const { C_clapre, C_objpoi, C_metapoi, selecc, saldos = [], N_clapre_desc} = clasificador;
  
  const onChangeChecked = (e) => {
    const checked = e.target.checked;
    const elementoBuscado = {
      C_clapre: C_clapre,
      C_secfun: C_secfun,
      C_depen: C_depen,
      C_activpoi: C_activpoi,
      C_objpoi: C_objpoi,
      C_metapoi: C_metapoi,  
      N_metapresup_desc: N_metapresup_desc,
      N_activpoi_desc: N_activpoi_desc,
      N_clapre_desc: N_clapre_desc,

    };

    const existe = requeClasificadores.some(
      (elemento) =>
        elemento.C_clapre === elementoBuscado.C_clapre &&
        elemento.C_secfun === elementoBuscado.C_secfun &&
        elemento.C_depen === elementoBuscado.C_depen &&
        elemento.C_activpoi === elementoBuscado.C_activpoi &&
        elemento.C_objpoi === elementoBuscado.C_objpoi &&
        elemento.C_metapoi === elementoBuscado.C_metapoi
    );

    let requeClasificadoresUpdate = [...requeClasificadores];

    if (checked && !existe) {
      elementoBuscado["items"] = [];
      requeClasificadoresUpdate.push(elementoBuscado);
    } else if (!checked && existe) {
      const index = requeClasificadoresUpdate.findIndex(
        (elemento) =>
        elemento.C_clapre === elementoBuscado.C_clapre &&
        elemento.C_secfun === elementoBuscado.C_secfun &&
        elemento.C_depen === elementoBuscado.C_depen &&
        elemento.C_activpoi === elementoBuscado.C_activpoi &&
        elemento.C_objpoi === elementoBuscado.C_objpoi &&
        elemento.C_metapoi === elementoBuscado.C_metapoi
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
      <td>
      <p className="m-0 p-0">{C_clapre} </p>
      <small className="text-muted m-0 p-0"><small><small>{N_clapre_desc}</small></small></small></td>
      
      <td>
        {C_objpoi} - {C_metapoi}
      </td>
      <td>
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

      <td>
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
