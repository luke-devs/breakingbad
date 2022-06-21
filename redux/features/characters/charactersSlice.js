import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getCharacters = createAsyncThunk(
    "characters/getCharacters",
    async (dispatch, getState) => {
        return await fetch("https://breakingbadapi.com/api/characters")
        .then(
            (res) => res.json()
        )
    }
)

const characterSlice = createSlice({
    name: "character",
    initialState: {
        characters: [],
        status: null
    },
    extraReducers: {
        [getCharacters.pending] : (state, action) => {
            state.status = "loading"
        },
        [getCharacters.fulfilled] : (state, action) => {
            state.status = "success"
            state.characters = action.payload
        },
        [getCharacters.rejected] : (state, action) => {
            state.status = "failed"
        }
    }
})

export default characterSlice.reducer;