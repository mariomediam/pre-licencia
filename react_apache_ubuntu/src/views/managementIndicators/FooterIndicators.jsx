import logoGiz from "../../assets/images/logo GIZ.jpeg";
import logoEmbajadaSuiza from "../../assets/images/logo embajada suiza.jpeg";

export const FooterIndicators = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-top py-4 mt-auto">
            <div className="container-lg">


                {/* Contenido principal del footer */}
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                    {/* Copyright - Lado izquierdo */}
                    <div className="">
                        <p className="text-muted small mb-0 text-center text-md-start">
                            © {currentYear} Municipalidad Provincial de Piura. Todos los derechos reservados
                        </p>
                    </div>

                    {/* Logos - Lado derecho */}
                    <div className="">
                        {/* Texto superior centrado */}
                        <div className="mb-4">
                            <p className="text-muted small mb-0">Implementada por</p>
                        </div>

                        <img
                            src={logoGiz}
                            alt="Cooperación Alemana - GIZ"
                            
                            style={{ height: "150px", objectFit: "contain" }}
                        />

                        <img
                            src={logoEmbajadaSuiza}
                            alt="Embajada de Suiza en el Perú"
                            style={{ height: "150px", objectFit: "contain" }}
                        />     <div>

                        </div>


                    </div>
                </div>
            </div>
        </footer>
    );
};
