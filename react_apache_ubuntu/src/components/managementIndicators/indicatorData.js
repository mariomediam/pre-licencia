import BusIcon from "../../icons/BusIcon";


export const getIndicators = () => [
  {
    type: "01",
    code: "00",
    codIndicator: "010001",
    title: "Ver recaudación",
    subTitle: "Acceda al análisis detallado de ingresos por conceptos de transporte, multas, concesiones de rutas y otros.",
    icon: <BusIcon width={36} height={36} />,    
  },  
  {
    type: "01",
    code: "01",
    codIndicator: "010101",
    title: "Recaudación",
    subTitle: "Acceda al análisis detallado de ingresos por conceptos de transporte, multas, concesiones de rutas y otros.Análisis de ingresos por conceptos de licencias, multas y tasas administrativas de la subgerencia",
    icon: <BusIcon width={36} height={36} />,
    
  }, 
  {
    type: "01",
    code: "01",
    codIndicator: "010102",
    title: "Autorizaciones vigentes",
    subTitle: "Consulta y seguimiento del estado de las autorizaciones emitidas",
    icon: <BusIcon width={36} height={36} />,    
  },
  {
    type: "01",
    code: "02",
    codIndicator: "010201",
    title: "Recaudación",
    subTitle: "Análisis detallado de los ingresos generados por actas de control.",
    icon: <BusIcon width={36} height={36} />,
    
  },
  {
    type: "01",
    code: "02",
    codIndicator: "010202",
    title: "Infracciones impuestas",
    subTitle: "Consulta y seguimiento de actas de control emitidas.",
    icon: <BusIcon width={36} height={36} />,
    
  },
  {
    type: "01",
    code: "03",
    codIndicator: "010301",
    title: "Recaudación",
    subTitle: "Análisis detallado de los ingresos generados por derechos de trámites y pagos de servicios",
    icon: <BusIcon width={36} height={36} />,
    
  },
  {
    type: "01",
    code: "03",
    codIndicator: "010302",
    title: "Señalización vial",
    subTitle: "Inventario, señalización y proyectos de mantenimiento vial",
    icon: <BusIcon width={36} height={36} />,
    
  },
  {
    type: "01",
    code: "04",
    codIndicator: "010401",
    title: "Capacitación",
    subTitle: "Inventario, señalización y proyectos de mantenimiento viaEstadísticas de charlas, capacitaciones de conductores de transporte público y programas de sensibilización",
    icon: <BusIcon width={36} height={36} />,
    
  },
];
