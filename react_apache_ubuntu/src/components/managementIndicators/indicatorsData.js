import { AuthorizedVehicles } from "./authorizedVehicles/AuthorizedVehicles";
import { CurrentPermits } from "./currentPermits/CurrentPermits";
import { OccurrencesTime } from "./occurrencesTime/OccurrencesTime";
import { OccurrencesType } from "./occurrencesType/OccurrencesType";
import { OldVehicles } from "./oldVehicles/OldVehicles";
import { PatrolGoal } from "./patrolGoal/PatrolGoal";
import { TransportationTickets } from "./transportationTickets/TransportationTickets";


export const getIndicators = (anioSelected) => [
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
        title={"Ocurrencias por tipo"}
      />
    ),
  },
  {
    type: "02",
    code: "02",
    component: (
      <OccurrencesTime
        anioSelected={anioSelected}
        title={"Ocurrencias por mes"}
      />
    ),
  },
  {
    type: "02",
    code: "03",
    component: (
      <PatrolGoal
        anioSelected={anioSelected}
        title={"Kilometros de patrullaje"}
      />
    ),
  },
];

