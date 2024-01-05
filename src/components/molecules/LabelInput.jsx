import './styles/LabelInput.css'
import React from "react";
import SimpleInput from "../atoms/SimpleInput.jsx";

const LabelInput = ({label, onChange, value, labelStyle={}, style={}, type="text", enterKeyHint="enter", labelPosition="top"}) => {
  const [currentLabelStyle, setLabelStyle] = React.useState({})
  React.useEffect(() => {
    if (labelPosition === "left") {
      setLabelStyle({display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"})
    }
  }, [])
  return (
    <label className="labelInput__label" style={currentLabelStyle}>
      <span style={labelStyle}>{label}</span>
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