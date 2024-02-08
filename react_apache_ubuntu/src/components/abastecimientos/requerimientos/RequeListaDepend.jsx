import { Spinner, Table } from "react-bootstrap";
import { RequeListaDependItemComponent } from "./RequeListaDependItemComponent";

export const RequeListaDepend = ( { requerimientos = []}) => {
    const isLoading = false;

  return (
    <div className="mt-3">
    <div className="">
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" className="me-2">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          Cargando
        </div>
      ) : (
        <>
          <small>
            {" "}
            Requerimientos
          </small>

          <div style={{ border: "1px solid lightgrey" }}>
            <Table hover responsive className="caption-top mb-1 animate__animated animate__fadeIn animate__faster">
              <thead>
                <tr className="color-header1 text-white">
                  <th className="text-center align-middle m-0 p-0">
                    Número 
                  </th>
                  <th className="text-center align-middle m-0 p-0">Descripción</th>
                  <th className="text-center align-middle m-0 p-0">
                    Monto
                  </th>
                  <th className="text-center align-middle m-0 p-0"></th>                  
                </tr>
              </thead>
              <tbody>
                {requerimientos.map((requerimiento, i) => (
                  <tr 
                    key={
                      `${requerimiento.C_reque}-${requerimiento.C_biesertipo}`
                    }                    
                  >
                    <RequeListaDependItemComponent requerimiento={requerimiento} />
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  </div>
  )
}
