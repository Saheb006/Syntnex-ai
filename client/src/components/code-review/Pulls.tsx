'use client'

import { useState } from 'react'
import { GitPullRequest, ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Page } from '@/types'

interface PullsProps {
  setPage: (p: Page) => void
}

export function Pulls({ setPage }: PullsProps) {
  const [tab, setTab] = useState('Open')

  return (
    <>
      <PageHeader
        eyebrow="Code review"
        title="Pull Requests"
        subtitle="Review and ship changes created by your agents."
      />
      <div className="mb-4 flex gap-1 rounded-lg bg-secondary p-1">
        {['Open', 'Merged', 'Closed'].map((x) => (
          <button
            key={x}
            onClick={() => setTab(x)}
            className={`rounded-md px-4 py-2 text-xs ${
              tab === x ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {x}
            <span className="ml-2 text-muted-foreground">
              {x === 'Open' ? 3 : x === 'Merged' ? 12 : 4}
            </span>
          </button>
        ))}
      </div>

      <Card className="divide-y divide-border">
        {[
          '#142 Fix JWT authentication refresh flow',
          '#141 Add request tracing to API client',
          '#139 Update dependency lockfile',
        ].map((x, i) => (
          <button
            key={x}
            onClick={() => setPage('diff')}
            className="flex w-full flex-wrap items-center gap-4 p-5 text-left hover:bg-secondary/30"
          >
            <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <GitPullRequest className="size-4" />
            </div>
            <div className="min-w-[240px] flex-1">
              <p className="font-medium">{x}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Syntnex/demo-project · opened {i + 1}h ago by Syntnex Agent
              </p>
            </div>
            <Badge tone={i === 1 ? 'green' : 'blue'}>{i === 1 ? 'Merged' : 'Ready for Review'}</Badge>
            <span className="font-mono text-xs text-emerald-400">24/24 passed</span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </Card>
    </>
  )
}
