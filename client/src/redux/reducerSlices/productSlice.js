import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
   selectedProduct: '',
   cartItems: []
}

const productSLice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    addToCart(state) {
     
    },
   
  },
})

export const { addToCart } = productSLice.actions
export default productSLice.reducer