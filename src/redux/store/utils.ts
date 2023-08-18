import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface IState {
    countries: string[]
}

const initialState: IState = {
    countries: []
}

const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        setCountries: (state, action: PayloadAction<string[]>) => {
            state.countries = action.payload
        }
    }
})

export const { setCountries } = utilsSlice.actions

export default utilsSlice.reducer