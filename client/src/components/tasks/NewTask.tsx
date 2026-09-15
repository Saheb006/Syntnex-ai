'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Check, Send, Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { SimpleButton } from '@/components/ui/SimpleButton'
import { RepositoryService, type Repository, type Branch } from '@/services/repository.service'
import type { Page } from '@/types'
import { Workspace } from '../workspace/Workspace'

interface NewTaskProps {
  setPage: (p: Page) => void
}

export function NewTask({ setPage }: NewTaskProps) {
  const [repo, setRepo] = useState('')
  const [branch, setBranch] = useState('')
  const [desc, setDesc] = useState('')
  const [launched, setLaunched] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoadingRepos, setIsLoadingRepos] = useState(true)
  const [isLoadingBranches, setIsLoadingBranches] = useState(false)

  useEffect(() => {
    fetchRepositories()
  }, [])

  const fetchRepositories = async () => {
    try {
      setIsLoadingRepos(true)
      const repos = await RepositoryService.getUserRepositories()
      setRepositories(repos)
    } catch (error) {
      console.error('Failed to fetch repositories:', error)
    } finally {
      setIsLoadingRepos(false)
    }
  }

  const fetchBranches = async (fullName: string) => {
    if (!fullName) {
      setBranches([])
      setBranch('')
      return
    }

    try {
      setIsLoadingBranches(true)
      const branchList = await RepositoryService.getRepositoryBranches(fullName)
      setBranches(branchList)
      // Set default branch to the first one or main if available
      if (branchList.length > 0) {
        const mainBranch = branchList.find(b => b.name === 'main') || branchList[0]
        setBranch(mainBranch.name)
      }
    } catch (error) {
      console.error('Failed to fetch branches:', error)
      setBranches([])
    } finally {
      setIsLoadingBranches(false)
    }
  }

  const handleRepoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRepo = e.target.value
    setRepo(selectedRepo)
    fetchBranches(selectedRepo)
  }

  if (launched) return <Workspace setPage={setPage} />

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Agent task"
        title="Create New Task"
        subtitle="Give Syntnex enough context to make the right change."
      />
      <Card className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Repository</span>
            {isLoadingRepos ? (
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading repositories...</span>
              </div>
            ) : (
              <select
                value={repo}
                onChange={handleRepoChange}
                className="rounded-lg border border-border bg-background px-3 py-2.5"
              >
                <option value="">Select GitHub repository</option>
                {repositories.map((r) => (
                  <option key={r.id} value={r.fullName}>
                    {r.fullName}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Branch</span>
            {!repo ? (
              <div className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
                Select a repository first
              </div>
            ) : isLoadingBranches ? (
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading branches...</span>
              </div>
            ) : branches.length === 0 ? (
              <div className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
                No branches found
              </div>
            ) : (
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2.5"
              >
                {branches.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Task Description</span>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={6}
              placeholder="Describe what you want Syntnex AI to build or fix..."
              className="resize-none rounded-lg border border-border bg-background px-3 py-3 leading-6 placeholder:text-muted-foreground/60"
            />
            <span className="text-xs text-muted-foreground">
              Example: Fix the JWT authentication middleware. Users are being logged out randomly when refreshing the dashboard.
            </span>
          </label>

          <div>
            <p className="mb-3 text-sm font-medium">Task Type</p>
            <div className="flex flex-wrap gap-2">
              {['Bug Fix', 'New Feature', 'Refactoring', 'Testing', 'Documentation'].map((x) => (
                <button
                  key={x}
                  className={`rounded-lg border px-3 py-2 text-xs ${
                    x === 'Bug Fix' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <SimpleButton variant="outline" onClick={() => setPage('tasks')}>
              Cancel
            </SimpleButton>
            <SimpleButton onClick={() => setLaunched(true)} disabled={!repo || !branch || !desc}>
              <Send className="size-4" /> Launch Agent
            </SimpleButton>
          </div>
        </div>
      </Card>
    </div>
  )
}
