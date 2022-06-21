import { configureStore } from '@reduxjs/toolkit'
import charactersReduce from "../features/characters/charactersSlice"
import filtersReduce from "../features/filters/filtersSlice"

export const Store = configureStore({
    reducer: {
      characters: charactersReduce,
      filters: filtersReduce,
    }
  })