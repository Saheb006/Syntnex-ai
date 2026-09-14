import { cn } from '@/lib/utils'
import type { Status } from '@/data/mockData'
import { Loader2, CheckCircle2, Circle } from 'lucide-react'

interface BadgeProps {
  children: React.ReactNode
  tone?: 'green' | 'blue' | 'amber' | 'red' | 'muted'
}

export function Badge({ children, tone = 'muted' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium',
        tone === 'green'
          ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
          : tone === 'blue'
          ? 'border-primary/25 bg-primary/10 text-primary'
          : tone === 'amber'
          ? 'border-amber-500/25 bg-amber-500/10 text-amber-400'
          : tone === 'red'
          ? 'border-red-500/25 bg-red-500/10 text-red-400'
          : 'border-border bg-secondary text-muted-foreground'
      )}
    >
      {children}
    </span>
  )
}

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      tone={
        status === 'Completed'
          ? 'green'
          : status === 'Running'
          ? 'blue'
          : status === 'Failed'
          ? 'red'
          : 'amber'
      }
    >
      {status === 'Running' ? (
        <Loader2 className="size-3 animate-spin" />
      ) : status === 'Completed' ? (
        <CheckCircle2 className="size-3" />
      ) : (
        <Circle className="size-3" />
      )}
      {status}
    </Badge>
  )
}
