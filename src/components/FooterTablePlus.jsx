import './style/FooterTablePlus.css';
import {useNavigate} from "react-router-dom";

export const FooterTablePlus = () => {
  const navigate = useNavigate();
  return (
    <footer className="footerTablePlus">
      <p className="footerTablePlus__suggestion" onClick={() => {
        navigate('/sugerir/')
      }}>Sugerir</p>
      <button className="footerTablePlus__upButton">...</button>
    </footer>
  )
}