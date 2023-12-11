import logoTdc from "../assets/logo-tdc-2.png";
import React from "react";
import {SearchInput} from "../components/atoms/SearchInput.jsx";
import './styles/Suggestion.css';
import {useNavigate} from "react-router-dom";
import {sendSuggestion} from "../integration.js";

export const Suggestion = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate();
  const inputStyle = {borderColor: "#23a455", borderWidth: 2, width: "calc(100% - 14px)", marginBottom: 10, height: 35, color: "#505652"}
  
  const handleSubmit = (e) => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    e.preventDefault()
    const payload = {
      name: e.target[0].value,
      whatsapp: e.target[1].value,
      suggestion: e.target[2].value
    }
    
    sendSuggestion(token, payload).then(() => {
      navigate('/tabela-plus/')
    }).catch((response) => {
      const isUnauthorized = response.status === 403
      
      if (isUnauthorized) {
        localStorage.removeItem('token')
        navigate('/autenticar/')
      }
    })
    setIsLoading(false)
  }
  return (
    <main className="suggestionPage">
      <div className="suggestionPage__logoBox" onClick={() => {navigate('/tabela-plus/')}}>
        <img src={logoTdc} alt="Logo" />
      </div>
      <p className="suggestionPage__title">
        Tabela de películas compatíveis
      </p>
      <p className="suggestionPage__title">
        [sugestões]
      </p>
      <form className="suggestionPage__form" onSubmit={handleSubmit}>
        <SearchInput onChange={() => {}} placeholder="Seu Nome" isCircle={false} style={inputStyle}/>
        <SearchInput onChange={() => {}} placeholder="Seu WhatsApp" isCircle={false} style={inputStyle}/>
        <SearchInput onChange={() => {}} placeholder="Escreva sua mensagem aqui" isCircle={false} style={{...inputStyle, resize: "vertical",  height: 90}} isTextArea/>
        <button disabled={isLoading} type="submit" className="suggestionPage__formButton">Enviar</button>
      </form>
    </main>
  )
}