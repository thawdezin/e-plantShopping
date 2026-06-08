import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriterecipes: [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const recipe = action.payload
      const index = state.favoriterecipes.findIndex(
        item => item.idFood === recipe.idFood
      )
      if (index >= 0) {
        state.favoriterecipes.splice(index, 1)
      } else {
        state.favoriterecipes.push(recipe)
      }
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
