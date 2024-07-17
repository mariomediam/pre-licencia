import { TributoContribBajasMesComponent } from "./TributoContribBajasMesComponent";

export const TributoContribBajasComponent = ({
  C_Contrib,
  N_Contrib,
  C_TipOpe,
  N_TipOpe,
  listTributo: listMes,
  setListTributoContribSelected,
  allSelected,
}) => {  

  return (
    <>
      <small>
        <small className="text-muted">
          {" "}
          {C_Contrib} {N_Contrib} / {N_TipOpe}
        </small>
      </small>
      <div style={{ border: "1px solid lightgrey" }} className="mt-2">
        {listMes.map((mes, index) => (
          <TributoContribBajasMesComponent
            key={`${C_Contrib}_${C_TipOpe}_${mes.M_Archivo_Mes}`}
            C_Contrib={C_Contrib}
            N_Contrib={N_Contrib}
            C_TipOpe={C_TipOpe}
            N_TipOpe={N_TipOpe}
            mes={mes}
            setListTributoContribSelected={setListTributoContribSelected}
            allSelected={allSelected}
          />
        ))}
      </div>
    </>
  );
};
