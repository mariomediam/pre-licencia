import logoGiz from "../../assets/images/logo GIZ.jpeg";
import logoEmbajadaSuiza from "../../assets/images/logo embajada suiza.jpeg";
import logoPromovilidad from "../../assets/images/logo-promovilidad.png";
import logoMTC from "../../assets/images/logo-mtc.png";

export const FooterIndicators = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-top py-4 mt-auto">
            <div className="container-lg">


                {/* Contenido principal del footer */}
                <div className="d-flex flex-column  align-items-center justify-content-cemter gap-2">
                    {/* Copyright - Lado izquierdo */}
                    {/* <div className="">
                        <p className="text-muted small mb-0 text-center text-md-start">
                            © {currentYear} Municipalidad Provincial de Piura. Todos los derechos reservados
                        </p>
                    </div> */}

                    {/* Logos - Lado derecho */}
                    {/* Texto superior centrado */}
                    <div className="mb-4">
                        <p className="text-muted small mb-0">Implementada por</p>
                    </div>

                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-2">

                        <img src={logoMTC} alt="MTC" style={{ height: "150px", objectFit: "contain" }} />
                    <img src={logoPromovilidad} alt="Promovilidad" style={{ height: "80px", objectFit: "contain" }} />


                        <img
                            src={logoGiz}
                            alt="Cooperación Alemana - GIZ"

                            style={{ height: "120px", objectFit: "contain" }}
                        />

                        <img
                            src={logoEmbajadaSuiza}
                            alt="Embajada de Suiza en el Perú"
                            style={{ height: "120px", objectFit: "contain" }}
                        />


                     

                    </div>
                </div>
            </div>
        </footer>
    );
};
