import React from "react";
import {getBrandNames} from "../../integration.js";
import './style/CellPhoneBrands.css'

export const CellPhoneBrands = () => {
  const [brandNames, setBrandNames] = React.useState([])

  React.useEffect(() => {
    const token = 'bb23c6751efd4d368cac055d505ef6f0'
    getBrandNames(token).then(response => setBrandNames(response))
  },[])

  return (
    <section className='cellPhoneBrands'>
      <ul className='cellPhoneBrands__list listBrands'>
        {brandNames.map((brandName, index) => (
          <li className='listBrands__item itemBrands' key={`brandName-${index}`}>
            <p className='itemBrands__name'>{brandName.name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

