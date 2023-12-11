import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {TablePlus} from "./TablePlus.jsx";
import {Authenticate} from "./Authenticate.jsx";
import {Suggestion} from "./Suggestion.jsx";
import React from "react";

export const Pages = () => {
  const navigate = useNavigate()
  React.useEffect(() => {
    const isInAuthenticate = window.location.href.includes('autenticar')
    const token = localStorage.getItem('token')

    if (!token && !isInAuthenticate) {
      navigate('/autenticar/')
    } else if (token && isInAuthenticate) {
      navigate('/tabela-plus/')
    }
  }, [navigate])

  return (
    <Routes>
      <Route path="/tabela-plus/" element={<TablePlus />} />
      <Route path="/autenticar/" element={<Authenticate />} />
      <Route path="/sugerir/" element={<Suggestion />} />
      <Route path="*" element={<Navigate to="/autenticar/" replace />} />
    </Routes>
  )
}
