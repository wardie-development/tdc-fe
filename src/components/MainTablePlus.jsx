import {CellPhoneBrands} from "./template/CellPhoneBrands.jsx";
import React from "react";
import {getBrandNames, getBrands} from "../integration.js";
import './style/MainTablePlus.css'
import {SearchInput} from "./atoms/SearchInput.jsx";
import {ScreenProtectors} from "./molecules/ScreenProtectors.jsx";
import {useNavigate} from "react-router-dom";
import gifAuthenticate from '../assets/gifAuthenticate.gif'
import {verifyIsTestAccess} from "../pages/utils.js";

export const MainTablePlus = () => {
  const [brands, setBrands] = React.useState([])
  const [brandNames, setBrandNames] = React.useState([])
  const [filteredBrands, setFilteredBrands] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [contentIsVisible, setContentIsVisible] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isTestAccess, setIsTestAccess] = React.useState(false)

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
      setIsTestAccess(verifyIsTestAccess())
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
      <section className="mainTablePlus__searchBox">
        <SearchInput
          onChange={(e) => {
            const value = e.target.value
            handleSearch(value)
            setSearch(value)
          }}
          value={search}
          placeholder={'Pesquise um modelo aqui'}
          includeCleaner
          onClean={() => {
            setSearch('')
            setFilteredBrands([])
          }}
          enterKeyHint="search"
        />
      </section>
      {isTestAccess && (
        <section className="mainTablePlus__testSection">
          <div className="mainTablePlus__button">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C4.34315 1 3 2.34315 3 4V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V8.82843C21 8.03278 20.6839 7.26972 20.1213 6.70711L15.2929 1.87868C14.7303 1.31607 13.9672 1 13.1716 1H6ZM5 4C5 3.44772 5.44772 3 6 3H12V8C12 9.10457 12.8954 10 14 10H19V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V4ZM18.5858 8L14 3.41421V8H18.5858Z" fill="#FFFFFF"/>
            </svg>
            <a
              className="mainTablePlus__requestFullAccess"
              href="https://api.whatsapp.com/send?phone=5575981642302&text=Eu quero a versão completa da Tabela Plus!"
              target="_blank"
            >
              [ eu quero a versão completa ]
            </a>
          </div>
        </section>
      )}
      <ScreenProtectors
        screenProtectorsList={filteredBrands.length > 0 ? filteredBrands : brands}
        search={search}
        isEmpty={filteredBrands.length === 0 && search !== ''}
      />
    </main>
  )
}
