import { Alert } from "react-bootstrap";

import bgFind from "../../assets/images/bg-find.jpg";

export const AlertStartSearch = ({ parametros = {}}) => {
  const {
    message = "Por favor, ingrese sus criterios de búsqueda para comenzar.",
    variant = "primary",
    opacity = "opacity-50",
  } = parametros;

  return (
    <Alert variant={variant} className="text-center animate__animated animate__fadeIn">
      {message}
      <img
        className={`img-fluid img-thumbnail ${opacity} mt-2`}
        src={bgFind}
        alt="Buscar"
      />
    </Alert>
  );
};
