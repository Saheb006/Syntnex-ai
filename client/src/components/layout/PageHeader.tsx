import { ChevronLeft } from 'lucide-react'
import { SimpleButton } from '@/components/ui/SimpleButton'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function PageHeader({ eyebrow, title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-2 font-mono text-[10px] uppercase tracking-[.22em] text-primary">{eyebrow}</p>}
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        {title === 'Good morning, Developer' && (
          <SimpleButton variant="outline" onClick={() => window.location.assign('/')}>
            <ChevronLeft className="size-4" /> Back to Home
          </SimpleButton>
        )}
        {action}
      </div>
    </div>
  )
}
