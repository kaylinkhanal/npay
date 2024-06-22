import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = { 
   selectedProduct: '',
   cartItems: []
}

const productSLice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    addToCart(state,actions) {
     state.cartItems.push(actions.payload)
     toast("Item has been added to cart")
    },
    removeFromCart(state,actions) {
     const existingCartItems = [...state.cartItems]
    const removedCart = existingCartItems.filter((item)=>{
      if(item._id !==  actions.payload){
        return item
      }
    })
    state.cartItems =removedCart
    
     },
  },
})

export const { addToCart,removeFromCart } = productSLice.actions
export default productSLice.reducer