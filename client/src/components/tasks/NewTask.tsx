'use client'

import { useState } from 'react'
import { ArrowRight, Check, Send } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { SimpleButton } from '@/components/ui/SimpleButton'
import { repos } from '@/data/mockData'
import type { Page } from '@/types'
import { Workspace } from '../workspace/Workspace'

interface NewTaskProps {
  setPage: (p: Page) => void
}

export function NewTask({ setPage }: NewTaskProps) {
  const [repo, setRepo] = useState('')
  const [desc, setDesc] = useState('')
  const [launched, setLaunched] = useState(false)

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
            <select
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2.5"
            >
              <option value="">Select GitHub repository</option>
              {repos.map((r) => (
                <option key={r.name}>Syntnex/{r.name}</option>
              ))}
              <option>saheb/bhuskhalan-ai</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Branch</span>
            <select className="rounded-lg border border-border bg-background px-3 py-2.5">
              <option>main</option>
              <option>develop</option>
              <option>feature/auth</option>
            </select>
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
            <SimpleButton onClick={() => setLaunched(true)}>
              <Send className="size-4" /> Launch Agent
            </SimpleButton>
          </div>
        </div>
      </Card>
    </div>
  )
}
