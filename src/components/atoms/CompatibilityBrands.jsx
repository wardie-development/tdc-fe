import './styles/CompatibilityBrands.css'

const CellphoneLine = ({cellphone, search}) => {
  // const removeMappedBrands = c => c.replace("Galaxy", "").replace("Xiaomi", "").replace("Motorola", "").replace("Oppo", "")
  // const searchHighlight = `<span style='background-color: yellow; color: red'>${search}</span>`
  //
  // const cellPhoneModel = cellphone.model.split(' ').at(-1)
  // const mainCellphone = `${cellphone.brand} ${cellPhoneModel}`
  // const cellphoneString = `<span style="font-weight: 500">${mainCellphone}</span> – ${cellphone.compatibilities.map(removeMappedBrands).join(' – ')}`
  //
  // return (
  //   <p className="compatibilityRow__text" dangerouslySetInnerHTML={{__html: cellphoneString.replace(search, searchHighlight)}} />
  // )
  const cellphoneString = `<span style="font-weight: 500">${cellphone.model}</span> – ${cellphone.compatibilities.join(' – ')}`.replace(search, `<span style='background-color: yellow; color: red'>${search}</span>`)
  
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