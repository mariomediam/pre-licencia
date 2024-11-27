import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../../src/MainIndicators.css";
import { CardIndicator } from "../../components/managementIndicators/CardIndicator";
import { HeaderIdicators } from "./HeaderIdicators";
import { setSelectedYearThunk } from "../../store/slices/indicators/thunks";


const currentYear = new Date().getFullYear();
const anios = Array.from(
  { length: currentYear - 2020 },
  (_, i) => currentYear - i
);


export const MainIndicators = () => {

  const { anio : urlYear } = useParams();

  const dispatch = useDispatch();
  const { selectedYear } = useSelector((state) => state.indicators);

  const setAnioSelected = useCallback((anio) => {
    dispatch(setSelectedYearThunk(anio));
  }, [dispatch]);

  useEffect(() => {
      setAnioSelected(parseInt(urlYear) || currentYear);
    
  }, [urlYear, setAnioSelected]);


  return (
    <div className="main-indicators-font m-3">
      <HeaderIdicators anios={anios} setAnioSelected={setAnioSelected} />
      <main className="mt-4">
        <CardIndicator anioSelected={selectedYear} />
      </main>
    </div>
  );
};
