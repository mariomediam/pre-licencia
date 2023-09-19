import imgEscudo from "../assets/images/escudo_muni.jpg";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRef, useState, useContext } from "react";
import { Login } from "../services/usuarioService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";

export default function LoginView() {
  const { iniciaSesion } = useContext(AuthContext);

  const { handleSubmit } = useForm();

  const [showError, setShowError] = useState(false);
  const [msgError, setMsgError] = useState("Error de inicio de sesión");

  const navigate = useNavigate();
  const inputLogin = useRef();
  const inputPassword = useRef();

  const ejecutarBusqueda = async () => {
    setShowError(false);
    let usuario = inputLogin.current.value;
    let password = inputPassword.current.value;
    const resultado = await Login(usuario, password);

    if (resultado.estado.trim() !== "OK") {
      setMsgError(resultado.estado.trim());
      setShowError(true);
    } else {
      await iniciaSesion(
        usuario.toUpperCase(),
        JSON.parse(localStorage.getItem("authTokens")),
        jwt_decode(localStorage.getItem("authTokens"))
      );
      navigate("/inicio");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="d-flex border py-4 px-4  flex-column align-items-center col-lg-5 col-xl-4 shadow-sm bg-body-tertiary rounded bg-white">
        <img className="mb-3" src={imgEscudo} alt="imagen login" />
        <p className="text-center">Municipalidad Provincial de Piura</p>
        <h3 className="text-center">
          Sistema Integrado de Atención al Ciudadano
        </h3>
        <Form onSubmit={handleSubmit(ejecutarBusqueda)} className="mb-4">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese usuario"
              ref={inputLogin}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={inputPassword}
              required
            />
          </Form.Group>
          {showError ? (
            <Alert variant={"danger"}>{msgError}</Alert>
          ) : (
            <div></div>
          )}
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit">
              Iniciar sesión
            </Button>
          </div>
        </Form>
        <p className="text-muted text-center mb-0">
          © Gerencia de Tecnologías y Sistemas de Información
        </p>
      </div>
    </Container>
  );
}
