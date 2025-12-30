import { useState, useEffect, memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { X, FileText, ExternalLink } from 'lucide-react'

interface MarkdownViewerProps {
  file: string
  title: string
  onClose: () => void
}

export const MarkdownViewer = memo(function MarkdownViewer({ file, title, onClose }: MarkdownViewerProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/docs/${file}`)
      .then(res => {
        if (!res.ok) throw new Error('Fichier non trouvé')
        return res.text()
      })
      .then(text => {
        setContent(text)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [file])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 rounded-2xl border border-zinc-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-sm sticky top-0">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-orange-500" />
            <h2 className="font-display font-semibold text-lg text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              <p>{error}</p>
            </div>
          ) : (
            <article className="prose prose-invert prose-zinc max-w-none
              prose-headings:font-display prose-headings:text-white
              prose-h1:text-3xl prose-h1:font-bold prose-h1:border-b prose-h1:border-zinc-700 prose-h1:pb-4 prose-h1:mb-6
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-orange-400
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-h4:text-lg prose-h4:font-medium prose-h4:mt-6 prose-h4:mb-2
              prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-orange-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-pre:rounded-xl
              prose-ul:text-zinc-300 prose-ol:text-zinc-300
              prose-li:marker:text-orange-500
              prose-table:text-sm
              prose-thead:border-zinc-700
              prose-th:text-zinc-300 prose-th:font-semibold prose-th:py-3 prose-th:px-4 prose-th:bg-zinc-800/50
              prose-td:py-3 prose-td:px-4 prose-td:border-zinc-800
              prose-tr:border-zinc-800
              prose-blockquote:border-l-orange-500 prose-blockquote:bg-zinc-800/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-hr:border-zinc-700
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </article>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-sm">
          <p className="text-xs text-zinc-500">
            Source: <code className="text-orange-400/70">/docs/{file}</code>
          </p>
        </div>
      </div>
    </div>
  )
})

// Document list component for DocsPage
interface DocFile {
  file: string
  title: string
  description: string
  icon?: string
}

const docFiles: DocFile[] = [
  { file: 'WSER_README.md', title: 'Introduction', description: 'Vue d\'ensemble du projet WSER 2026' },
  { file: 'WSER_PROFIL_ATHLETE.md', title: 'Profil Athlète', description: 'Analyse du profil et des gaps identifiés' },
  { file: 'WSER_SEANCES_SIGNATURE.md', title: 'Séances Signature', description: 'Les 4 workouts clés pour WSER' },
  { file: 'WSER_GUT_TRAINING.md', title: 'Gut Training', description: 'Protocole nutrition 90-110g CHO/h' },
  { file: 'WSER_HEAT_TRAINING.md', title: 'Heat Training', description: 'Acclimatation chaleur pour les canyons' },
  { file: 'WSER_MUSCULATION.md', title: 'Musculation', description: 'Préparation excentrique pour les 7536m D-' },
  { file: 'WSER_PLANNING_ADAPTE_v2.md', title: 'Planning', description: 'Phases et périodisation jusqu\'au jour J' },
]

export const DocsList = memo(function DocsList() {
  const [selectedDoc, setSelectedDoc] = useState<DocFile | null>(null)

  return (
    <>
      <div className="grid gap-3">
        {docFiles.map((doc) => (
          <button
            key={doc.file}
            onClick={() => setSelectedDoc(doc)}
            className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-zinc-500 truncate">{doc.description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
          </button>
        ))}
      </div>

      {selectedDoc && (
        <MarkdownViewer
          file={selectedDoc.file}
          title={selectedDoc.title}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </>
  )
})
