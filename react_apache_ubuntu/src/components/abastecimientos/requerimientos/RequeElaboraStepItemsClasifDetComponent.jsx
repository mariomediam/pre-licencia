import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import { setCurrentRequerimientoRemoveItem } from "../../../store/slices";

export const RequeElaboraStepItemsClasifDetComponent = ({
  item,
  C_sf_dep,
  C_biesertipo,
  C_clapre,
  C_secfun,
  C_activpoi,
  C_objpoi,
  C_metapoi,
  C_depen,
  accion = "",
}) => {
  const dispatch = useDispatch();

  const {
    C_item,
    Q_requedet_cant,
    C_bieser,
    Q_requedet_precio,
    N_bieser_desc,
    N_unimed_desc,
  } = item;

  function formatNumber(num) {
    const decimalPart = num.toString().split(".")[1];
    const decimalLength = decimalPart ? decimalPart.length : 0;
    const fixedLength = Math.max(2, decimalLength);
    // return num.toFixed(fixedLength);
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: fixedLength,
    });
  }

  const onClicRemove = () => {
    dispatch(
      setCurrentRequerimientoRemoveItem({
        C_depen,
        C_item,
        C_secfun,
        C_biesertipo,
        C_bieser,
        C_activpoi,
        C_metapoi,
        C_objpoi,
        C_clapre,
      })
    );
  };

  return (
    <>
      <td>
        {N_bieser_desc}
        {C_biesertipo === "01" && (
          <p className="mb-0">
            <small className="text-muted">{N_unimed_desc}</small>
          </p>
        )}
      </td>
      <td className="text-end">{formatNumber(Q_requedet_cant)}</td>
      <td className="text-end">{formatNumber(Q_requedet_precio)}</td>
      <td className="text-end">
        {(Q_requedet_cant * Q_requedet_precio).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>

      {accion === "elaborar" && (
        <>
          <td className="text-end">
            {/* {" "}
        <Button
          size="sm"
          variant="outline-primary"
          //  onClick={onClickEditar}
        >
          <i className="fas fa-edit"></i>
          Editar
        </Button> */}
          </td>
          <td className="text-end">
            <Button
              size="sm"
              variant="outline-danger"
              onClick={onClicRemove}
              // disabled={!n_traba_correo}
            >
              <i className="fas fa-trash-alt me-1"></i>
              Eliminar
            </Button>
          </td>
        </>
      )}
    </>
  );
};
