import type { ReactNode } from 'react'
import { Navigation } from './Navigation'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="md:flex md:gap-6">
          <aside className="hidden md:block md:w-[240px] md:py-8 md:sticky md:top-0 md:h-screen">
            <Navigation variant="sidebar" />
          </aside>

          <main className="flex-1 py-6 md:py-8 pb-24 md:pb-8">
            {children}
          </main>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-[#0a0a0a]/95 backdrop-blur-sm z-50">
        <Navigation variant="bottom" />
      </div>
    </div>
  )
}
