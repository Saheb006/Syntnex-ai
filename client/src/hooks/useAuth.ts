import { useState, useEffect } from 'react'
import { authService, type User } from '@/services/auth.service'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.subscribe((currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const login = () => authService.login()
  const logout = () => authService.logout()
  const isAuthenticated = user !== null

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}
