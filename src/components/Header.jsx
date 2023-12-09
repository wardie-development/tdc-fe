import logoTdc from '../assets/logo-tdc.png'
import './style/Header.css';
import PropTypes from "prop-types";

export const Header = ({title, textButton}) => {
  return (
    <header className='header'>
      <img className='header__image' src={logoTdc} alt="logo"/>
      <div className='header__boxText boxText'>
        <p className='boxText__title'>{title}</p>
        {textButton && <button className='boxText__button'>{textButton}</button>}
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  textButton: PropTypes.string
}
