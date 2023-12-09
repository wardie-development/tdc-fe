import {CellPhoneBrands} from "./template/CellPhoneBrands.jsx";
import React from "react";
import {getBrands} from "../integration.js";
import './style/MainTablePlus.css'
import {SearchInput} from "./atoms/SearchInput.jsx";

export const MainTablePlus = () => {
  const [brands, setBrands] = React.useState([])

  React.useEffect(() => {
    const token = '773521e4c1d043a68996857a4b892c18'
    getBrands(token).then(response => setBrands(response))
  },[])

  return (
    <main className='mainTablePlus'>
      <CellPhoneBrands/>
      <SearchInput onChange={(e) => {console.log(e.target.value)}} placeholder={'Pesquise um modelo aqui'}/>
      <ul>
        {brands.map((brand, index) => (
          <li key={`brands-${index}`}>
            <p>{brand.title}</p>
            <p>{brand.color}</p>
            <p>{brand.cellphones.length}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
