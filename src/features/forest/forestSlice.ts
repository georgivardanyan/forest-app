import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { IForestStand } from './types'

import { RootState } from '../../app/store'

interface ForestState {
  loading: boolean,
  stands: IForestStand[],
  selectedSpecies: string,
}

const initialState: ForestState = {
  loading: false,
  stands: [],
  selectedSpecies: '',
}

export const forestSlice = createSlice({
  name: 'forest',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setStands: (state, action: PayloadAction<IForestStand[]>) => {
      state.stands = action.payload
    },
    setSelectedSpecies: (state, action: PayloadAction<string>) => {
      state.selectedSpecies = action.payload
    },
  },
})

export const {
  setLoading,
  setStands,
  setSelectedSpecies
} = forestSlice.actions

export const selectLoading = (state: RootState) => state.forest.loading

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
