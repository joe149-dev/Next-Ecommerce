// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Defaults
const defaultProvider: any = {}

const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    useEffect(() => {
        console.log('AuthProvider')
    }, []);
    const values = {}

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
