const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface User {
  id: string
  githubId: string
  username: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export class AuthService {
  private static instance: AuthService
  private user: User | null = null
  private listeners: ((user: User | null) => void)[] = []

  private constructor() {
    this.checkAuthStatus()
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  subscribe(listener: (user: User | null) => void) {
    this.listeners.push(listener)
    listener(this.user)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.user))
  }

  async checkAuthStatus() {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        // Check localStorage for username from previous login
        const storedUsername = localStorage.getItem('github_username')
        
        if (data.user && data.accounts && data.accounts.length > 0) {
          const githubAccount = data.accounts.find((acc: any) => acc.provider === 'github')
          this.user = {
            id: data.user.id,
            githubId: githubAccount?.providerAccountId || '',
            username: storedUsername || githubAccount?.providerAccountId || 'User',
          }
        } else {
          this.user = null
        }
      } else {
        this.user = null
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      this.user = null
    }

    this.notifyListeners()
  }

  handleLoginCallback(username: string) {
    localStorage.setItem('github_username', username)
    this.checkAuthStatus()
  }

  async login() {
    window.location.href = `${API_URL}/api/auth/github`
  }

  async logout() {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      localStorage.removeItem('github_username')
      this.user = null
      this.notifyListeners()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  getUser(): User | null {
    return this.user
  }

  isAuthenticated(): boolean {
    return this.user !== null
  }
}

export const authService = AuthService.getInstance()
