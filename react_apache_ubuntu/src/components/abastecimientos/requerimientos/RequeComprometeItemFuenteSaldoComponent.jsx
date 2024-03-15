import { Form } from "react-bootstrap";

import { formatNumber } from "../../../utils/varios";

export const RequeComprometeItemFuenteSaldoComponent = ( { saldoFuente} ) => {

    const { C_fuefin, C_recurso, q_saldo } = saldoFuente;


    // "C_anipre": "2024",
    //         "C_secfun": "0093",
    //         "C_depen": "010620",
    //         "C_clapre": "2.3.2.4.99.99",
    //         "C_fuefin": "09",
    //         "C_recurso": "7 ",
    //         "C_objpoi": "0050",
    //         "C_metapoi": "002",
    //         "C_activpoi": "485",
    //         "q_saldo": 6226.0
    return (
        <tr>
            <td className="align-middle">{C_fuefin} / {C_recurso}</td>
            <td className="text-end align-middle">{formatNumber(q_saldo)}</td>
            <td> <Form.Control className="text-end" size="sm" type="number" placeholder="0.00" /></td>
        </tr>
    )
}