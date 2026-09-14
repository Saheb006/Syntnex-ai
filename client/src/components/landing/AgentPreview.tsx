import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function AgentPreview() {
  return (
    <div id="workflow" className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-mono text-xs text-muted-foreground">agent / demo-project</span>
        <Badge tone="green">Working</Badge>
      </div>
      <div className="grid min-h-[370px] grid-cols-[.75fr_1.25fr]">
        <div className="border-r border-border bg-background/40 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Agent activity</p>
          {['Repository analyzed', 'Dependencies identified', 'Plan created', 'Editing middleware', 'Running tests'].map(
            (x, i) => (
              <div key={x} className="mt-5 flex items-center gap-2 text-xs">
                <span
                  className={`grid size-4 place-items-center rounded-full ${
                    i < 3 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-primary/15 text-primary'
                  }`}
                >
                  {i < 3 ? <Check className="size-3" /> : <span className="size-1.5 rounded-full bg-current" />}
                </span>
                {x}
              </div>
            )
          )}
        </div>
        <div className="bg-[#0a0d12] p-4 font-mono text-xs leading-7">
          <div className="mb-4 flex gap-4 text-muted-foreground">
            <span className="text-foreground">auth.js</span>
            <span>session.ts</span>
            <span>tests</span>
          </div>
          {[
            'export async function authMiddleware(req, res) {',
            '  const token = await getAccessToken(req)',
            '  if (!token) return refreshSession(req)',
            '  return validateToken(token)',
            '}',
            '',
            '// Running test suite...',
            '✓ 24 tests passed',
          ].map((line, i) => (
            <div key={i} className={i === 2 ? 'bg-primary/10 text-primary' : ''}>
              <span className="mr-4 inline-block w-4 text-right text-muted-foreground/40">{i + 1}</span>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
