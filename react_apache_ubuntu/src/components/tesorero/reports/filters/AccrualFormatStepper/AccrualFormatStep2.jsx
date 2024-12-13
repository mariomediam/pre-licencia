import { useEffect, useState } from "react";
import { AccruralRetentionItem } from "./AccruralRetentionItem";
import { getRetentionType } from "./retentionTypeData";
import { AccuralRetentionAdd } from "./AccuralRetentionAdd";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../../../utils/varios";

export const AccrualFormatStep2 = ({retentions, setRetentions, expedErrors, setExpedErrors}) => {
  const { currentSecuencia } = useSelector((state) => state.siaf);
  const { MONTO_NACIONAL } = currentSecuencia;
  

  const [sumRetentions, setSumRetentions] = useState(0)

 

  // useState(() => {
  //   const retentionType = getRetentionType();
  //   setRetentions(retentionType);
  // }, []);

  useEffect(() => {
    const retentionType = getRetentionType();
    setRetentions(retentionType);
  }, [setRetentions]);

  useEffect(() => {
    const totalRetentions = retentions.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    setSumRetentions(totalRetentions);
  }, [retentions]);

  return (
    <div className="mx-5">
      <small className="fw-bold">Retenciones</small>
      <div className="container px-0">
        {retentions.map((retention) => (
          <AccruralRetentionItem
            key={retention.code}
            retention={retention}
            setRetentions={setRetentions}
            expedErrors={expedErrors}
            setExpedErrors={setExpedErrors}
          />
        ))}
      </div>
      <AccuralRetentionAdd setRetentions={setRetentions} />
      <div className="mt-2 border rounded p-3">
      <small className="fw-bold">Resumen de retenciones</small>
      <div className="d-flex justify-content-between">
        <p className="py-0 my-0">Monto fase</p>
        <p className="py-0 my-0 fw-bold">S/. {formatNumber(MONTO_NACIONAL, 2)}</p>
      </div>
      <div className="d-flex justify-content-between">
        <p className="py-0 my-0">Total retenciones</p>
        <p className="fw-bold py-0 my-0">S/. {formatNumber(sumRetentions, 2)}</p>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <p className="py-0 my-0">Total a pagar</p>
        <p className="fw-bold py-0 my-0">S/. {formatNumber(MONTO_NACIONAL - sumRetentions, 2)}</p>
      </div>
      </div>      
    </div>
  );
};
