import React from "react";
import {getBrandNames} from "../../integration.js";
import './style/CellPhoneBrands.css'

export const CellPhoneBrands = () => {
  const [brandNames, setBrandNames] = React.useState([])

  React.useEffect(() => {
    const token = 'c8df1335445043df8e821f81153782fe'
    getBrandNames(token).then(response => setBrandNames(response))
  },[])

  return (
    <section className='cellPhoneBrands'>
      <ul className='cellPhoneBrands__list listCompatibilities'>
        {brandNames.map((brandName, index) => (
          <li className='listBrands__item itemBrands' key={`brandName-${index}`}>
            <p className='itemBrands__name'>{brandName.name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

