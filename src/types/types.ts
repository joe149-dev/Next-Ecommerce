export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
    email: string
    password: string
    rememberMe?: boolean
}

export type UserDataType = {
    id: number
    role: string
    email: string
    name: string
    username: string
    password: string
    avatar?: string | null
}

export type AuthValuesType = {
    token: string | null
    loading: boolean
    logout: () => void
    user: UserDataType | null
    setLoading: (value: boolean) => void
    setUser: (value: UserDataType | null) => void
    login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
