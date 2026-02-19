import { useNavigate } from "react-router-dom";

import EyeIcon from "../../icons/EyeIcon";

export const TrainingPerMonth = ({ capacitaciones, anio }) => {

  const navigate = useNavigate();

  const onClickView = (anio, mes) => {
    navigate(`/transportation/training/per-month/${anio}/${mes}`);
  }

  const mesesDelAnio = [
    { mes: 1, nombre: 'Enero' },
    { mes: 2, nombre: 'Febrero' },
    { mes: 3, nombre: 'Marzo' },
    { mes: 4, nombre: 'Abril' },
    { mes: 5, nombre: 'Mayo' },
    { mes: 6, nombre: 'Junio' },
    { mes: 7, nombre: 'Julio' },
    { mes: 8, nombre: 'Agosto' },
    { mes: 9, nombre: 'Septiembre' },
    { mes: 10, nombre: 'Octubre' },
    { mes: 11, nombre: 'Noviembre' },
    { mes: 12, nombre: 'Diciembre' }
  ];

  const obtenerCantidadPorMes = (mes) => {
    const capacitacion = capacitaciones.find(cap => cap.mes === mes);
    return capacitacion ? capacitacion.Q_Capacita_Cantidad : 0;
  };

  const maxCantidad = Math.max(...capacitaciones.map(cap => cap.Q_Capacita_Cantidad), 1);



  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} className="animate__animated animate__fadeIn animate__faster">
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Mes</th>
            <th style={{ textAlign: 'right', padding: '10px', borderBottom: '1px solid #ddd' }}>Personas capacitadas</th>
            <th style={{ width: '50%', padding: '10px', borderBottom: '1px solid #ddd' }}></th>
            <th style={{ width: '40px', padding: '10px', borderBottom: '1px solid #ddd' }}></th>
          </tr>
        </thead>
        <tbody>
          {mesesDelAnio.map((capacitacion) => {
            const cantidad = obtenerCantidadPorMes(capacitacion.mes);
            const porcentaje = maxCantidad > 0 ? (cantidad / maxCantidad) * 100 : 0;
            
            return (
              <tr key={capacitacion.mes} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 10px', fontWeight: '500' }}>{capacitacion.nombre}</td>
                <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: '500' }}>
                  {cantidad.toLocaleString()}
                </td>
                <td style={{ padding: '12px 10px' }}>
                  <div style={{ 
                    width: '100%', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '4px',
                    height: '24px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${porcentaje}%`,
                      backgroundColor: '#00C950',
                      height: '100%',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                  <button style={{
                    background: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                    }} onClick={() => onClickView(anio, capacitacion.mes)}>
                    <EyeIcon className="text-primary" width={20} height={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
