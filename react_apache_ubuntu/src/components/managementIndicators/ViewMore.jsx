
import { useNavigate } from 'react-router-dom'
import ArrowRightIcon from '../../icons/ArrowRight'

export const ViewMore = ({ url }) => {

  const navigate = useNavigate();

  const onClickGoTo = () => {
    navigate(url);
  }
  



  return (
    <div className="cursor-pointer negrita-container" role="button" onClick={onClickGoTo}>
        <small style={{ fontSize: "0.7rem" }} className="negrita-text">
          Ver más
        </small>
        <ArrowRightIcon width={16} height={16} />
      </div>
  )
}
