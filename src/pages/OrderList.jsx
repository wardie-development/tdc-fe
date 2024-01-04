import {Header} from "../components/Header.jsx";
import LabelInput from "../components/molecules/LabelInput.jsx";
import "./styles/OrderList.css";
import SimpleInput from "../components/atoms/SimpleInput.jsx";
import OrderListTableRow from "../components/molecules/OrderListTableRow.jsx";
import React from "react";
import {createOrder, getOrderListModels} from "../integration.js";

const OrderList = () => {
  const [myOrders, setMyOrders] = React.useState([])
  const [models, setModels] = React.useState([])
  const [filteredModels, setFilteredModels] = React.useState([])
  const [name, setName] = React.useState("")
  const [whatsapp, setWhatsapp] = React.useState("")
  const [message, setMessage] = React.useState("")
  
  React.useEffect(() => {
    getOrderListModels().then(res => {
      setModels(res.map(model => ({...model, screenProtectors: 0, cases: 0})))
    })
    
  }, [])
  
  const handleChange = (modelName, value, action) => {
    let modelIndex = -1
    const existingModel = myOrders.find((order, index) => {
      if (order.name === modelName) {
        modelIndex = index
        return true
      }
      return false
    })
    
    if (existingModel) {
      const newOrders = [...myOrders]
      newOrders[modelIndex] = {
        ...existingModel,
        screenProtectors: action === "peliculas" ? value : existingModel.screenProtectors,
        cases: action === "capinhas" ? value : existingModel.cases,
      }
      
      const modelToVerify = newOrders[modelIndex]
      setModels(models.map(model => {
        if (model.name === modelToVerify.name) {
          return modelToVerify
        }
        return model
      }))
      const hasZeroScreenProtectors = modelToVerify.screenProtectors === 0
      const hasZeroCases = modelToVerify.cases === 0
      const isEmpty = hasZeroScreenProtectors && hasZeroCases
      
      if (isEmpty) {
        newOrders.splice(modelIndex, 1)
        setModels(models.map(model => {
          if (model.name === modelName) {
            return {...model, screenProtectors: 0, cases: 0}
          }
          return model
        }))
      }
      
      setMyOrders(newOrders)
    } else {
      setMyOrders([...myOrders, {
        name: modelName,
        screenProtectors: action === "peliculas" ? value : 0,
        cases: action === "capinhas" ? value : 0,
      }])
    }
  }
  
  const removeOrder = (model) => () => {
    setMyOrders(myOrders.filter(order => order.name !== model.name))
  }
  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    if (value.length === 0) return setFilteredModels([])
    const filtered = models.filter(model => model.name.toLowerCase().includes(value))
    setFilteredModels(filtered.sort((a, b) => a.name > b.name ? 1 : -1))
  }
  
  const handleSaveOrder = () => {
    const order = {
      name,
      whatsapp,
      message,
      "cellphone_models": myOrders.map(order => ({
          "cellphone_model": order.name,
          "screen_protectors": order.screenProtectors,
          "cases": order.cases,
      }))
    }
    createOrder(order)
  }
  
  return (
    <div className="orderListPage">
      <Header title={"As melhores soluções para técnicos"}/>
      <main className="orderListPage__content">
        <section>
          <div className="orderListPage__inputGroup">
            <LabelInput label={"Nome completo:"} onChange={(e) => {setName(e.target.value)}}/>
            <LabelInput label={"Whatsapp:"} onChange={(e) => {setWhatsapp(e.target.value)}}/>
          </div>
          <LabelInput label={"Mensagem (opcional):"} onChange={(e) => {setMessage(e.target.value)}}/>
        </section>
        <section className="orderListPage__models">
          <LabelInput label={"Buscar:"} labelPosition="left" style={{width: "auto"}} onChange={handleSearch}/>
          <table className="orderListModelTable">
            <thead>
            <tr>
              <th>Modelo</th>
              <th>Películas</th>
              <th>Capinhas</th>
            </tr>
            </thead>
            <tbody>
            {(filteredModels.length > 0 ? filteredModels : models).map((model, index) => (
              <OrderListTableRow
                key={`${model.name}${index}`}
                myOrders={myOrders}
                model={model}
                onChange={handleChange}
              />
            ))}
            </tbody>
          </table>
          {filteredModels.length > 0 && (
            <p className="orderListPage__searchResults">
              {filteredModels.length} resultado(s) encontrado(s) de um total de {models.length} modelos
            </p>
          )}
        </section>
        <section>
          <h3>Meu pedido</h3>
          <table className="orderListModelTable">
            <thead>
            <tr>
              <th>Modelo</th>
              <th>Películas</th>
              <th>Capinhas</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {myOrders.map((model, index) => (
              <tr key={index}>
                <td>{model.name}</td>
                <td>{model.screenProtectors}</td>
                <td>{model.cases}</td>
                <td>
                  <button onClick={removeOrder(model)}>Remover
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </section>
        <section>
          <button disabled={
            myOrders.length === 0 ||
            name.length === 0 ||
            whatsapp.length === 0
          } onClick={handleSaveOrder}>Salvar pedido</button>
        </section>
      </main>
    </div>
  )
}

export default OrderList