import {CellPhoneBrands} from "./template/CellPhoneBrands.jsx";
import React from "react";
import {getBrandNames, getBrands} from "../integration.js";
import './style/MainTablePlus.css'
import {SearchInput} from "./atoms/SearchInput.jsx";
import {ScreenProtectors} from "./molecules/ScreenProtectors.jsx";
import {useNavigate} from "react-router-dom";
import gifAuthenticate from '../assets/gifAuthenticate.gif'

export const MainTablePlus = () => {
  const [brands, setBrands] = React.useState([])
  const [brandNames, setBrandNames] = React.useState([])
  const [filteredBrands, setFilteredBrands] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [contentIsVisible, setContentIsVisible] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(true)

  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem('token')

    getBrandNames(token).then(response => {
      setBrandNames(response)
      getBrands(token).then(response => {
        setBrands(response.filter(brand => brand.cellphones.length > 0))
        setIsLoading(false)
      }).catch(() => {
        localStorage.removeItem('token')
        navigate('/autenticar/')
      })
    }).catch(() => {
      localStorage.removeItem('token')
      navigate('/autenticar/')
    })
    window.addEventListener('focus', () => {
      setContentIsVisible(true)
    })
    window.addEventListener('blur', () => {
      // setContentIsVisible(false)
    })
  },[])

  const handleSearch = (value) => {
    if (value === '') {
      return setFilteredBrands([])
    }
    
    const lowerValue = value.toLowerCase()

    const filteredBrands = brands.filter(brand => brand.cellphones.some(cellphone => {
      const cellphoneString = `${cellphone.brand} ${cellphone.model} ${cellphone.compatibilities}`
      return cellphoneString.toLowerCase().includes(lowerValue)
    }))
    const filteredCellphones = filteredBrands.map(brand => {
      const cellphones = brand.cellphones.filter(cellphone => {
        const cellphoneString = `${cellphone.brand} ${cellphone.model} ${cellphone.compatibilities}`
        return cellphoneString.toLowerCase().includes(lowerValue)
      })
      return {...brand, cellphones}
    })
    
    // Put first the cellphones that have the search value in the model
    const reorderedBrandsBySearch = filteredCellphones.map(brand => {
      const cellphones = brand.cellphones
      
      const reorderedCellphones = cellphones.sort((a, b) => {
        const aModel = a.model.toLowerCase()
        const bModel = b.model.toLowerCase()
        if (aModel.includes(lowerValue) && !bModel.includes(lowerValue)) {
          return -1
        }
        if (!aModel.includes(lowerValue) && bModel.includes(lowerValue)) {
          return 1
        }
        return 0
      })
      
      return {...brand, cellphones: reorderedCellphones}
    })
    setFilteredBrands(reorderedBrandsBySearch)
  }

  if (!contentIsVisible) {
    return <></>
  }

  if (isLoading) {
    return (
      <main>
        <img src={gifAuthenticate} alt="Gif" className="mainTablePlusLoading"/>
        <p style={{textAlign: "center", fontFamily: "Loja", color: "#cecece"}}>Buscando o melhor para você</p>
      </main>
    )
  }

  return (
    <main className='mainTablePlus'>
      <CellPhoneBrands brandNames={brandNames}/>
      <div className="mainTablePlus__searchBox">
        <SearchInput
          onChange={(e) => {
            const value = e.target.value
            handleSearch(value)
            setSearch(value)
          }}
          value={search}
          placeholder={'Pesquise um modelo aqui'}/>
      </div>
      <ScreenProtectors
        screenProtectorsList={filteredBrands.length > 0 ? filteredBrands : brands}
        search={search}
        isEmpty={filteredBrands.length === 0 && search !== ''}
      />
    </main>
  )
}
