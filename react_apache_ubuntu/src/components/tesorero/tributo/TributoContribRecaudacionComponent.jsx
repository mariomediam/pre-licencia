import { TributoContribRecaudacionItemComponent } from "./TributoContribRecaudacionItemComponent";

export const TributoContribRecaudacionComponent = ({
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
                <TributoContribRecaudacionItemComponent
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
