import {CellPhoneBrands} from "./template/CellPhoneBrands.jsx";
import React from "react";
import {getBrands} from "../integration.js";
import './style/MainTablePlus.css'
import {SearchInput} from "./atoms/SearchInput.jsx";
import {ScreenProtectors} from "./molecules/ScreenProtectors.jsx";

export const MainTablePlus = () => {
  const [brands, setBrands] = React.useState([])
  const [filteredBrands, setFilteredBrands] = React.useState([])
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    const token = 'c8df1335445043df8e821f81153782fe'
    getBrands(token).then(response => setBrands(response))
  },[])
  
  const handleSearch = (value) => {
    if (value === '') {
      return setFilteredBrands([])
    }
    
    const filteredBrands = brands.filter(brand => brand.cellphones.some(cellphone => {
      const cellphoneString = `${cellphone.brand} ${cellphone.model} ${cellphone.compatibilities.join(' ')}`
      return cellphoneString.toLowerCase().includes(value.toLowerCase())
    }))
    const filteredCellphones = filteredBrands.map(brand => {
      const cellphones = brand.cellphones.filter(cellphone => {
        const cellphoneString = `${cellphone.brand} ${cellphone.model} ${cellphone.compatibilities.join(' ')}`
        return cellphoneString.toLowerCase().includes(value.toLowerCase())
      })
      return {...brand, cellphones}
    })
    setFilteredBrands(filteredCellphones)
  }

  return (
    <main className='mainTablePlus'>
      <CellPhoneBrands/>
      <SearchInput
        onChange={(e) => {
          const value = e.target.value
          handleSearch(value)
          setSearch(value)
        }}
        value={search}
        placeholder={'Pesquise um modelo aqui'}/>
      <ScreenProtectors
        screenProtectorsList={filteredBrands.length > 0 ? filteredBrands : brands}
        search={search}
        isEmpty={filteredBrands.length === 0 && search !== ''}
      />
    </main>
  )
}
