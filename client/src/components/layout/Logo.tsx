import { Code2 } from 'lucide-react'

interface LogoProps {
  onClick?: () => void
}

export function Logo({ onClick }: LogoProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-left">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Code2 className="size-4" />
      </span>
      <span className="text-[15px] font-semibold">
        Syntnex <span className="text-primary">AI</span>
      </span>
    </button>
  )
}
