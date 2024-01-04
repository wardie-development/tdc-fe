import SimpleInput from "../atoms/SimpleInput.jsx";
import React from "react";

const OrderListTableRow = ({model, onChange, myOrders}) => {
  const [screenProtectors, setScreenProtectors] = React.useState(model.screenProtectors)
  const [cases, setCases] = React.useState(model.cases)
  
  const handleChange = (e, action, setter) => {
    const value = +e.target.value
    if (value >= 0) {
      onChange(model.name, value, action)
      setter(String(value))
    } else {
      setter("0")
    }
  }
  
  React.useEffect(() => {
    const isOnMyOrders = myOrders.some(order => order.name === model.name)
    
    if (!isOnMyOrders) {
      setScreenProtectors("0")
      setCases("0")
    }
  }, [myOrders])
  
  return (
    <tr>
      <td>{model.name}</td>
      <td>
        <SimpleInput
          onChange={(e) => {handleChange(e, "peliculas", setScreenProtectors)}}
          value={screenProtectors || "0"}
          type={"number"}
        />
      </td>
      <td>
        <SimpleInput
          onChange={(e) => {handleChange(e, "capinhas", setCases)}}
          value={cases || "0"}
          type={"number"}
        />
      </td>
    </tr>
  )
}

export default OrderListTableRow