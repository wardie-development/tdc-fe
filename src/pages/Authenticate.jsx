import logoTdc from '../assets/logo-tdc.png'
import './styles/Authenticate.css'
import {SearchInput} from "../components/atoms/SearchInput.jsx";
import {authenticate} from "../integration.js";
import {useNavigate} from "react-router-dom";
import React from "react";
import gifAuthenticate from '../assets/gifAuthenticate.gif'
import {Modal} from "../components/atoms/Modal.jsx";


export const Authenticate = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [limitAccessModal, setLimitAccessModal] = React.useState(false)

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    const password = e.target[0].value
    authenticate(password).then(response => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('isTest', String(response.is_test_access))
      navigate('/tabela-plus/')
    }).catch((err) => {
      const responseBody = err.response.data
      if (responseBody.message) {
        const message = responseBody.message
        
        if (message === 'Limite de acessos atingido') {
          setLimitAccessModal(true)
          return
        }
      }
      setHasError(true)
    })
    setIsLoading(false)
  }
  return (
    <main className="authenticationPage">
      {limitAccessModal && (
        <Modal title="Limite de acessos atingido" onClose={() => {setLimitAccessModal(false)}} style={{maxWidth: 500}}>
          <p>Esse acesso já está sendo usado em <span style={{color: "#cc0000"}}>5 dispositivos</span> diferentes. <br/><br/> Entre em contato com o administrador pelo WhatsApp: <br/><span style={{color: "#2359aa", fontWeight: "bold"}}>(75) 9 8164-2302</span></p>
          
          <div style={{display: "flex", justifyContent: "center"}}>
            <a
              style={
                {
                  textAlign: "center",
                  backgroundColor: "#2359aa",
                  padding: "10px 20px",
                  color: "#fff",
                  borderRadius: 5,
                  cursor: "pointer"
                }
              }
              href="https://api.whatsapp.com/send?phone=5575981642302&text=O meu acesso da Tabela Plus atingiu o limite de dispositivos.%0a%0aPodem me ajudar?"
              target="_blank"
            >
              Ou clicando aqui
            </a>
          </div>
        </Modal>
      )}
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
