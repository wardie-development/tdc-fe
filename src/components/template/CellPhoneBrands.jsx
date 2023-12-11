import React from "react";
import {getBrandNames} from "../../integration.js";
import './style/CellPhoneBrands.css'
import {useNavigate} from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

export const CellPhoneBrands = () => {
  const navigate = useNavigate();
  const [brandNames, setBrandNames] = React.useState([])

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    getBrandNames(token).then(response => setBrandNames(response)).catch(() => {
      localStorage.removeItem('token')
      navigate('/autenticar/')
    })
  },[])

  const scrollToSection = (sectionName) => {
    scroll.scrollTo(document.getElementById(`Películas para ${sectionName}`).offsetTop - 10, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  return (
    <section className='cellPhoneBrands'>
      <ul className='cellPhoneBrands__list listCompatibilities'>
        {brandNames.map((brandName, index) => (
          <li className='listBrands__item itemBrands' key={`brandName-${index}`} onClick={() => scrollToSection(brandName.name)}>
            <p className='itemBrands__name'>{brandName.name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

