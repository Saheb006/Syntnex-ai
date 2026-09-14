'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ArrowRight, Square, Pause, Play, Bot, FileCode2, Terminal, MessageSquare, Check, GitBranch } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SimpleButton } from '@/components/ui/SimpleButton'
import { Editor } from './Editor'
import type { Page } from '@/types'

interface WorkspaceProps {
  setPage: (p: Page) => void
}

export function Workspace({ setPage }: WorkspaceProps) {
  const [stage, setStage] = useState(3)
  const [paused, setPaused] = useState(false)

  const stages = [
    'Analyzing repository',
    'Finding relevant files',
    'Creating implementation plan',
    'Modifying code',
    'Running tests',
    'Fixing failures',
    'Preparing changes',
    'Ready for Pull Request',
  ]

  useEffect(() => {
    if (paused || stage >= 7) return
    const t = setTimeout(() => setStage((s) => s + 1), 2600)
    return () => clearTimeout(t)
  }, [paused, stage])

  return (
    <div className="-m-5 flex min-h-[calc(100vh-4rem)] flex-col md:-m-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage('dashboard')} className="text-muted-foreground">
              <ChevronLeft className="size-4" />
            </button>
            <h1 className="font-medium">Fix authentication middleware error</h1>
            <Badge tone={stage >= 7 ? 'green' : 'blue'}>{stage >= 7 ? 'Ready for PR' : 'Agent working'}</Badge>
          </div>
          <p className="mt-1 pl-6 font-mono text-xs text-muted-foreground">Syntnex/demo-project · fix/auth-middleware</p>
        </div>
        <div className="flex gap-2">
          <SimpleButton variant="outline" onClick={() => setPaused(!paused)}>
            {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
            {paused ? 'Resume' : 'Pause'}
          </SimpleButton>
          <SimpleButton variant="danger">
            <Square className="size-3 fill-current" /> Stop
          </SimpleButton>
          <SimpleButton onClick={() => setPage('diff')} disabled={stage < 5}>
            View Diff <ArrowRight className="size-3" />
          </SimpleButton>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 xl:grid-cols-[230px_minmax(0,1fr)_300px]">
        <div className="border-b border-border bg-sidebar p-4 xl:border-b-0 xl:border-r">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Agent activity</p>
          <div className="mt-5 flex flex-col gap-4">
            {stages.map((x, i) => (
              <div key={x} className="flex gap-2.5 text-xs">
                <span
                  className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${
                    i < stage
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : i === stage
                      ? 'bg-primary/15 text-primary'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {i < stage ? <Check className="size-2.5" /> : i === stage ? <div className="size-1.5 rounded-full bg-current animate-pulse" /> : <div className="size-1 rounded-full bg-current" />}
                </span>
                <span className={i === stage ? 'text-foreground' : 'text-muted-foreground'}>{x}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 border-b border-border xl:border-b-0 xl:border-r">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <div className="flex gap-1">
              <button className="rounded-t-md bg-card px-3 py-2 font-mono text-[11px] text-foreground">Files</button>
              <button className="px-3 py-2 font-mono text-[11px] text-muted-foreground">Terminal</button>
              <button className="px-3 py-2 font-mono text-[11px] text-muted-foreground">Chat</button>
            </div>
            <div className="flex gap-2">
              <button className="text-muted-foreground hover:text-foreground">
                <Terminal className="size-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                <MessageSquare className="size-4" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <div className="p-4">
              <div className="mb-4 flex items-center gap-2">
                <FileCode2 className="size-4 text-primary" />
                <span className="font-mono text-sm">src/middleware/auth.js</span>
              </div>
              <Editor stage={stage} />
            </div>
          </div>
        </div>

        <div className="bg-sidebar p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Context</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-card p-3">
              <div className="flex items-center gap-2">
                <Bot className="size-4 text-primary" />
                <span className="text-xs font-medium">Agent Context</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Analyzing authentication flow to identify token refresh issues
              </p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <div className="flex items-center gap-2">
                <GitBranch className="size-4 text-primary" />
                <span className="text-xs font-medium">Branch Info</span>
              </div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">fix/auth-middleware</p>
              <p className="mt-1 text-xs text-muted-foreground">Based on main</p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <div className="flex items-center gap-2">
                <FileCode2 className="size-4 text-primary" />
                <span className="text-xs font-medium">Files Modified</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">1 file changed</p>
              <p className="mt-1 text-xs text-muted-foreground">+14 lines, -8 lines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
