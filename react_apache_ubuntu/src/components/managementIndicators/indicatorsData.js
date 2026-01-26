import BusIcon from "../../icons/BusIcon";
import ClipboardSearchIcon from "../../icons/ClipboardSearchIcon";
import TrafficLightIcon from "../../icons/TrafficLightIcon";
import ShieldCheckIcon from "../../icons/ShieldCheckIcon";


export const getIndicators = (anioSelected) => [
  {
    type: "01",
    code: "00",
    title: "Gerencia de Transporte y Movilidad urbana",
    subTitle: "Visualización de indicadores consolidados y políticas de transporte para la provincia.",
    icon: <BusIcon width={36} height={36} />,
    nivel: 1, // 1: Gerencia, 2: Subgerencia, 3: Unidad
  },
  {
    type: "01",
    code: "01",
    title: "Subgerencia de Transporte",
    subTitle: "Gestión de rutas, paraderos y autorizaciones de servicios de transporte público.",
    icon: <BusIcon width={28} height={28} />,
    nivel: 2,
  },
  {
    type: "01",
    code: "02",
    title: "Subgerencia de Fiscalización",
    subTitle: "Control de infracciones, operativos en vía pública y cumplimiento normativo.",
    icon: <ClipboardSearchIcon width={28} height={28} />,
    nivel: 2,
  },
  {
    type: "01",
    code: "03",
    title: "Subgerencia de Tránsito y Movilidad Urbana",
    subTitle: "Planificación de infraestructura peatonal, ciclovías y diseño urbano sostenible",
    icon: <TrafficLightIcon width={28} height={28} />,
    nivel: 2,
  },
  {
    type: "01",
    code: "04",
    title: "Subgerencia de Educación y Seguridad Vial",
    subTitle: "Educación vial, señalización y programas de prevención de accidentes",
    icon: <ShieldCheckIcon width={28} height={28} />,
    nivel: 2,
  },
];

