// import { useParams } from "react-router-dom";
import { AuthorizedVehicles } from "./authorizedVehicles/AuthorizedVehicles";
import { CardItemIndicator } from "./CardItemIndicator";
import { CurrentPermits } from "./currentPermits/CurrentPermits";
import { OccurrencesType } from "./occurrencesType/OccurrencesType";
import { OldVehicles } from "./oldVehicles/OldVehicles";
import { TransportationTickets } from "./transportationTickets/TransportationTickets";

export const CardIndicator = ({ anioSelected, tipoSelected }) => {

  // const { tipo : urlTipo = "01" } = useParams();

  // console.log("tipoSelected:", tipoSelected, "urlTipo:", urlTipo);
  const indicators = [
    {
      type: "01",
      code: "01",
      component: (
        <CurrentPermits
          anioSelected={anioSelected}
          title={"Autorizaciones vigentes"}
        />
      ),
    },
    {
      type: "01",
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
      type: "01",
      code: "04",
      component: (
        <TransportationTickets
          anioSelected={anioSelected}
          title={"Infracciones de tránsito"}
        />
      ),
    },
    {
      type: "01",
      code: "05",
      component: (
        <OldVehicles
          anioSelected={anioSelected}
          title={"Antigüedad de vehículos con autorización vigente"}
        />
      ),
    },
    {
      type: "02",
      code: "01",
      component: (
        <OccurrencesType
          anioSelected={anioSelected}
          title={"Antigüedad de vehículos con autorización vigente"}
        />
      ),
    },
  ];

  return (
    <div className="d-flex gap-3 flex-wrap cards-container">
      {tipoSelected}
      {indicators.filter(({type}) => type === tipoSelected).map((indicator) => (
        <CardItemIndicator key={indicator.code} indicator={indicator} />
      ))}
    </div>
  );
};
