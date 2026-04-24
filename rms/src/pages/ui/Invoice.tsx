import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

const Invoice = () => {

    const cart = useSelector((state:RootState)=>state.cart.items)
    const selectTable = useSelector((state:RootState)=>state.table.selectedTable)
  return (
    <div>
      
    </div>
  )
}

export default Invoice
