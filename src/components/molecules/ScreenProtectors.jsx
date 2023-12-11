import PropTypes from "prop-types";
import {CompatibilityBrands} from "../atoms/CompatibilityBrands.jsx";
import {CompatibilityBrandsTitle} from "../atoms/CompatibilityBrandsTitle.jsx";
import './styles/ScreenProtectors.css'


export const ScreenProtectors = ({screenProtectorsList, search, isEmpty = false}) => {
  if (isEmpty) {
    return (
      <section className="screenProtectors">
        <p className="screenProtectors__empty">Sem resultados</p>
      </section>
    )
  }
  return (
    <section className="screenProtectors">
      <ul className="screenProtectors__list listCompatibilities">
        {screenProtectorsList.map((screenProtector, index) => (
          <li
            className="listCompatibilities__item"
            key={`screenProtector-${index}`}
            id={screenProtector.title}
            style={{borderColor: `${screenProtector.color}77`}}
          >
            <CompatibilityBrandsTitle screenProtector={screenProtector}/>
            <CompatibilityBrands screenProtector={screenProtector} search={search}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

ScreenProtectors.propTypes = {
  screenProtectorsList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      cellphones: PropTypes.arrayOf(
        PropTypes.shape({
          brand: PropTypes.string.isRequired,
          model: PropTypes.string.isRequired,
          compatibilities: PropTypes.arrayOf(PropTypes.string).isRequired
        })
      ).isRequired
    })
  ).isRequired,
  search: PropTypes.string.isRequired,
  isEmpty: PropTypes.bool
}
