interface SimpleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'danger' | 'outline' | 'ghost'
  disabled?: boolean
}

export function SimpleButton({ children, onClick, variant = 'primary', disabled = false }: SimpleButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all disabled:opacity-50 ${
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:brightness-110'
          : variant === 'danger'
          ? 'border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
          : variant === 'outline'
          ? 'border border-border bg-card hover:bg-secondary'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}
