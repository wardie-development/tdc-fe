import './styles/TablePlus.css';
import {Header} from "../components/Header.jsx";
import {MainTablePlus} from "../components/MainTablePlus.jsx";
import {FooterTablePlus} from "../components/FooterTablePlus.jsx";

export const TablePlus = () => {
  return (
    <>
      <Header
        title='Tabela de películas compatíveis'
        textButton='PLUS'
      />
      <MainTablePlus/>
      <FooterTablePlus/>
    </>
  )
}
