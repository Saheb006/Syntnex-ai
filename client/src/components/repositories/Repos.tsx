'use client'

import { useState } from 'react'
import { Plus, X, GitFork as Github, MoreHorizontal } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { SimpleButton } from '@/components/ui/SimpleButton'
import { repos } from '@/data/mockData'

export function Repos() {
  const [modal, setModal] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Source control"
        title="Repositories"
        subtitle="Connected repositories available to Syntnex."
        action={<SimpleButton onClick={() => setModal(true)}><Plus className="size-4" /> Connect Repository</SimpleButton>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {repos.map((r) => (
          <Card key={r.name} className="p-5 hover:border-primary/40">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-secondary">
                  <Github className="size-4" />
                </div>
                <div>
                  <h2 className="font-medium">{r.owner}/{r.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{r.language}</p>
                </div>
              </div>
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </div>
            <div className="mt-6 flex gap-5 text-xs text-muted-foreground">
              <span>★ {r.stars}</span>
              <span>Updated {r.activity}</span>
            </div>
            <div className="mt-5 flex gap-4 border-t border-border pt-4 text-xs">
              <span>
                <strong>{r.tasks}</strong> open tasks
              </span>
              <span>
                <strong>{r.prs}</strong> open PRs
              </span>
            </div>
          </Card>
        ))}
      </div>

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
              {['Syntnex/frontend-kit', 'acme/payments-service', 'saheb/experiments'].map((x) => (
                <button
                  key={x}
                  onClick={() => setModal(false)}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 text-left text-sm hover:border-primary"
                >
                  <Github className="size-4" />
                  {x}
                  <Plus className="ml-auto size-4 text-primary" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
