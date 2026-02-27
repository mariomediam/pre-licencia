// senializacion = 
// {
//     "C_Senializa_Indicador": 5,
//     "N_Senializa_Indicador": "Flechas direccional",
//     "C_Senializa_Meta": 1,
//     "C_bieser_unimed": "037",
//     "C_Senializa": null,
//     "M_Senializa_Anio": null,
//     "M_Senializa_Mes": null,
//     "Q_Senializa_Cantidad": 0.0,
//     "C_Usuari_Login": null,
//     "D_Senializa_FecDig": null,
//     "N_unimed_desc": "M2"
// },

export const RoadSignsPerMonthDetail = ({ senializacion, setChangeQuantity }) => {
    const { N_Senializa_Indicador: indicadorDescripcion, N_unimed_desc: unidad, Q_Senializa_Cantidad: cantidad, C_Senializa_Indicador: indicadorId } = senializacion;
    return (
        <tr>
            <td className="align-middle">

                {indicadorDescripcion} :
            </td>
            <td>
                <input type="number" value={cantidad} className="form-control text-end" onChange={(e) => setChangeQuantity(indicadorId, parseFloat(e.target.value))} />
            </td>
            <td className="align-middle">
                {unidad === "M2" ? "m²" : unidad}
            </td>

        </tr>
    )
}
