import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        filters: []
    },
    reducers: {
        add(state, action){
            state.filters.push(action.payload)
        },
        remove(state, payload){
            return state.filters.filter((value) => value !== payload.payload)
        }
    },
})

export const { add, remove } = filtersSlice.actions

export const selectFilters = (state) => state.filters

export default filtersSlice.reducer