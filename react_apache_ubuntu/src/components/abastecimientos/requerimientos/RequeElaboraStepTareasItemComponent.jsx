import { Card, Table } from 'react-bootstrap';
import { RequeElaboraStepTareasItemSaldoComponent } from './RequeElaboraStepTareasItemSaldoComponent';

export const RequeElaboraStepTareasItemComponent = ( { tarea }) => {

    const { C_secfun, N_metapresup_desc, C_activpoi, N_activpoi_desc, saldo } = tarea;
  return (
    <div className='mb-4'>
        <Card>
      <Card.Header>
        <p className='mb-0 text-truncate'><small className='text-muted'>Secuencia funcional: </small><small>{C_secfun} - {N_metapresup_desc?.trim()}</small></p>
        <p className='mb-0 text-truncate'><small className='text-muted'>Tarea operativa: </small><small>{C_activpoi} - {N_activpoi_desc?.trim()}</small></p>


      </Card.Header>
      <Card.Body>
        {/* <Card.Title>Special title treatment</Card.Title> */}
        <Card.Text>
        <Table hover responsive className="caption-top mb-1 animate__animated animate__fadeIn animate__faster">
              <thead>
                <tr className="color-header1 text-white">
                  <th className="text-center align-middle m-0 p-0">
                    Clasificador 
                  </th>                  
                  <th className="text-center align-middle m-0 p-0">
                    Fuente / Recurso
                  </th>
                  <th className="text-center align-middle m-0 p-0">Objetivo/Meta</th>                  
                  <th className="text-center align-middle m-0 p-0">Saldo</th>                  
                </tr>
              </thead>
              <tbody>
                {saldo.map((s, i) => (
                  <tr 
                    key={i}                    
                  >
                    <RequeElaboraStepTareasItemSaldoComponent tarea={s} />
                  </tr>
                ))}
              </tbody>
            </Table>
        </Card.Text>
        
      </Card.Body>
    </Card>
  </div>
  )
}
