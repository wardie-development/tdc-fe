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
  
  const highlightedString = parts.map((part, index) => (
    index === 0 ? (
      <span key={index} style={{ fontWeight: 500 }}>
        {search ? (
          part.split(new RegExp(`(${search})`, "ig")).map((subPart, subIndex) => (
            subIndex % 2 === 0 ? (
              <span key={subIndex}>
                {subPart}
              </span>
            ) : (
              <span key={subIndex} style={searchHighlightStyle}>
                {subPart}
              </span>
            )
          ))
        ) : (
          part
        )}
      </span>
    ) : (
      <span key={index}>
        {" – "}{search && part.toLowerCase() === search.toLowerCase() ? (
        <span style={searchHighlightStyle}>{part}</span>
      ) : (
        part
      )}
      </span>
    )
  ));
  
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
