import { useState } from "react";
import "../../../src/MainIndicators.css";
import { CardIndicator } from "../../components/managementIndicators/CardIndicator";
import { HeaderIdicators } from "./HeaderIdicators";

const currentYear = new Date().getFullYear();
const anios = Array.from(
  { length: currentYear - 2021 },
  (_, i) => currentYear - i
);


export const MainIndicators = () => {

  const [anioSelected, setAnioSelected] = useState(currentYear);



  return (
    <div className="main-indicators-font m-3">
      <HeaderIdicators anios={anios} setAnioSelected={setAnioSelected} />
      <main className="mt-4">
        <CardIndicator anioSelected={anioSelected} />
      </main>
    </div>
  );
};
