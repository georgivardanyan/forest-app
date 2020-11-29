import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
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
    },
  },
})

export const { setStands, addStand, setSelectedSpecies } = forestSlice.actions

export const selectStands = (state: RootState) => state.forest.stands

const selectSpeciesParam = (_: any, species: string) => species

export const selectStandsBySpecies = createSelector(
  [selectStands, selectSpeciesParam],
  (stands: IForestStand[], species: string) => species ? stands.filter(o => o.main_species === species) : stands,
)

export const selectStandsBySpeciesCount = createSelector(
  selectStandsBySpecies,
  (stands) => stands.length,
)

export const selectSelectedSpecies = (state: RootState) => state.forest.selectedSpecies

export default forestSlice.reducer
