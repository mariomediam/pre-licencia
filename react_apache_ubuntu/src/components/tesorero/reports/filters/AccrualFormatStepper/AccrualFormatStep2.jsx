import { useState } from "react";
import { AccruralRetentionItem } from "./AccruralRetentionItem";
import { getRetentionType } from "./retentionTypeData";
import { AccuralRetentionAdd } from "./AccuralRetentionAdd";


export const AccrualFormatStep2 = () => {

  const [retentions, setRetentions] = useState([])

  useState(() => {
    const retentionType = getRetentionType();
    setRetentions(retentionType)
  }, [])


  return (
    <div className="mx-5">
        <small className="fw-bold">Retenciones</small>
        <div class="container px-0">
        {retentions.map((retention) => (
          <AccruralRetentionItem key={retention.code} retention={retention} setRetentions={setRetentions} />
        ))
        
      }

      </div>
      <AccuralRetentionAdd setRetentions={setRetentions}/>
      {JSON.stringify(retentions)}
    </div>
  )
}
