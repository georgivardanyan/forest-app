import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IForestStand } from './types'

import { RootState } from '../../app/store'

interface ForestState {
  stands: IForestStand[],
  selectedSpecies: string,
}

const initialState: ForestState = {
  stands: [],
  selectedSpecies: '',
}

export const forestSlice = createSlice({
  name: 'forest',
  initialState,
  reducers: {
    setStands: (state, action: PayloadAction<IForestStand[]>) => {
      state.stands = action.payload
    },
    addStand: (state, action: PayloadAction<IForestStand>) => {
      state.stands = [...state.stands, action.payload]
    },
    setSelectedSpecies: (state, action: PayloadAction<string>) => {
      state.selectedSpecies = action.payload
    }
  },
})

export const { setStands, addStand, setSelectedSpecies } = forestSlice.actions

export const selectStands = (state: RootState) => state.forest.stands
export const selectStandsBySpecies = (state: RootState) => {
  if (!state.forest.selectedSpecies) {
    return state.forest.stands
  } else {
    return state.forest.stands.filter(o => o.main_species === state.forest.selectedSpecies)
  }
}
export const selectSelectedSpecies = (state: RootState) => state.forest.selectedSpecies

export default forestSlice.reducer
