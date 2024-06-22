import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    pickUpCoords: [27.5,  83.45], 
    pickUpName: '',
}

const locationSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    changePickUpAddress(state,actions) {
      state.pickUpName =actions.payload
    },
  
  },
})

export const { changePickUpAddress } = locationSlice.actions
export default locationSlice.reducer