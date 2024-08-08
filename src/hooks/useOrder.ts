import { useState } from "react";
import type { MenuItem, OrderItem } from "../types";


export default function useOrder(){
  const [order, setOrder]= useState<OrderItem[]>([])
  const [tip, setTip]= useState(0)
  
  const addItem = (item: MenuItem) => {
    /*Funcion que encuentra que si tiene el mismo id 
    si existe solo aumenta la cantidad del producto y lo demas se queda igual
    si no existe se crea un nuevo item con todo lo anterior mas lo que se acaba de agregar*/
    const itemExist = order.find(orderItem => orderItem.id=== item.id)
    if(itemExist){
      const updateOrder = order.map(orderItem => orderItem.id === item.id?
        {...orderItem, quantity: orderItem.quantity +1} :
        orderItem
      )
      setOrder(updateOrder)
    }else {
      const newItem ={...item, quantity: 1}
      setOrder([...order, newItem])
    }


  }

  const removeItem = (id: MenuItem['id']) => {
    setOrder(order.filter(item => item.id !== id))
    
  }

  const placeOrder = () => {
   setOrder([])
   setTip(0)
  }
  

  return{
    order,
    tip,
    setTip,
    addItem,
    removeItem,
    placeOrder
  }

}