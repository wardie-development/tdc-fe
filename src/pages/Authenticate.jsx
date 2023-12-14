import logoTdc from '../assets/logo-tdc.png'
import './styles/Authenticate.css'
import {SearchInput} from "../components/atoms/SearchInput.jsx";
import {authenticate} from "../integration.js";
import {useNavigate} from "react-router-dom";
import React from "react";
import gifAuthenticate from '../assets/gifAuthenticate.gif'


export const Authenticate = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    const password = e.target[0].value
    authenticate(password).then(response => {
      localStorage.setItem('token', response.token)
      navigate('/tabela-plus/')
    }).catch(() => setHasError(true))
    setIsLoading(false)
  }
  return (
    <main className="authenticationPage">
      <form onSubmit={handleSubmit} className="authenticationForm">
        <div className="authenticationForm__logoBox">
          <img src={logoTdc} alt="Logo" />
        </div>
        <p className="authenticationForm__title" style={{marginBottom: hasError ? 0 : 20}}>TABELA DE PELÍCULAS PLUS</p>
        {hasError && <p className="authenticationForm__errorMessage">Senha inválida</p>}
        <div className="authenticationForm__inputGroup">
          <SearchInput isCircle={false} onChange={() => {setHasError(false)}} placeholder="Senha" type="password" style={{width: "calc(100% - 14px)"}}/>
          <button type="submit" disabled={isLoading} className="authenticationForm__loginButton">Entrar</button>
        </div>
        <img className='authenticationForm__gif' src={gifAuthenticate} alt="Gif" />
      </form>
      <p className="authenticationForm__authorMessage">© TDC Soluções</p>
    </main>
  )
}
