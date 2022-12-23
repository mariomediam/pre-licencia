import Header from "../components/Header";
import imgEscudo from "../assets/images/escudo_muni.jpg";

export const DefaultView = () => {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center mt-5">
        <div className="col-sm-12 col-md-6">
          <div className="d-flex justify-content-center">
            <img className="mt-5" src={imgEscudo} alt="imagen login" />
          </div>
          <div className="m-3">
            <p className="mt-0 mb-3 text-center">
              Municipalidad Provincial de Piura
            </p>
            <h1 className="h3 mb-4 font-weight-normal text-center">
              Sistema Integrado de Atención al Ciudadano
            </h1>
          </div>
          <div>
            <p className="mt-5 mb-3 text-muted text-center">
              © Gerencia de Tecnologías y Sistemas de Información
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
