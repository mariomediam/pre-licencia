import { Form } from "react-bootstrap";

export const ContribEditDatPriComponent = ({ valores, setValores, tipoContribuyente }) => {
  return (
    <div>
              <div className="col-lg-2">
                <Form.Group
                  md="6"
                  controlId="id_codigoContrib"
                  className="mt-2"
                >
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

              <Form.Group
                md="6"
                controlId="id_tipoContrib"
                className="mt-2 col-lg-4"
              >
                <Form.Label className="text-muted mb-0">
                  <small className="mb-0">Tipo de contribuyente</small>
                </Form.Label>
                <Form.Select
                  aria-label="Tipo de contribuyente"
                  value={valores.tipoContrib}
                  onChange={(e) =>
                    setValores({ ...valores, tipoContrib: e.target.value })
                  }
                >
                  {tipoContribuyente.map(({ C004Tip_Cont, C004Nombre }, i) => (
                    <option key={C004Tip_Cont} value={C004Tip_Cont}>
                      {C004Nombre.trim()}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {/* {errors.city} */}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group md="6" controlId="id_nombre" className="mt-2">
                <Form.Label className="text-muted mb-0">
                  <small className="mb-0">Nombre</small>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="name_nombre"
                  value={valores.nombre}
                  // ref= { inputNombre }
                  onChange={(e) =>
                    setValores({ ...valores, nombre: e.target.value })
                  }
                  // onChange={handleChange}
                  // isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid">
                  {/* {errors.city} */}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
  )
}
