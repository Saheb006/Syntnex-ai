import { LayoutDashboard, ListTodo, FolderGit2, GitPullRequest, Activity } from 'lucide-react'

export type Status = 'Completed' | 'Running' | 'Failed' | 'Waiting for Review'

export interface Task {
  id: string
  title: string
  repo: string
  status: Status
  updated: string
}

export interface Repository {
  name: string
  owner: string
  language: string
  stars: string
  activity: string
  tasks: number
  prs: number
}

export interface NavItem {
  id: string
  label: string
  icon: any
}

export const tasks: Task[] = [
  { id: '#CF-184', title: 'Fix authentication middleware error', repo: 'Syntnex/demo-project', status: 'Running' as Status, updated: '2m ago' },
  { id: '#CF-183', title: 'Add request tracing to API client', repo: 'Syntnex/backend-api', status: 'Completed' as Status, updated: '34m ago' },
  { id: '#CF-182', title: 'Update dependency lockfile', repo: 'saheb/bhuskhalan-ai', status: 'Waiting for Review' as Status, updated: '1h ago' },
  { id: '#CF-181', title: 'Improve error boundary coverage', repo: 'Syntnex/demo-project', status: 'Failed' as Status, updated: '3h ago' },
]

export const repos: Repository[] = [
  { name: 'demo-project', owner: 'Syntnex', language: 'TypeScript', stars: '1.2k', activity: '2m ago', tasks: 3, prs: 2 },
  { name: 'backend-api', owner: 'Syntnex', language: 'Go', stars: '842', activity: '18m ago', tasks: 1, prs: 1 },
  { name: 'bhuskhalan-ai', owner: 'saheb', language: 'Python', stars: '326', activity: '1h ago', tasks: 2, prs: 0 }
]

export const nav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'repos', label: 'Repositories', icon: FolderGit2 },
  { id: 'pulls', label: 'Pull Requests', icon: GitPullRequest },
  { id: 'activity', label: 'Activity', icon: Activity }
]
