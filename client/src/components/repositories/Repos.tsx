'use client'

import { useState, useEffect } from 'react'
import { Plus, X, GitFork as Github, MoreHorizontal, RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { SimpleButton } from '@/components/ui/SimpleButton'
import { RepositoryService, type Repository } from '@/services/repository.service'

export function Repos() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [modal, setModal] = useState(false)

  const fetchRepositories = async () => {
    try {
      setIsLoading(true)
      const repos = await RepositoryService.getUserRepositories()
      setRepositories(repos)
    } catch (error) {
      console.error('Failed to fetch repositories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncRepositories = async () => {
    try {
      setIsSyncing(true)
      await RepositoryService.syncRepositories()
      await fetchRepositories()
    } catch (error) {
      console.error('Failed to sync repositories:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <>
      <PageHeader
        eyebrow="Source control"
        title="Repositories"
        subtitle="Connected repositories available to Syntnex."
        action={
          <div className="flex gap-2">
            <SimpleButton 
              onClick={syncRepositories} 
              disabled={isSyncing}
              variant="outline"
            >
              <RefreshCw className={`size-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync'}
            </SimpleButton>
            <SimpleButton onClick={() => setModal(true)}>
              <Plus className="size-4" /> Connect Repository
            </SimpleButton>
          </div>
        }
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="mx-auto size-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">Loading repositories...</p>
          </div>
        </div>
      ) : repositories.length === 0 ? (
        <Card className="p-12 text-center">
          <Github className="mx-auto size-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No repositories found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Sync your GitHub repositories to get started
          </p>
          <SimpleButton onClick={syncRepositories} className="mt-6">
            <RefreshCw className="size-4" /> Sync Repositories
          </SimpleButton>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repositories.map((repo) => (
            <Card key={repo.id} className="p-5 hover:border-primary/40">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-secondary">
                    <Github className="size-4" />
                  </div>
                  <div>
                    <h2 className="font-medium">{repo.fullName}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{repo.language}</p>
                  </div>
                </div>
                <MoreHorizontal className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-6 flex gap-5 text-xs text-muted-foreground">
                <span>★ {repo.stars}</span>
                <span>Updated {formatTimeAgo(repo.updatedAt)}</span>
              </div>
              <div className="mt-5 flex gap-4 border-t border-border pt-4 text-xs">
                <span>
                  <strong>0</strong> open tasks
                </span>
                <span>
                  <strong>0</strong> open PRs
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex justify-end">
              <button onClick={() => setModal(false)}>
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
            <h2 className="text-lg font-semibold">Connect repository</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Select a repository to add to your workspace.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {repositories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No repositories available. Sync first.</p>
              ) : (
                repositories.slice(0, 5).map((repo) => (
                  <button
                    key={repo.id}
                    onClick={() => setModal(false)}
                    className="flex items-center gap-3 rounded-lg border border-border p-3 text-left text-sm hover:border-primary"
                  >
                    <Github className="size-4" />
                    {repo.fullName}
                    <Plus className="ml-auto size-4 text-primary" />
                  </button>
                ))
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
