import PropTypes from "prop-types";
import './styles/SearchInput.css';

export const SearchInput = ({placeholder, onChange, value, type = 'text'}) => {
  return (
    <input
      className='searchInput'
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string
}
