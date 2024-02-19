import { Card, Table } from "react-bootstrap";
import { RequeElaboraStepTareasItemSaldoDetComponent } from "./RequeElaboraStepTareasItemSaldoDetComponent";

export const RequeElaboraStepTareasItemSaldoComponent = ({ actividad }) => {
  const { C_activpoi, N_activpoi_desc, saldos } = actividad;

  const originalData = {
    saldos: saldos,
  };

  const SaldosFormat = {
    saldos: [],
  };

  originalData.saldos.forEach((item) => {
    const index = SaldosFormat.saldos.findIndex(
      (i) =>
        i.C_clapre === item.C_clapre &&
        i.C_objpoi === item.C_objpoi &&
        i.C_metapoi === item.C_metapoi
    );
    if (index !== -1) {
      SaldosFormat.saldos[index].saldo.push({
        C_fuefin: item.C_fuefin,
        C_recurso: item.C_recurso,
        Q_monto: item.Q_monto
      });
    } else {
      SaldosFormat.saldos.push({
        C_clapre: item.C_clapre,
        C_objpoi: item.C_objpoi,
        C_metapoi: item.C_metapoi,
        saldo: [
          {
            C_fuefin: item.C_fuefin,
            C_recurso: item.C_recurso,
            Q_monto: item.Q_monto
          },
        ],
      });
    }
  });

  return (
    <Card className="mb-4">
      <Card.Header title={N_activpoi_desc?.trim()}>
        <p className="mb-0 text-truncate">
          <small className="text-muted">Tarea operativa: </small>
          <small>
            {C_activpoi} - {N_activpoi_desc?.trim()}
          </small>
        </p>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <Table
            hover
            responsive
            size="sm"
            className="caption-top mb-1 animate__animated animate__fadeIn animate__faster "
          >
            <thead>
              <tr className="">
                <th className="align-middle m-0 p-0">
                  <small className="text-muted">Clasificador</small>
                </th>
                <th>
                  <small className="text-muted">Objetivo / Meta</small>
                </th>
                <th className="align-middle m-0 p-0">
                  <small className="text-muted">Fuente / Recurso</small>
                </th>
                <th>
                  <small className="text-muted text-end">Saldo</small>
                </th>
                <th>
                    
                </th>
              </tr>
            </thead>
            <tbody>
              {SaldosFormat.saldos.map((s, i) => (
                <tr key={i}>
                  <RequeElaboraStepTareasItemSaldoDetComponent saldos={s} />
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
