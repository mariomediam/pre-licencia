
import { TributoContribBajasItemComponent } from "./TributoContribBajasItemComponent";

export const TributoContribBajasComponent = ({
  tipo,
  anio,
  mes,
  detalle,
  setListTributoContribSelected,
  allSelected,
}) => {

  return (
    <>
        {
            detalle.map((item, index) => (
                <TributoContribBajasItemComponent
                key={index}
                {...item}
                setListTributoContribSelected={setListTributoContribSelected}
                allSelected={allSelected}
                />
            ))
        }
    </>
  );
};
