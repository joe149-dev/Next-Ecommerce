import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import tokenReducer from "./apps/auth/token";
import userReducer from "./apps/auth/user";
import basketReducer from "./apps/product/basket";

import { loginApi } from "../services/auth"
import { basketApi } from "../services/basket"
import { paymentApi } from "../services/payment"
import { productApi } from "../services/product"
import { movementApi } from "../services/movement"
import { couponApi } from "../services/coupon"
import { campaignApi } from "../services/campaign"
import { favoriteApi } from "../services/favorite"
import { categoryApi } from "../services/category"

export const store = configureStore({
    reducer: {
        tokenState: tokenReducer,
        userState: userReducer,
        basketState: basketReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [movementApi.reducerPath]: movementApi.reducer,
        [couponApi.reducerPath]: couponApi.reducer,
        [campaignApi.reducerPath]: campaignApi.reducer,
        [favoriteApi.reducerPath]: favoriteApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            loginApi.middleware,
            basketApi.middleware,
            paymentApi.middleware,
            productApi.middleware,
            movementApi.middleware,
            couponApi.middleware,
            campaignApi.middleware,
            favoriteApi.middleware,
            categoryApi.middleware,
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch