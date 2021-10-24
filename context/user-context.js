import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(undefined)

export function UserProvider({ children }) {
  const [user, setUser] = useState({})
  useEffect(() => {
    axios.get('/api/get-user-data')
      .then(res => setUser(res.data))
  }, [])
  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context)
    throw new Error('useUser must be used inside a `UserProvider`')

  return context
}