import { Alert } from "react-bootstrap";

import bgNotFound from "../../assets/images/bg-not-found.jpg";

export const AlertNotFound = ({ parametros = {}}) => {
  const {
    message = "No se encontraron resultados para su búsqueda. Intente con términos de búsqueda diferentes.",
    variant = "warning",
    opacity = "opacity-50",
  } = parametros;

  return (
    <Alert variant={variant} className="text-center animate__animated animate__fadeIn ">
      {message}
      <img
        className={`img-fluid img-thumbnail ${opacity} mt-3 `}
        src={bgNotFound}
        alt="Buscar"
      />
    </Alert>
  );
};
