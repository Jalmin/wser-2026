import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'

// Lazy load pages for better initial bundle size
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const CoursePage = lazy(() => import('./pages/CoursePage').then(m => ({ default: m.CoursePage })))
const ProfilPage = lazy(() => import('./pages/ProfilPage').then(m => ({ default: m.ProfilPage })))
const PlanPage = lazy(() => import('./pages/PlanPage').then(m => ({ default: m.PlanPage })))
const MethodesPage = lazy(() => import('./pages/MethodesPage').then(m => ({ default: m.MethodesPage })))
const DocsPage = lazy(() => import('./pages/DocsPage').then(m => ({ default: m.DocsPage })))

// Skeleton loading component
function PageLoader() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero skeleton */}
      <div className="relative -mx-4 md:-mx-6 -mt-6">
        <div className="h-[300px] md:h-[400px] bg-zinc-900 rounded-b-xl">
          <div className="absolute inset-0 flex items-end p-6 md:p-8">
            <div className="space-y-4 w-full max-w-xl">
              <div className="h-3 w-32 bg-zinc-800 rounded" />
              <div className="h-10 w-3/4 bg-zinc-800 rounded" />
              <div className="h-4 w-full bg-zinc-800 rounded" />
              <div className="h-4 w-2/3 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeletons */}
      <div className="space-y-6">
        <div className="h-6 w-48 bg-zinc-800 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-zinc-900 rounded-xl border border-zinc-800" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-6 w-64 bg-zinc-800 rounded" />
        <div className="h-48 bg-zinc-900 rounded-xl border border-zinc-800" />
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-zinc-500">Chargement...</span>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/methodes" element={<MethodesPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  )
}
