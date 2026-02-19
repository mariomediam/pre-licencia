import { obtenerNombreMes } from "../../utils/varios";

export const TrainingPerMonth = ({ capacitaciones }) => {
  return (
    <>
    <table>

        <thead> 
            <tr>
                <th>Mes</th>
                <th>Personas capacitadas</th>
            </tr>
        </thead>
        <tbody>
            {capacitaciones.map((capacitacion) => (
                <tr key={capacitacion.mes}>
                    <td>{ obtenerNombreMes(capacitacion.mes)}</td>
                    <td>{capacitacion.Q_Capacita_Cantidad}</td>
                </tr>
            ))}
        </tbody>
    </table>
    
    </>
  )
}
