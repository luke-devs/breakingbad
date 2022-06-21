import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        filters_bb: [1,2,3,4,5],
        filters_bcs: [1,2,3,4,5]
    },
    reducers: {
        addBB(state, { payload }){
            state.filters_bb.push(payload)
        },
        removeBB(state, { payload }){
            state.filters_bb = state.filters_bb.filter(item => item !== payload)
        },
        addBCS(state, { payload }){
            state.filters_bcs.push(payload)
        },
        removeBCS(state, { payload }){
            state.filters_bcs = state.filters_bcs.filter(item => item !== payload)
        },
    },
})

export const { addBB, removeBB, addBCS, removeBCS } = filtersSlice.actions

export default filtersSlice.reducer