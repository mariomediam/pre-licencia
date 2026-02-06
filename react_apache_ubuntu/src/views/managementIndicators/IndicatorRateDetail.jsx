import { useParams } from "react-router-dom";

export const IndicatorRateDetail = () => {

    const { anio: urlYear, periodo: urlPeriodo, tasa: urlTasa } = useParams();



  return (

    
    <div>
        <p>{urlYear}</p>
        <p>{urlPeriodo}</p>
        <p>{urlTasa}</p>
    </div>
  )
}