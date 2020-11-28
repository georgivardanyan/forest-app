import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IForestStand } from './types'

import { RootState } from '../../app/store'

interface ForestState {
  stands: IForestStand[],
}

const initialState: ForestState = {
  stands: [],
}

export const forestSlice = createSlice({
  name: 'forest',
  initialState,
  reducers: {
    setStands: (state, action: PayloadAction<IForestStand[]>) => {
      state.stands = action.payload
    },
  },
})

export const { setStands } = forestSlice.actions

export const selectStands = (state: RootState) => state.forest.stands

export default forestSlice.reducer
