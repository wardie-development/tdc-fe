import './styles/CompatibilityBrands.css'

const CellphoneLine = ({cellphone, search}) => {
  const removeMappedBrands = c => c.replace("Galaxy", "").replace("Xiaomi", "").replace("Motorola", "").replace("Oppo", "").replace("Samsung", "")
  const searchHighlight = `<span style='background-color: yellow; color: red'>${search}</span>`
  const isOnlyModel = ["Samsung", "Motorola", "Apple"].includes(cellphone.brand)
  const mainTitle = isOnlyModel ? cellphone.model : `${cellphone.brand} ${cellphone.model}`
  const cellphoneString = `<span style="font-weight: 500">${mainTitle.replace("Galaxy", "Samsung")}</span> – ${cellphone.compatibilities.map(removeMappedBrands).join(' – ')}`

  return (
    <p className="compatibilityRow__text" dangerouslySetInnerHTML={{__html: cellphoneString.replace(search, searchHighlight)}} />
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
