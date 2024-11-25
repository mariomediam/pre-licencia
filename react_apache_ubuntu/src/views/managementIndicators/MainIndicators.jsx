import { useSelector, useDispatch } from "react-redux";

import "../../../src/MainIndicators.css";
import { CardIndicator } from "../../components/managementIndicators/CardIndicator";
import { HeaderIdicators } from "./HeaderIdicators";
import { setCurrentYearThunk } from "../../store/slices/indicators/thunks";

const currentYear = new Date().getFullYear();
const anios = Array.from(
  { length: currentYear - 2021 },
  (_, i) => currentYear - i
);


export const MainIndicators = () => {

  const dispatch = useDispatch();
  const { currentYear } = useSelector((state) => state.indicators);

  const setAnioSelected = (anio) => {
    dispatch(setCurrentYearThunk(anio));
  };

  return (
    <div className="main-indicators-font m-3">
      <HeaderIdicators anios={anios} setAnioSelected={setAnioSelected} />
      <main className="mt-4">
        <CardIndicator anioSelected={currentYear} />
      </main>
    </div>
  );
};
