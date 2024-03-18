// ** React Imports
import { useGetMeQuery, useLoginMutation } from '@/services/auth'
import { useGetMenuQuery } from '@/services/menu'
import { createContext, useEffect, useState, ReactNode } from 'react'
import { AuthValuesType, ErrCallbackType, LoginParams, UserDataType } from '../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useRouter } from 'next/router'
import {toast} from "react-toastify";
import { removeToken } from '@/store/apps/auth/token'
import { logout } from '@/store/apps/auth/user'

// ** Defaults
const defaultProvider: AuthValuesType = {
    token: null,
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const [login, result] = useLoginMutation()

    // ** Dispatch
    const dispatch = useDispatch<AppDispatch>();

    // ** Selector **
    const token = useSelector((state: RootState) => state.tokenState);

    // ** States
    const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

    // ** Hooks
    const router = useRouter()
    const {} = useGetMeQuery('')

    const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
        login(params)
    }

    const handleLogout = () => {
        router.push("/")
        toast.success("Success Logout !");
        dispatch(removeToken())
        dispatch(logout())
    }
    
    const values = {
        token: token.token,
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
