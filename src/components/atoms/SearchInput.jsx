import PropTypes from "prop-types";
import './styles/SearchInput.css';

export const SearchInput = ({placeholder, onChange, type = 'text'}) => {
  return (
    <input
      className='searchInput'
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
}
