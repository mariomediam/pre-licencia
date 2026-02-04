import ClockIcon from "../../icons/ClockIcon";

export const CollecionDate = ({ D_Recaud_Inicio }) => {
    return (
        <div className="bg-white rounded-4 shadow-sm p-4">
            <p className="d-flex align-items-center gap-2 p-0 m-0"><ClockIcon width={16} height={16} /> Recaudación actualizada al <strong>{D_Recaud_Inicio}</strong></p>
        </div>
    )
}
