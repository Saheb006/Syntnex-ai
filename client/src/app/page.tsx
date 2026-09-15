'use client'

import { useState, useEffect } from 'react'
import { Landing } from '@/components/landing/Landing'
import { Shell } from '@/components/layout/Shell'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { Tasks } from '@/components/tasks/Tasks'
import { NewTask } from '@/components/tasks/NewTask'
import { Workspace } from '@/components/workspace/Workspace'
import { Diff } from '@/components/code-review/Diff'
import { Pulls } from '@/components/code-review/Pulls'
import { Repos } from '@/components/repositories/Repos'
import { ActivityPage } from '@/components/activity/ActivityPage'
import { SettingsPage } from '@/components/settings/SettingsPage'
import { authService } from '@/services/auth.service'
import type { Page } from '@/types'

export default function Page() {
  const [page, setPage] = useState<Page>('landing')

  useEffect(() => {
    // Check for GitHub callback parameters from URL
    const urlParams = new URLSearchParams(window.location.search)
    const username = urlParams.get('username')
    if (username) {
      authService.handleLoginCallback(username)
      // Clear the URL parameters
      window.history.replaceState({}, '', window.location.pathname)
      setPage('dashboard')
    }
  }, [])

  if (page === 'landing') {
    return <Landing start={() => setPage('dashboard')} />
  }

  const content =
    page === 'dashboard' ? (
      <Dashboard setPage={setPage} />
    ) : page === 'tasks' ? (
      <Tasks setPage={setPage} />
    ) : page === 'new-task' ? (
      <NewTask setPage={setPage} />
    ) : page === 'workspace' ? (
      <Workspace setPage={setPage} />
    ) : page === 'diff' ? (
      <Diff setPage={setPage} />
    ) : page === 'pulls' ? (
      <Pulls setPage={setPage} />
    ) : page === 'repos' ? (
      <Repos />
    ) : page === 'activity' ? (
      <ActivityPage />
    ) : (
      <SettingsPage />
    )

  return <Shell page={page} setPage={setPage}>{content}</Shell>
}
