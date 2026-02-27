import { useNavigate } from "react-router-dom";

import EyeIcon from "../../icons/EyeIcon";


export const RoadSignsPerMonth = ({ senializacionesMonthly, anio }) => {

    const navigate = useNavigate();

  const onClickView = (anio, mes) => {
    navigate(`/transportation/road-signs/per-month/${anio}/${mes}`);
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

  const formatUnidad = (unidad) => {
    return unidad.replace(/(\d+)/g, (match) => {
      const superscripts = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
      return match.split('').map(digit => superscripts[digit] || digit).join('');
    });
  };

  const getColorForUnidad = (unidad) => {
    const colores = {
      'M2': '#6366f1',
      'UNIDAD': '#22c55e',
      'ML': '#f59e0b',
      'M': '#ef4444'
    };
    return colores[unidad] || '#6366f1';
  };

  const todasLasUnidades = senializacionesMonthly.flatMap(mes => mes.unidades.map(u => u.N_unimed_desc));
  const unidadesUnicas = [...new Set(todasLasUnidades)];

  const maxCantidadPorUnidad = {};
  unidadesUnicas.forEach(unidad => {
    const cantidades = senializacionesMonthly.flatMap(mes => 
      mes.unidades.filter(u => u.N_unimed_desc === unidad).map(u => u.cantidad)
    );
    maxCantidadPorUnidad[unidad] = Math.max(...cantidades, 1);
  });

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} className="animate__animated animate__fadeIn animate__faster">
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Mes</th>
            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Cantidad</th>
            <th style={{ width: '50%', padding: '10px', borderBottom: '1px solid #ddd' }}></th>
            <th style={{ width: '40px', padding: '10px', borderBottom: '1px solid #ddd' }}></th>
          </tr>
        </thead>
        <tbody>
          {mesesDelAnio.map((mesInfo, idx) => {
            const mesData = senializacionesMonthly.find(sen => parseInt(sen.M_Senializa_Mes) === mesInfo.mes);
            const unidades = mesData ? mesData.unidades : [];
            
            return (
              <tr key={ `${mesInfo.mes}-${anio}-${idx}` } style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 10px', fontWeight: '500', verticalAlign: 'top' }}>
                  {mesInfo.nombre}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'top' }}>
                  {unidades.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {unidades.map((uni, idx) => (
                        <div key={idx} style={{ fontSize: '14px' }}>
                          {uni.cantidad.toLocaleString('es-PE')} {formatUnidad(uni.N_unimed_desc)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span style={{ color: '#999' }}>-</span>
                  )}
                </td>
                <td style={{ padding: '12px 10px', verticalAlign: 'top' }}>
                  {unidades.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {unidades.map((uni, idx) => {
                        const porcentaje = maxCantidadPorUnidad[uni.N_unimed_desc] > 0 
                          ? (uni.cantidad / maxCantidadPorUnidad[uni.N_unimed_desc]) * 100 
                          : 0;
                        
                        return (
                          <div key={idx} style={{ 
                            width: '100%', 
                            backgroundColor: '#f0f0f0', 
                            borderRadius: '4px',
                            height: '20px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${porcentaje}%`,
                              backgroundColor: getColorForUnidad(uni.N_unimed_desc),
                              height: '100%',
                              transition: 'width 0.3s ease'
                            }}></div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center', verticalAlign: 'top' }}>
                 
                    <button style={{
                      background: 'none',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }} onClick={() => onClickView(anio, mesInfo.mes)}>
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