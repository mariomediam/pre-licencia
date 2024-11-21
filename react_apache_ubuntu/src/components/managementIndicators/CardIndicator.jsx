import { AuthorizedVehicles } from "./authorizedVehicles/AuthorizedVehicles";
import { CardItemIndicator } from "./CardItemIndicator";
import { CurrentPermits } from "./currentPermits/CurrentPermits";

export const CardIndicator = ({ anioSelected }) => {
  const indicators = [
    {
      code: "01",
      component: (
        <CurrentPermits
          anioSelected={anioSelected}
          title={"Autorizaciones vigentes a la actualidad"}
        />
      ),
    },
    {
      code: "02",
      component: (
        <AuthorizedVehicles
          anioSelected={anioSelected}
          title={"Autorizaciones emitidas"}
        />
      ),
    },
    // {
    //   code: "03",
    //   component: (
    //     <CurrentPermits
    //       anioSelected={anioSelected}
    //       title={"Tarjetas únicas de circulación"}
    //     />
    //   ),
    // },
    {
      code: "04",
      component: (
        <CurrentPermits
          anioSelected={anioSelected}
          title={"Infracciones de tránisto"}
        />
      ),
    },
    {
      code: "05",
      component: (
        <CurrentPermits
          anioSelected={anioSelected}
          title={"Antigüedad de vehículos con permisos vigentes"}
        />
      ),
    },
  ];

  return (
    <div className="d-flex gap-3 flex-wrap">
      {indicators.map((indicator) => (
        <CardItemIndicator key={indicator.code} indicator={indicator} />
      ))}
    </div>
  );
};
