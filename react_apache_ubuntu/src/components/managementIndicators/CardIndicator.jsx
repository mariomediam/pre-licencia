import { AuthorizedVehicles } from "./authorizedVehicles/AuthorizedVehicles";
import { CardItemIndicator } from "./CardItemIndicator";
import { CurrentPermits } from "./currentPermits/CurrentPermits";
import { OldVehicles } from "./oldVehicles/OldVehicles";
import { TransportationTickets } from "./transportationTickets/TransportationTickets";

export const CardIndicator = ({ anioSelected }) => {
  const indicators = [
    {
      code: "01",
      component: (
        <CurrentPermits
          anioSelected={anioSelected}
          title={"Autorizaciones vigentes"}
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
        <TransportationTickets
          anioSelected={anioSelected}
          title={"Infracciones de tránsito"}
        />
      ),
    },
    {
      code: "05",
      component: (
        <OldVehicles
          anioSelected={anioSelected}
          title={"Antigüedad de vehículos con autorización vigente"}
        />
      ),
    },
  ];

  return (
    <div className="d-flex gap-3 flex-wrap cards-container">
      {indicators.map((indicator) => (
        <CardItemIndicator key={indicator.code} indicator={indicator} />
      ))}
    </div>
  );
};
