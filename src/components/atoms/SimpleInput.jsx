import '../molecules/styles/LabelInput.css'
import React from "react";
import './styles/SimpleInput.css'

const SimpleInput = ({onChange, value, style={}, type="text", enterKeyHint="enter", placeholder=""}) => {
  return (
      <input
        style={style}
        onChange={onChange}
        value={value}
        className="simpleInput"
        type={type}
        placeholder={placeholder}
        enterKeyHint={enterKeyHint}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.target.blur();
          }
        }}
      />
  )
}

export default SimpleInput