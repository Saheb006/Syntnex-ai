import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface EditorProps {
  stage: number
}

export function Editor({ stage }: EditorProps) {
  return (
    <div className="min-w-0 bg-[#0a0d12] p-3">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex gap-1">
          <span className="rounded-t-md bg-card px-3 py-2 font-mono text-[11px]">auth.js</span>
          <span className="px-3 py-2 font-mono text-[11px] text-muted-foreground">session.js</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">src/middleware/auth.js</span>
      </div>
      <div className="mt-4 overflow-auto font-mono text-xs leading-6">
        <div className="mb-3 rounded border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] text-primary">
          Modified · {stage >= 4 ? 'Changes applied' : 'Previewing proposed changes'}
        </div>
        {[
          'export async function authMiddleware(req, res, next) {',
          '  const accessToken = getToken(req.headers)',
          '  const refreshToken = getRefreshToken(req)',
          '',
          '  if (!accessToken) {',
          '-   return res.status(401).json({ error: "Unauthorized" })',
          '+   return await refreshSession(req, res, next)',
          '  }',
          '',
          '  try {',
          '    await verifyToken(accessToken)',
          '+   return next()',
          '  } catch (error) {',
          '-   return res.status(401).end()',
          '+   return handleAuthError(error, req, res, next)',
          '  }',
          '}',
        ].map((line, i) => (
          <div
            key={i}
            className={`${
              line.startsWith('+')
                ? 'bg-emerald-500/10 text-emerald-300'
                : line.startsWith('-')
                ? 'bg-red-500/10 text-red-300'
                : 'text-slate-300'
            }`}
          >
            <span className="mr-5 inline-block w-5 text-right text-slate-600">{i + 1}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}
