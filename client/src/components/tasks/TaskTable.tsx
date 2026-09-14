import { tasks, type Status } from '@/data/mockData'
import { StatusBadge } from '@/components/ui/Badge'
import type { Page } from '@/types'

interface TaskTableProps {
  setPage: (p: Page) => void
  filter?: Status
}

export function TaskTable({ setPage, filter }: TaskTableProps) {
  const shown = filter ? tasks.filter((t) => t.status === filter) : tasks

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-secondary/40 text-[11px] uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-5 py-3 font-medium">Task</th>
            <th className="px-5 py-3 font-medium">Repository</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {shown.map((t) => (
            <tr key={t.id} className="hover:bg-secondary/30">
              <td className="px-5 py-4">
                <button
                  onClick={() => setPage(t.status === 'Running' ? 'workspace' : 'diff')}
                  className="text-left font-medium hover:text-primary"
                >
                  {t.title}
                  <span className="ml-2 font-mono text-[10px] text-muted-foreground">{t.id}</span>
                </button>
              </td>
              <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{t.repo}</td>
              <td className="px-5 py-4">
                <StatusBadge status={t.status} />
              </td>
              <td className="px-5 py-4 text-xs text-muted-foreground">{t.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
