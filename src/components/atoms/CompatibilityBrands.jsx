import './styles/CompatibilityBrands.css'

const CellphoneLine = ({cellphone, search}) => {
  const cellphoneString = `<span style="font-weight: 500">${cellphone.brand} ${cellphone.model}</span> – ${cellphone.compatibilities.join(' – ')}`.replace(search, `<span style='background-color: yellow; color: red'>${search}</span>`)
  
  return (
    <p className="compatibilityRow__text" dangerouslySetInnerHTML={{__html: cellphoneString}} />
  )
}

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