import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { SimpleButton } from '@/components/ui/SimpleButton'
import { GitFork as Github } from 'lucide-react'

export function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        subtitle="Configure how Syntnex works for you."
        action={<SimpleButton>Save changes</SimpleButton>}
      />
      <div className="grid gap-6 lg:grid-cols-[210px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          <button className="whitespace-nowrap rounded-lg bg-primary/10 px-3 py-2 text-left text-sm text-primary">
            General
          </button>
          {['Agent', 'GitHub', 'Notifications'].map((x) => (
            <button
              key={x}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary"
            >
              {x}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h2 className="font-medium">General</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span>Workspace name</span>
                <input
                  defaultValue="Syntnex Workspace"
                  className="rounded-lg border border-border bg-background px-3 py-2.5"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Default branch</span>
                <select className="rounded-lg border border-border bg-background px-3 py-2.5">
                  <option>main</option>
                  <option>develop</option>
                </select>
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-medium">Agent configuration</h2>
            <div className="mt-5 flex flex-col gap-3">
              {['Run tests automatically', 'Create pull requests automatically', 'Allow dependency changes'].map(
                (x, i) => (
                  <label
                    key={x}
                    className="flex items-center justify-between border-b border-border pb-3 text-sm"
                  >
                    <span>{x}</span>
                    <input type="checkbox" defaultChecked={i < 2} className="accent-[var(--primary)]" />
                  </label>
                )
              )}
              <label className="flex items-center justify-between pt-2 text-sm">
                <span>Maximum iterations</span>
                <select className="rounded-md border border-border bg-background px-2 py-1.5 font-mono text-xs">
                  <option>5</option>
                  <option>10</option>
                </select>
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium">GitHub</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your GitHub integration and permissions.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Github className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Connected</span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <label className="flex items-center justify-between border-b border-border pb-3 text-sm">
                <span>Auto-create PRs from agent work</span>
                <input type="checkbox" defaultChecked className="accent-[var(--primary)]" />
              </label>
              <label className="flex items-center justify-between border-b border-border pb-3 text-sm">
                <span>Require approval before merging</span>
                <input type="checkbox" defaultChecked className="accent-[var(--primary)]" />
              </label>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
