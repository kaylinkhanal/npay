import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = { 
   selectedProduct: '',
   cartItems: [],
   wishLists: [],

}

const productSLice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    addToWishlist(state,actions) {
      const isInWishList = state.wishLists.find((item)=>{
        if(item._id == actions.payload._id){
            return item
        }
        })
        if(isInWishList){
        const removedWishList=  state.wishLists.filter((item)=>{
            if(item._id !== actions.payload._id){
                return item
            }
            })
          state.wishLists = removedWishList
        }else{
          state.wishLists.push(actions.payload)
          toast("Item has been added to cart")
        }

    },
    removeFromWishList(state,actions) {
     const existingWishLists = [...state.wishLists]
    const removedwishList = existingWishLists.filter((item)=>{
      if(item._id !==  actions.payload){
        return item
      }
    })
    state.wishLists =removedwishList
    
     },
     addToCart(state,actions) {
      debugger;
      // state.cartItems.push(actions.payload)
      const existingCarts = [...state.cartItems]
      const increasedwishList = existingCarts.map((item)=>{
        if(item._id ===  actions.payload._id){
          item.cartQuantity = item.cartQuantity + 1
          return item
        }
        return item
      })
      
      state.cartItems = increasedwishList
  
     },removeFromCart(state,actions) {
     
     }
  },
})

export const {addToWishlist, removeFromWishList, addToCart,removeFromCart } = productSLice.actions
export default productSLice.reducer