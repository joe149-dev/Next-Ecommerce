import { UserDataType } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {} as UserDataType,
    isLogin: false,
    role: ''
}

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUser: (state, action: PayloadAction<UserDataType>) => {
            state.isLogin = true;
            state.user = action.payload
            state.role = action.payload.role
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
            state.role = '';
        },
        logout: (state) => {
            state.isLogin = false;
            state.role = '';
        }
    }
})

export default userSlice.reducer

export const {setUser, setIsLogin, logout} = userSlice.actions