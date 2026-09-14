'use client'

import { ArrowRight, Sparkles, ShieldCheck, Zap, Code2, Bot, Database, Lock, TestTube2, GitBranch, Cpu, Globe } from 'lucide-react'
import { SimpleButton } from '@/components/ui/SimpleButton'
import { Badge } from '@/components/ui/Badge'
import { Logo } from '@/components/layout/Logo'
import { AgentPreview } from './AgentPreview'

interface LandingProps {
  start: () => void
  onLogin?: () => void
}

export function Landing({ start, onLogin }: LandingProps) {
  const handleLogin = () => {
    if (onLogin) return onLogin()
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/github`
  }

  return (
    <main className="min-h-screen bg-background px-5 py-6">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between">
          <Logo />
          <div className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <a href="#workflow">Workflow</a>
            <a href="#features">Capabilities</a>
            <a href="#security">Security</a>
          </div>
          <div className="flex items-center gap-3">
            <SimpleButton onClick={handleLogin} variant="ghost">
              Log in
            </SimpleButton>
            <SimpleButton onClick={start} variant="outline">
              Open workspace <ArrowRight className="size-4" />
            </SimpleButton>
          </div>
        </header>

        <section className="grid items-center gap-14 pb-20 pt-20 lg:grid-cols-[.88fr_1.12fr] lg:pt-28">
          <div>
            <Badge tone="blue">
              <Sparkles className="size-3" /> AI-powered software engineering
            </Badge>
            <h1 className="mt-6 max-w-xl text-balance text-5xl font-semibold tracking-[-.05em] sm:text-6xl">
              Ship better code, <span className="text-primary">autonomously.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              Your Autonomous AI Software Engineer. Understand. Build. Test. Fix. Ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SimpleButton onClick={start}>
                Start Building <ArrowRight className="size-4" />
              </SimpleButton>
              <SimpleButton
                onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
              >
                View Demo
              </SimpleButton>
            </div>
            <div className="mt-10 flex gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-400" /> Built for your workflow
              </span>
              <span className="flex items-center gap-2">
                <Zap className="size-4 text-amber-400" /> Fast feedback loops
              </span>
            </div>
          </div>
          <AgentPreview />
        </section>

        <section id="features" className="border-t border-border py-16">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-primary">Capabilities</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Everything you need to ship <span className="text-primary">production code</span>
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Code2, title: 'Code Understanding', desc: 'Deep analysis of your codebase, architecture, and patterns' },
              { icon: Bot, title: 'Autonomous Coding', desc: 'Self-directed implementation with minimal supervision' },
              { icon: Database, title: 'Context Awareness', desc: 'Maintains understanding across files and sessions' },
              { icon: Lock, title: 'Secure by Design', desc: 'Security-first approach with proper validation' },
              { icon: TestTube2, title: 'Test Generation', desc: 'Automatic test creation and execution' },
              { icon: GitBranch, title: 'PR Management', desc: 'Creates and manages pull requests automatically' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="security" className="border-t border-border py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.2em] text-primary">Security</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Enterprise-grade <span className="text-primary">security</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Your code and data stay secure with our comprehensive security measures.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'End-to-end encryption for all data',
                  'SOC 2 Type II compliant infrastructure',
                  'Granular access controls',
                  'Audit logs for all actions',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <Cpu className="size-3" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <Globe className="size-5 text-primary" />
                <h3 className="font-medium">Global Infrastructure</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Deployed across multiple regions for optimal performance and reliability.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {['US East', 'EU West', 'Asia Pacific'].map((region) => (
                  <div key={region} className="rounded-lg bg-secondary p-3 text-center">
                    <p className="text-xs font-medium">{region}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">Available</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Syntnex AI. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
