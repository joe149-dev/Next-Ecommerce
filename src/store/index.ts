import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import tokenReducer from "./apps/auth/token";
import userReducer from "./apps/auth/user";
import { loginApi } from "../services/auth"
import { productApi } from "../services/product"

export const store = configureStore({
    reducer: {
        tokenState: tokenReducer,
        userState: userReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            loginApi.middleware,
            productApi.middleware,
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch