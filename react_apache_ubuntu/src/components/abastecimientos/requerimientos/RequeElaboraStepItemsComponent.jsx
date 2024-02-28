import { useSelector } from "react-redux";
import { RequeElaboraStepItemsClasifComponent } from "./RequeElaboraStepItemsClasifComponent";

export const RequeElaboraStepItemsComponent = () => {
  const { currentReque } = useSelector((state) => state.requerimiento);
  const { requeClasificadores = [], C_sf_dep, C_biesertipo, C_anipre } = currentReque;

  return (
    <div>
      {requeClasificadores.map((clasificador, i) => {
        return (
          <article key={i} className="pb-4">
            <RequeElaboraStepItemsClasifComponent clasificador={clasificador} C_sf_dep={C_sf_dep} C_biesertipo={C_biesertipo} C_anipre={C_anipre}/>
          </article>
        );
      })}
    </div>
  );
};
