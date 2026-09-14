'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { SimpleButton } from '@/components/ui/SimpleButton'
import { TaskTable } from './TaskTable'
import type { Page } from '@/types'
import type { Status } from '@/data/mockData'

interface TasksProps {
  setPage: (p: Page) => void
}

export function Tasks({ setPage }: TasksProps) {
  const [filter, setFilter] = useState<Status | 'All'>('All')

  return (
    <>
      <PageHeader
        eyebrow="Work queue"
        title="Tasks"
        subtitle="Track autonomous work across your repositories."
        action={<SimpleButton onClick={() => setPage('new-task')}><Plus className="size-4" /> New Task</SimpleButton>}
      />
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {(['All', 'Running', 'Completed', 'Waiting for Review', 'Failed'] as const).map((x) => (
          <button
            key={x}
            onClick={() => setFilter(x)}
            className={`rounded-lg px-3 py-2 text-xs ${
              filter === x ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}
          >
            {x}
          </button>
        ))}
      </div>
      <Card>
        <TaskTable setPage={setPage} filter={filter === 'All' ? undefined : filter} />
      </Card>
    </>
  )
}
