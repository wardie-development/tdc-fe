import {Header} from "../components/Header.jsx";
import LabelInput from "../components/molecules/LabelInput.jsx";
import "./styles/OrderList.css";
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
            <LabelInput label={"Nome completo:"} onChange={(e) => {setName(e.target.value)}} labelStyle={{color: "#616581", fontWeight: 500}}/>
            <LabelInput label={"Whatsapp:"} onChange={(e) => {setWhatsapp(e.target.value)}} labelStyle={{color: "#616581", fontWeight: 500}}/>
          </div>
          <LabelInput label={"Mensagem (opcional):"} onChange={(e) => {setMessage(e.target.value)}} labelStyle={{color: "#616581", fontWeight: 500}}/>
        </section>
        <section className="orderListPage__models">
          <LabelInput label={"Buscar:"} labelPosition="left" style={{width: "auto"}} onChange={handleSearch} labelStyle={{color: "#616581"}}/>
          <div className="orderListModelTable__box">
            <table className="orderListModelTable">
              <thead className="orderListModelTableHead">
                <tr>
                  <th className="orderListTableHeadCell">Modelo</th>
                  <th className="orderListTableHeadCell">Películas</th>
                  <th className="orderListTableHeadCell">Capinhas</th>
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
          </div>
          {filteredModels.length > 0 && (
            <p className="orderListPage__searchResults">
              {filteredModels.length} resultado(s) encontrado(s) de um total de {models.length} modelos
            </p>
          )}
        </section>
        <section className="myOrders">
          <h3 className="myOrders__title">Meu pedido</h3>
          {myOrders.length > 0 ? (
            <table className="orderListModelTable">
              <thead>
              <tr>
                <th style={{color: "#616581", fontWeight: 500, textAlign: "left", padding: "5px 10px"}}>Modelo</th>
                <th style={{color: "#616581", fontWeight: 500, textAlign: "left", padding: "5px 10px"}}>Películas</th>
                <th style={{color: "#616581", fontWeight: 500, textAlign: "left", padding: "5px 10px"}}>Capinhas</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {myOrders.map((model, index) => (
                <tr key={index} className="myOrdersTableRow">
                  <td className="myOrdersTableCell">{model.name}</td>
                  <td className="myOrdersTableCell">{model.screenProtectors}</td>
                  <td className="myOrdersTableCell">{model.cases}</td>
                  <td className="myOrdersTableCell">
                    <p onClick={removeOrder(model)} className="removerMyOrderButton">X
                    </p>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          ) : (
            <p className="myOrders__notFoundText">Não foram adicionados itens</p>
          )}
        </section>
        <section>
          <button disabled={
            myOrders.length === 0 ||
            name.length === 0 ||
            whatsapp.length === 0
          } onClick={handleSaveOrder} className="saveOrderButton">Salvar pedido</button>
        </section>
      </main>
    </div>
  )
}

export default OrderList