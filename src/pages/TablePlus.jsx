import './styles/TablePlus.css';
import {Header} from "../components/Header.jsx";
import {MainTablePlus} from "../components/MainTablePlus.jsx";
import {FooterTablePlus} from "../components/FooterTablePlus.jsx";
import {useNavigate} from "react-router-dom";
import React from "react";
import {getNewCellPhones} from "../integration.js";
import {Modal} from "../components/atoms/Modal.jsx";

export const TablePlus = () => {
  const navigate = useNavigate();
  const [newCellPhones, setNewCellPhones] = React.useState([])

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    getNewCellPhones(token).then(response => setNewCellPhones(response)).catch(() => {
      localStorage.removeItem('token')
      navigate('/autenticar/')
    })
  }, [navigate])

  return (
    <>
      {newCellPhones.length > 0 && (
        <Modal
          onClose={() => {
          setNewCellPhones([])
        }}
          title='Novos modelos adicionados'
        >
          <ul className='newCellPhoneList'>
            {newCellPhones.map(cellphone => {
              return (
                <li
                  className='newCellPhoneList__item'
                  key={cellphone.id}
                >
                  <p><b>{cellphone.model}</b>  – {cellphone.compatibilities.join(' – ')}</p>
                </li>
              )
            })}
          </ul>
        </Modal>)
      }
      <Header
        title='Tabela de películas compatíveis'
        textButton='PLUS'
      />
      <MainTablePlus/>
      <FooterTablePlus/>
    </>
  )
}
