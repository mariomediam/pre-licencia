import { TributoContribAltasItemComponent } from "./TributoContribAltasItemComponent";

export const TributoContribAltasComponent = ({
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
                <TributoContribAltasItemComponent
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
