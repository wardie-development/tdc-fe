import PropTypes from "prop-types";
import './styles/SearchInput.css';

export const SearchInput = ({placeholder, onChange, value, type = 'text', isCircle = true, style = {}, isTextArea = false, rows = 1, className="", includeCleaner = false, onClean = () => {}, required=false, enterKeyHint="enter"}) => {
  return (
    isTextArea ?
    <textarea
      className={`searchInput ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      rows={rows}
      style={{borderRadius: isCircle ? '50px' : '5px', ...style}}
    /> :
      includeCleaner ? (
        <div style={{display: "inline-block", width: "75%", position: "relative"}}>
          <input
            className={`searchInput ${className}`}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            style={{borderRadius: isCircle ? '50px' : '5px', ...style, width: "100%"}}
            required={required}
            enterKeyHint={enterKeyHint}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
              }
            }}
          />
          {value.length > 0 && (
            <p className="searchInput__cleaner" onClick={onClean}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                <g fill="#424242" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(8.53333,8.53333)"><path d="M7,4c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-2,2c-0.391,0.391 -0.391,1.02406 0,1.41406l7.29297,7.29297l-7.29297,7.29297c-0.391,0.391 -0.391,1.02406 0,1.41406l2,2c0.391,0.391 1.02406,0.391 1.41406,0l7.29297,-7.29297l7.29297,7.29297c0.39,0.391 1.02406,0.391 1.41406,0l2,-2c0.391,-0.391 0.391,-1.02406 0,-1.41406l-7.29297,-7.29297l7.29297,-7.29297c0.391,-0.39 0.391,-1.02406 0,-1.41406l-2,-2c-0.391,-0.391 -1.02406,-0.391 -1.41406,0l-7.29297,7.29297l-7.29297,-7.29297c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297z"></path></g></g>
              </svg>
            </p>
          )}
        </div>
      ) : (
        <input
          className={`searchInput ${className}`}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          style={{borderRadius: isCircle ? '50px' : '5px', ...style}}
          required={required}
          enterKeyHint={enterKeyHint}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
        />
      )
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string
}
