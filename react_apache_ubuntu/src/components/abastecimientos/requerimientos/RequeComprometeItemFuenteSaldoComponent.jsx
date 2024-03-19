import { useState } from "react";
import { Form } from "react-bootstrap";

import { formatNumber } from "../../../utils/varios";

export const RequeComprometeItemFuenteSaldoComponent = ({
  saldoFuente,
  saldoPresupItem,
  setSaldoPresupItem,
}) => {
  const {
    C_anipre,
    C_secfun,
    C_depen,
    C_clapre,
    C_fuefin,
    C_recurso,
    C_objpoi,
    C_metapoi,
    C_activpoi,
    q_saldo,
    monto_precompromiso = 0,
  } = saldoFuente;

  const [showFeedback, setShowFeedback] = useState(false);

  const updateSaldoPresupItem = (monto_precompromiso) => {
    const newSaldo = saldoPresupItem.map((item) => {
      if (
        item.C_anipre === C_anipre &&
        item.C_secfun === C_secfun &&
        item.C_depen === C_depen &&
        item.C_clapre === C_clapre &&
        item.C_fuefin === C_fuefin &&
        item.C_recurso === C_recurso &&
        item.C_objpoi === C_objpoi &&
        item.C_metapoi === C_metapoi &&
        item.C_activpoi === C_activpoi
      ) {
        item.monto_precompromiso = monto_precompromiso;
      }
      return item;
    });
    setSaldoPresupItem(newSaldo);
  };

  const onChangeSaldo = (e) => {
    const monto_precompromiso = e.target.value;

    updateSaldoPresupItem(monto_precompromiso);
  };

  const onBlurControlInputCantidad = (e) => {
    let monto_precompromiso = e.target.value;

    if (isNaN(monto_precompromiso) || parseFloat(monto_precompromiso) < 0 || monto_precompromiso.trim().length === 0)
    {
      monto_precompromiso = 0;
    }

    setShowFeedback(monto_precompromiso > q_saldo);

    monto_precompromiso = parseFloat(monto_precompromiso).toFixed(2);

    updateSaldoPresupItem(monto_precompromiso);
  };

  const onKeyPressControlInputCantidad = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <tr>
      <td className="align-middle">
        {C_fuefin} / {C_recurso}
      </td>
      <td className="text-end align-middle">{formatNumber(q_saldo)}</td>
      <td>
        {" "}
        <Form.Group className="ms-3" >
          
          <Form.Control
            className="text-end"
            size="sm"
            type="number"
            
            value={monto_precompromiso}
            onChange={onChangeSaldo}
            onBlur={onBlurControlInputCantidad}
            onKeyPress={onKeyPressControlInputCantidad}
            min="0"
            isInvalid={showFeedback}
            step={0.01}
          />
          <Form.Control.Feedback type="invalid">
          Monto comprometido no debe exceder saldo.
          </Form.Control.Feedback>
        </Form.Group>
      </td>
      
    </tr>
  );
};
