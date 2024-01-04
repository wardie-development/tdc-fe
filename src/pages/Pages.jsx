import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {TablePlus} from "./TablePlus.jsx";
import {Authenticate} from "./Authenticate.jsx";
import {Suggestion} from "./Suggestion.jsx";
import React from "react";
import OrderList from "./OrderList.jsx";

function tablePlusRouteValidation(navigate) {
  const isInAuthenticate = window.location.href.includes('autenticar')
  const token = localStorage.getItem('token')
  
  if (!token && !isInAuthenticate) {
    navigate('/autenticar/')
  } else if (token && isInAuthenticate) {
    navigate('/tabela-plus/')
  }
}

export const Pages = () => {
  const navigate = useNavigate()
  React.useEffect(() => {
    const tablePlusRoutes = ['tabela-plus', 'sugerir', 'autenticar']
    const publicRoutes = ['lista-de-pedidos']
    const isInTablePlus = tablePlusRoutes.some(route => window.location.href.includes(route))
    const isInPublic = publicRoutes.some(route => window.location.href.includes(route))
    if (isInTablePlus) {
      tablePlusRouteValidation(navigate);
      return;
    }
    if (isInPublic) {
      return;
    }
    navigate('/tabela-plus/')
  }, [navigate])

  return (
    <Routes>
      <Route path="/tabela-plus/" element={<TablePlus />} />
      <Route path="/autenticar/" element={<Authenticate />} />
      <Route path="/sugerir/" element={<Suggestion />} />
      <Route path="/lista-de-pedidos/" element={<OrderList />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
