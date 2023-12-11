import './style/FooterTablePlus.css';
import {useNavigate} from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const FooterTablePlus = () => {
  const navigate = useNavigate();
  return (
    <footer className="footerTablePlus">
      <p className="footerTablePlus__suggestion" onClick={() => {
        navigate('/sugerir/')
      }}>Sugerir</p>
      <button className="footerTablePlus__upButton"><ArrowUpwardIcon/></button>
    </footer>
  )
}
