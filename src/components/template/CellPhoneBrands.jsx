import React from "react";
import './style/CellPhoneBrands.css'
import { animateScroll as scroll } from "react-scroll";

export const CellPhoneBrands = ({brandNames}) => {
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
        <li className="listBrands__item itemBrands itemBrands__shortcut">
          ATALHOS:
        </li>
        {brandNames.map((brandName, index) => (
          <li className='listBrands__item itemBrands' key={`brandName-${index}`} onClick={() => scrollToSection(brandName.name)}>
            <p className='itemBrands__name'>{brandName.name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

