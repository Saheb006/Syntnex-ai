'use client'

import { useState } from 'react'
import { Settings, Menu, X, FolderGit2, ChevronDown, Bell, Search, MoreHorizontal } from 'lucide-react'
import { Logo } from './Logo'
import { nav } from '@/data/mockData'
import type { Page } from '@/types'

interface ShellProps {
  page: Page
  setPage: (p: Page) => void
  children: React.ReactNode
}

export function Shell({ page, setPage, children }: ShellProps) {
  const [mobile, setMobile] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-border bg-sidebar p-4 transition-transform lg:translate-x-0 ${
          mobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo onClick={() => setPage('dashboard')} />
          <button onClick={() => setMobile(false)} className="text-muted-foreground lg:hidden">
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-1">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setPage(id as Page)
                setMobile(false)
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                page === id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <button
            onClick={() => setPage('settings')}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
              page === 'settings' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <Settings className="size-4" />
            Settings
          </button>
          <div className="mt-3 flex items-center gap-3 border-t border-border pt-4">
            <div className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-semibold">
              DV
            </div>
            <div>
              <p className="text-xs font-medium">Developer</p>
              <p className="text-[11px] text-muted-foreground">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>
      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur md:px-8">
          <button onClick={() => setMobile(true)} className="text-muted-foreground lg:hidden">
            <Menu className="size-5" />
          </button>
          <div className="hidden items-center gap-2 text-sm md:flex">
            <FolderGit2 className="size-4 text-primary" />
            Syntnex / demo-project
            <ChevronDown className="size-3 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <button className="text-muted-foreground hover:text-foreground">
              <Search className="size-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <Bell className="size-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  )
}
