import { Plus, Square, ListTodo, GitPullRequest, TestTube2, Code2, GitBranch, ChevronRight, Bot, FileCode2, MoreHorizontal } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SimpleButton } from '@/components/ui/SimpleButton'
import type { Page } from '@/types'

interface DashboardProps {
  setPage: (p: Page) => void
}

export function Dashboard({ setPage }: DashboardProps) {
  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Good morning, Developer"
        subtitle="Here's what's happening across your projects."
        action={<SimpleButton onClick={() => setPage('new-task')}><Plus className="size-4" /> New Task</SimpleButton>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Active Tasks', '3', '+2 this week', ListTodo],
          ['Pull Requests', '8', '3 ready to review', GitPullRequest],
          ['Tests Passed', '98.4%', '+4.2% this month', TestTube2],
          ['Code Changes', '1,284', 'lines this week', Code2],
        ].map(([label, value, detail, Icon]) => (
          <Card key={label as string} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{label as string}</span>
              <Icon className="size-4 text-primary" />
            </div>
            <p className="mt-4 text-2xl font-semibold">{value as string}</p>
            <p className="mt-1 text-xs text-muted-foreground">{detail as string}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                <h2 className="font-medium">Syntnex Agent</h2>
                <Badge tone="green">Working</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Fix authentication middleware error</p>
            </div>
            <SimpleButton variant="danger">
              <Square className="size-3 fill-current" /> Stop Agent
            </SimpleButton>
          </div>
          <div className="grid gap-5 p-5 sm:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Repository</p>
              <p className="mt-2 font-mono text-xs">Syntnex/demo-project</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Branch</p>
              <p className="mt-2 flex items-center gap-1 font-mono text-xs">
                <GitBranch className="size-3 text-primary" />
                fix/auth-middleware
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Duration</p>
              <p className="mt-2 font-mono text-xs">12m 34s</p>
            </div>
          </div>
          <div className="border-t border-border bg-secondary/30 p-4">
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-primary" />
              <p className="text-xs font-medium">Agent activity</p>
            </div>
            <div className="mt-3 space-y-2">
              {['Analyzing authentication flow', 'Identified token refresh issue', 'Creating fix', 'Running tests'].map(
                (activity, i) => (
                  <div key={activity} className="flex items-center gap-2 text-xs">
                    <span
                      className={`mt-0.5 grid size-3 shrink-0 place-items-center rounded-full ${
                        i < 2 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {i < 2 ? <div className="size-1 rounded-full bg-current" /> : <div className="size-1.5 rounded-full bg-current animate-pulse" />}
                    </span>
                    {activity}
                  </div>
                )
              )}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-medium">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {[
              { title: 'Task completed', desc: 'Fix request tracing in API client', time: '12m ago' },
              { title: 'PR created', desc: 'Add user authentication flow', time: '28m ago' },
              { title: 'Tests passed', desc: '24 tests passed across 3 suites', time: '32m ago' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Bot className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
          <SimpleButton variant="outline" className="mt-4 w-full" onClick={() => setPage('activity')}>
            View all activity <ChevronRight className="size-3" />
          </SimpleButton>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-medium">Recent Pull Requests</h2>
          <SimpleButton variant="outline" onClick={() => setPage('pulls')}>
            View all <ChevronRight className="size-3" />
          </SimpleButton>
        </div>
        <div className="divide-y divide-border">
          {[
            { id: '#142', title: 'Fix JWT authentication refresh flow', repo: 'Syntnex/demo-project', status: 'Ready for Review' },
            { id: '#141', title: 'Add request tracing to API client', repo: 'Syntnex/backend-api', status: 'Merged' },
            { id: '#139', title: 'Update dependency lockfile', repo: 'saheb/bhuskhalan-ai', status: 'Ready for Review' },
          ].map((pr) => (
            <button
              key={pr.id}
              onClick={() => setPage('diff')}
              className="flex w-full flex-wrap items-center gap-4 p-5 text-left hover:bg-secondary/30"
            >
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <GitPullRequest className="size-4" />
              </div>
              <div className="min-w-[240px] flex-1">
                <p className="font-medium">{pr.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{pr.repo}</p>
              </div>
              <Badge tone={pr.status === 'Merged' ? 'green' : 'blue'}>{pr.status}</Badge>
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </Card>
    </>
  )
}
