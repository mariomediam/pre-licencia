import { ReactComponent as DotsVertical } from "../../../assets/images/svg/dots-vertical.svg";
import { obtenerNombreMes, transformarFecha } from "../../../utils/varios";

export const TributoArchivoListarItemComponent = ({
  C_Archivo,
  C_TipOpe,
  M_Archivo_Anio,
  M_Archivo_Mes,
  D_Archivo_FecDig,
  C_Usuari_Login,
  N_Archivo_PC,
}) => {
  return (
    <>
      {!["01", "02"].includes(C_TipOpe) && (
        <td className="align-middle">{obtenerNombreMes(M_Archivo_Mes)}</td>
      )}

      <td className="align-middle">{transformarFecha(D_Archivo_FecDig)}</td>
      <td className="align-middle">{C_Usuari_Login}</td>
      <td className="align-middle"><DotsVertical /></td>
    </>
  );
};
