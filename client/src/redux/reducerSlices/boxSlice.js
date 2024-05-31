import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    backgroundColor: 'red', 
    right: 0,
    width: 50,
    height: 50,
    top: 0,
    borderRadius: '0%'
}

const boxSlice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    changeHeight(state) {
      if(state.borderRadius === '50%'){
        const newHeight = state.height + 5
        state.width = newHeight
        state.height = newHeight
      }else{
        state.height=state.height+5
      }

    },
    changeWidth(state) {
      if(state.borderRadius === '50%'){
        const newWidth = state.width + 5
        state.width = newWidth
        state.height = newWidth
      }else{
        state.width=state.width + 5
      }
    },
    changeShape(state) {
      state.borderRadius = '50%'
      state.width=state.height
    },
    changeBackgroundColor(state,actions) {
      state.backgroundColor = actions.payload
    },
    shiftPosition(state,actions) {
     const {value, type} = actions.payload
     if(type === 'horizontal'){
      state.top=0
      state.right = value
     }else{
      state.right =0
      state.top = value
     }
    },
  },
})

export const { changeHeight, changeShape,shiftPosition, changeWidth,changeBackgroundColor } = boxSlice.actions
export default boxSlice.reducer