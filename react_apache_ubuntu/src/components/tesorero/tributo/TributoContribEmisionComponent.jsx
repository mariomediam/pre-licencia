import { TributoContribEmisionItemComponent } from "./TributoContribEmisionItemComponent";

export const TributoContribEmisionComponent = ({
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
                <TributoContribEmisionItemComponent
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
