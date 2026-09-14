import { Check, FolderGit2, GitBranch, FileCode2, Sparkles, ChevronRight, MoreHorizontal } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SimpleButton } from '@/components/ui/SimpleButton'
import type { Page } from '@/types'

interface DiffProps {
  setPage: (p: Page) => void
}

export function Diff({ setPage }: DiffProps) {
  return (
    <>
      <PageHeader
        eyebrow="Code review"
        title="Review Changes"
        subtitle="Inspect the agent's work before creating a pull request."
        action={
          <div className="flex gap-2">
            <SimpleButton variant="outline">Reject</SimpleButton>
            <SimpleButton variant="outline">Request Changes</SimpleButton>
            <SimpleButton onClick={() => setPage('pulls')}>
              <Check className="size-4" /> Approve & Create PR
            </SimpleButton>
          </div>
        }
      />
      <div className="mb-5 flex flex-wrap gap-3">
        <Badge>
          <FolderGit2 className="size-3" /> Syntnex/demo-project
        </Badge>
        <Badge>
          <GitBranch className="size-3" /> fix/auth-middleware
        </Badge>
        <Badge tone="blue">4 files changed</Badge>
        <Badge tone="green">+87 / -32</Badge>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_330px]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <FileCode2 className="size-4 text-primary" />
              <span className="font-mono text-sm">src/middleware/auth.js</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">+14 -8</span>
          </div>
          <div className="overflow-x-auto bg-[#090c10] p-4 font-mono text-xs leading-6">
            {[
              '@@ -12,8 +12,14 @@ authMiddleware',
              '  const accessToken = getToken(req.headers)',
              '  const refreshToken = getRefreshToken(req)',
              '',
              '- if (!accessToken) return unauthorized()',
              '+ if (!accessToken) {',
              '+   return await refreshSession(req, res, next)',
              '+ }',
              '',
              '  try {',
              '    await verifyToken(accessToken)',
              '+   return next()',
              '  } catch (error) {',
              '-   return res.status(401).end()',
              '+   return handleAuthError(error, req, res, next)',
            ].map((l, i) => (
              <div
                key={i}
                className={
                  l.startsWith('+')
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : l.startsWith('-')
                    ? 'bg-red-500/10 text-red-300'
                    : 'text-muted-foreground'
                }
              >
                <span className="mr-4 text-slate-600">{String(i + 12).padStart(3, ' ')}</span>
                {l}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h2 className="font-medium">AI Summary</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            This change fixes the JWT authentication refresh flow by implementing proper token refresh
            logic when access tokens expire. The agent added a refreshSession function call and improved
            error handling.
          </p>
          <div className="mt-5 space-y-3">
            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs font-medium">Risk Assessment</p>
              <p className="mt-1 text-xs text-muted-foreground">Low risk - focused on auth flow</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs font-medium">Test Coverage</p>
              <p className="mt-1 text-xs text-muted-foreground">24/24 tests passed</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs font-medium">Security Review</p>
              <p className="mt-1 text-xs text-muted-foreground">No security concerns detected</p>
            </div>
          </div>
          <SimpleButton variant="outline" className="mt-5 w-full" onClick={() => setPage('pulls')}>
            View Pull Request <ChevronRight className="size-3" />
          </SimpleButton>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-medium">All Changes</h2>
          <div className="flex gap-2">
            <button className="rounded px-3 py-1 text-xs bg-primary/10 text-primary">4 files</button>
            <button className="rounded px-3 py-1 text-xs text-muted-foreground">+87 lines</button>
            <button className="rounded px-3 py-1 text-xs text-muted-foreground">-32 lines</button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {[
            { file: 'src/middleware/auth.js', changes: '+14 -8', status: 'modified' },
            { file: 'src/middleware/session.js', changes: '+8 -2', status: 'modified' },
            { file: 'tests/auth.test.js', changes: '+12 -0', status: 'added' },
            { file: 'README.md', changes: '+3 -1', status: 'modified' },
          ].map((item) => (
            <button
              key={item.file}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <FileCode2 className="size-4 text-muted-foreground" />
                <span className="font-mono text-sm">{item.file}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground">{item.changes}</span>
                <Badge tone={item.status === 'added' ? 'green' : 'blue'}>{item.status}</Badge>
                <MoreHorizontal className="size-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </Card>
    </>
  )
}
