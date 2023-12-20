import './style/FooterTablePlus.css';
import {useNavigate} from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {animateScroll as scroll} from "react-scroll";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import React from "react";
import {verifyIsTestAccess} from "../pages/utils.js";

export const FooterTablePlus = () => {
  const [isTestAccess, setIsTestAccess] = React.useState(false)
  
  React.useEffect(() => {
    setIsTestAccess(verifyIsTestAccess())
  }, [])
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }
  const windowWidth = window.innerWidth;
  const isDesktop = windowWidth > 768;
  
  const navigate = useNavigate();
  return (
    <footer className="footerTablePlus" style={isTestAccess ? {justifyContent: "flex-end"} : {}}>
      {!isTestAccess && (
        <p className="footerTablePlus__suggestion" onClick={() => {
          navigate('/sugerir/')
        }}>Sugerir<ForwardToInboxIcon style={{fontSize: '18px'}}/></p>
      )}
      <button className="footerTablePlus__upButton" onClick={scrollToTop}><ArrowUpwardIcon style={{fontSize: isDesktop ? 40 : 18}}/></button>
    </footer>
  )
}
