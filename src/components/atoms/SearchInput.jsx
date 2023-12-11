import PropTypes from "prop-types";
import './styles/SearchInput.css';

export const SearchInput = ({placeholder, onChange, value, type = 'text', isCircle = true, style = {}, isTextArea = false, rows = 1}) => {
  return (
    isTextArea ?
    <textarea
      className='searchInput'
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      rows={rows}
      style={{borderRadius: isCircle ? '50px' : '5px', ...style}}
    /> :
    <input
      className='searchInput'
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={{borderRadius: isCircle ? '50px' : '5px', ...style}}
    />
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string
}
