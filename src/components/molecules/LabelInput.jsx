import './styles/LabelInput.css'
import React from "react";
import SimpleInput from "../atoms/SimpleInput.jsx";

const LabelInput = ({label, onChange, value, style={}, type="text", enterKeyHint="enter", labelPosition="top"}) => {
  const [labelStyle, setLabelStyle] = React.useState({})
  React.useEffect(() => {
    if (labelPosition === "left") {
      setLabelStyle({display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"})
    }
  }, [])
  return (
    <label className="labelInput__label" style={labelStyle}>
      {label}
      <SimpleInput
        onChange={onChange}
        value={value}
        style={style}
        type={type}
        enterKeyHint={enterKeyHint}
      />
    </label>
  )
}

export default LabelInput