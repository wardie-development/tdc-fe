import './styles/CompatibilityBrands.css'
import React from "react";

const CellphoneLine = ({ cellphone, search }) => {
  const searchHighlightStyle = {
    backgroundColor: 'yellow',
    color: 'red',
    fontWeight: 500,
  };
  
  const isOnlyModel = ["Samsung", "Motorola", "Apple"].includes(cellphone.brand);
  const mainTitle = isOnlyModel ? cellphone.model : `${cellphone.brand} ${cellphone.model}`;
  const formattedMainTitle = mainTitle.replace(/Galaxy/gi, "Samsung");
  const cellphoneString = `${formattedMainTitle} – ${cellphone.compatibilities}`;
  
  const parts = cellphoneString.split(" – ");
  
  const highlightedString = parts.map((part, index) => {
    const isBold = index === 0;
    const partStyle = isBold ? { fontWeight: 500 } : {};
    
    return (
      <span key={index} style={partStyle}>
      {part.split(new RegExp(`(${search})`, 'ig')).map((subPart, subIndex) => {
        const highlight = subIndex % 2 !== 0;
        const subPartStyle = highlight ? searchHighlightStyle : {};
        return (
          <span key={subIndex} style={subPartStyle}>
            {subPart}
          </span>
        );
      })}
        {index < parts.length - 1 && " – "}
    </span>
    );
  });
  
  return (
    <p className="compatibilityRow__text">
      {highlightedString}
    </p>
  );
};



export const CompatibilityBrands = ({screenProtector, search}) => {
  return (
    <ul className="compatibilityItems" style={{color: screenProtector.color}}>
      {screenProtector.cellphones.map((cellphone, index) => {
        return (
          <li className="compatibilityItems__item compatibilityRow" key={`cellphone-${index}`}
              style={{borderColor: `${screenProtector.color}77`}}>
            <CellphoneLine cellphone={cellphone} search={search}/>
          </li>
        )
      })}
    </ul>
  );
}
