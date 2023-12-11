import './style/FooterTablePlus.css';
import {useNavigate} from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {animateScroll as scroll} from "react-scroll";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

export const FooterTablePlus = () => {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }
  const navigate = useNavigate();
  return (
    <footer className="footerTablePlus">
      <p className="footerTablePlus__suggestion" onClick={() => {
        navigate('/sugerir/')
      }}>Sugerir<ForwardToInboxIcon style={{fontSize: '18px'}}/></p>
      <button className="footerTablePlus__upButton" onClick={scrollToTop}><ArrowUpwardIcon/></button>
    </footer>
  )
}
