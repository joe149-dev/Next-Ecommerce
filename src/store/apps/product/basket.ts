import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    basket: []
}

export const basketSlice = createSlice({
    initialState,
    name: 'basket',
    reducers: {
        setBasket: (state, action: PayloadAction<[]>) => {
            console.log('setBasket payload >> ', action.payload);
            state.basket = action.payload
        }
    }
})

export default basketSlice.reducer

export const {setBasket} = basketSlice.actions