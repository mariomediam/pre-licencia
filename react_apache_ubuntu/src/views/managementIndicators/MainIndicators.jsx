import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../../../src/MainIndicators.css";
import { CardIndicator } from "../../components/managementIndicators/CardIndicator";
import { HeaderIdicators } from "./HeaderIdicators";
import { setSelectedTypeAndYearThunk, setSelectedYearThunk } from "../../store/slices/indicators/thunks";


const currentYear = new Date().getFullYear();
const anios = Array.from(
  { length: currentYear - 2020 },
  (_, i) => currentYear - i
);


export const MainIndicators = () => {

  const { anio : urlYear = currentYear, tipo : urlTipo = "01" } = useParams();

  const dispatch = useDispatch();
  

  const setTipoYAnioSelected = useCallback((tipo, anio) => {
    dispatch(setSelectedTypeAndYearThunk(tipo, anio));
  }, [dispatch]);

  const setAnioSelected = useCallback((anio) => {
    dispatch(setSelectedYearThunk(anio));
  }, [dispatch]);

  useEffect(() => {
    setTipoYAnioSelected(urlTipo, parseInt(urlYear));    
  }, [urlTipo, urlYear, setTipoYAnioSelected]);


  return (
    <div className="main-indicators-font m-3">
      <HeaderIdicators anios={anios} setAnioSelected={setAnioSelected} selectedType={urlTipo} />
      <main className="mt-4">
        {/* <CardIndicator anioSelected={selectedYear} tipoSelected={selectedType} /> */}
        <CardIndicator anioSelected={urlYear} tipoSelected={urlTipo} />
      </main>
    </div>
  );
};
