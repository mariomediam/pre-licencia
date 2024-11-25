
import ArrowRightIcon from '../../icons/ArrowRight'

export const ViewMore = () => {
  return (
    <div className="cursor-pointer negrita-container" role="button" >
        <small style={{ fontSize: "0.7rem" }} className="negrita-text">
          Ver más
        </small>
        <ArrowRightIcon width={16} height={16} />
      </div>
  )
}
