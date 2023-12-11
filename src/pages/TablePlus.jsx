import './styles/TablePlus.css';
import {Header} from "../components/Header.jsx";
import {MainTablePlus} from "../components/MainTablePlus.jsx";
import {FooterTablePlus} from "../components/FooterTablePlus.jsx";
import {useNavigate} from "react-router-dom";
import React from "react";

export const TablePlus = () => {
  const navigate = useNavigate();
  
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
