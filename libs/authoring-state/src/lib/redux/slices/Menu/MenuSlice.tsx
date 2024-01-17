import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { InitialStateInstance, NavTreeInstance } from './Menu.types'
const initialState: InitialStateInstance = {
  navTreeArray: [],
  currentArray: {},
}
export const menuSlice = createSlice({
  name: 'Menu',
  initialState,
  reducers: {
    addMenu: (state, action: PayloadAction<any>) => {
      const newMenuArray: NavTreeInstance[] = [...state.navTreeArray]

      newMenuArray.push(action.payload)
      return {
        ...state,
        navTreeArray: newMenuArray,
        currentArray: action.payload,
      }
    },
    updateInitialState: (state, action: PayloadAction<any>) => {
      return { ...(state || {}), navTreeArray: action.payload }
    },
  },
})
export const { addMenu, updateInitialState } = menuSlice.actions

export default menuSlice.reducer
