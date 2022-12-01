import { Form } from "react-bootstrap";
import React from "react";

export const ContribEditDatPriComponent = ({
  valores,
  setValores,
  tipoContribuyente,
}) => {
  return (
    <div>
      <div className="col-lg-4">
        {/* ------------------ CODIGO DE CONTRIBUYENTE -------------------*/}
        <Form.Group md="6" controlId="id_codigoContrib" className="mt-2">
          <Form.Label className="text-muted mb-0">
            <small className="mb-0">Código nuevo</small>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Código"
            name="name_codigoContrib"
            value={valores.codigoContrib}
            readOnly
            // ref= { inputNombre }
            onChange={(e) =>
              setValores({ ...valores, codigoContrib: e.target.value })
            }
            // onChange={handleChange}
            // isInvalid={!!errors.city}
          />

          <Form.Control.Feedback type="invalid">
            {/* {errors.city} */}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* ------------------ TIPO DE CONTRIBUYENTE -------------------*/}
      <Form.Group md="6" controlId="id_tipoContrib" className="mt-2 col-lg-4">
        <Form.Label className="text-muted mb-0">
          <small className="mb-0">Tipo de contribuyente</small>
        </Form.Label>
        <Form.Select
          aria-label="Tipo de contribuyente"
          value={valores.tipoContrib}
          disabled={valores.tipoContrib === "01" ? true : false}
          onChange={(e) =>
            setValores({ ...valores, tipoContrib: e.target.value })
          }
        >
          {tipoContribuyente.map(({ C004Tip_Cont, C004Nombre }, i) => (
            <React.Fragment key={i}>
              {(valores.tipoContrib !== "01" && C004Tip_Cont !== "01") ||
              (valores.tipoContrib === "01" && C004Tip_Cont === "01") ? (
                <option key={C004Tip_Cont} value={C004Tip_Cont}>
                  {C004Nombre.trim()}
                </option>
              ) : null}
            </React.Fragment>
          ))}
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          {/* {errors.city} */}
        </Form.Control.Feedback>
      </Form.Group>

      {valores.tipoContrib === "01" && (
        <div>
          {/* ------------------ APELLIDO PATERNO -------------------*/}
          <Form.Group md="6" controlId="id_apepat" className="mt-2">
            <Form.Label className="text-muted mb-0">
              <small className="mb-0">Apellido paterno</small>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido paterno"
              name="name_apepat"
              value={valores.apePat}
              onChange={(e) =>
                setValores({ ...valores, apePat: e.target.value })
              }
              // isInvalid={!!errors.city}
            />

            <Form.Control.Feedback type="invalid">
              {/* {errors.city} */}
            </Form.Control.Feedback>
          </Form.Group>

          {/* ------------------APELLIDO MATERNO -------------------*/}
          <Form.Group md="6" controlId="id_apemat" className="mt-2">
            <Form.Label className="text-muted mb-0">
              <small className="mb-0">Apellido materno</small>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido materno"
              name="name_apemat"
              value={valores.apeMat}
              onChange={(e) =>
                setValores({ ...valores, apeMat: e.target.value })
              }
              // isInvalid={!!errors.city}
            />

            <Form.Control.Feedback type="invalid">
              {/* {errors.city} */}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      )}

      {/* ------------------ NOMBRE / RAZON SOCIAL -------------------*/}
      <Form.Group md="6" controlId="id_nombre" className="mt-2">
        <Form.Label className="text-muted mb-0">
          <small className="mb-0">
            {valores.tipoContrib === "01" ? "Nombre" : "Razón social"}
          </small>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre"
          name="name_nombre"
          value={valores.nombre}
          // ref= { inputNombre }
          onChange={(e) => setValores({ ...valores, nombre: e.target.value })}
          // onChange={handleChange}
          // isInvalid={!!errors.city}
        />

        <Form.Control.Feedback type="invalid">
          {/* {errors.city} */}
        </Form.Control.Feedback>
      </Form.Group>

      {valores.tipoContrib === "01" && (
        <div>
          {/* ------------------ SEXO -------------------*/}
          <Form.Group md="6" controlId="id_sexo" className="mt-2 col-lg-4">
            <Form.Label className="text-muted mb-0">
              <small className="mb-0">Sexo</small>
            </Form.Label>
            <Form.Select
              aria-label="sexo"
              value={valores.sexo}
              onChange={(e) => setValores({ ...valores, sexo: e.target.value })}
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {/* {errors.city} */}
            </Form.Control.Feedback>
          </Form.Group>

          {/* ------------------ FECHA DE NACIMIENTO -------------------*/}
          <Form.Group md="6" controlId="id_fecnac" className="mt-2 col-lg-4">
            <Form.Label className="text-muted mb-0">
              <small className="mb-0">Fecha nacimiento</small>
            </Form.Label>
            <Form.Control
              type="date"
              name="name_fecNac"
              value={valores.fecNac}
              // ref= { inputNombre }
              onChange={(e) =>
                setValores({ ...valores, fecNac: e.target.value })
              }
              // onChange={handleChange}
              // isInvalid={!!errors.city}
            />

            <Form.Control.Feedback type="invalid">
              {/* {errors.city} */}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      )}


      {/* ------------------ OBSERVACIONES -------------------*/}
      <Form.Group md="6" controlId="id_observ" className="mt-2">
        <Form.Label className="text-muted mb-0">
          <small className="mb-0">Observaciones</small>
        </Form.Label>
        <Form.Control
          type="textarea"
          as="textarea"
          rows={3}
          name="name_observ"
          value={valores.observ}
          // ref= { inputNombre }
          onChange={(e) => setValores({ ...valores, observ: e.target.value })}
          // onChange={handleChange}
          // isInvalid={!!errors.city}
        />

        <Form.Control.Feedback type="invalid">
          {/* {errors.city} */}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};
