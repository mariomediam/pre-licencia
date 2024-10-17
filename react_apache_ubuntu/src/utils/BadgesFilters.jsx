

export const BadgesFilters = ({ filters = [] }) => {
  return (
    <div className="d-flex gap-2 flex-wrap">
      {filters.map((filter, i) => (
        <span key={i} className="badge rounded-pill animate__animated animate__fadeIn animate__fast" style={{ backgroundColor: "#DDECF5", color: "#4E4187"}}>
          <small>{filter}</small>
        </span>
      ))}
      
       
    </div>
  )
}
// animate__faster
