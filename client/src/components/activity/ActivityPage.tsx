import { CheckCircle2, GitPullRequest, TestTube2, Circle, GitFork } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'

export function ActivityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Workspace history"
        title="Activity"
        subtitle="A timeline of everything happening across your workspace."
      />
      <Card className="p-5 md:p-8">
        <div className="flex flex-col gap-7">
          {[
            ['Agent completed task', 'Fix request tracing in API client', '12 minutes ago', CheckCircle2],
            ['Pull request created', 'Fix JWT authentication refresh flow', '28 minutes ago', GitPullRequest],
            ['Tests passed', '24 tests passed across 3 suites', '32 minutes ago', TestTube2],
            ['Repository connected', 'Syntnex/backend-api added to workspace', '2 hours ago', GitFork],
            ['Agent encountered an error', 'Dependency lockfile update needs review', '3 hours ago', Circle],
          ].map(([title, desc, time, Icon]) => (
            <div key={title as string} className="flex gap-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <div className="flex-1 border-b border-border pb-6">
                <div className="flex justify-between gap-2">
                  <p className="font-medium">{title as string}</p>
                  <span className="text-xs text-muted-foreground">{time as string}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{desc as string}</p>
                <p className="mt-2 font-mono text-[11px] text-primary">Syntnex/demo-project</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
