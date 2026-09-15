const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface Repository {
  id: string
  githubId: string
  name: string
  fullName: string
  url: string
  defaultBranch: string
  language: string
  stars: number
  updatedAt: string
}

export interface Branch {
  name: string
  commit: string
  protected: boolean
}

export interface RepositoryResponse {
  repositories: Repository[]
}

export class RepositoryService {
  static async getUserRepositories(): Promise<Repository[]> {
    try {
      const response = await fetch(`${API_URL}/api/repositories`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch repositories')
      }

      const data: RepositoryResponse = await response.json()
      return data.repositories
    } catch (error) {
      console.error('Failed to fetch repositories:', error)
      return []
    }
  }

  static async syncRepositories(): Promise<{ count: number }> {
    try {
      const response = await fetch(`${API_URL}/api/repositories/sync`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to sync repositories')
      }

      const data = await response.json()
      return { count: data.count }
    } catch (error) {
      console.error('Failed to sync repositories:', error)
      throw error
    }
  }

  static async getRepositoryBranches(fullName: string): Promise<Branch[]> {
    try {
      const response = await fetch(`${API_URL}/api/repositories/${encodeURIComponent(fullName)}/branches`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch repository branches')
      }

      const data = await response.json()
      return data.branches
    } catch (error) {
      console.error('Failed to fetch repository branches:', error)
      return []
    }
  }
}
