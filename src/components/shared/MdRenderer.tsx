import type { MdBlock } from '../../utils/md'
import { formatInline } from '../../utils/md'

export function MdRenderer({ blocks }: { blocks: MdBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1 key={idx} className="text-3xl font-bold tracking-tight mt-8 first:mt-0">
                {block.text}
              </h1>
            )
          case 'h2':
            return (
              <h2 key={idx} className="text-2xl font-semibold tracking-tight mt-8 first:mt-0 text-zinc-100">
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={idx} className="text-lg font-semibold text-zinc-200 mt-6">
                {block.text}
              </h3>
            )
          case 'fence':
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 text-zinc-300 leading-relaxed whitespace-pre-wrap font-mono text-sm"
              >
                {block.text}
              </div>
            )
          case 'list':
            return (
              <ul key={idx} className="space-y-2 pl-4">
                {block.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-zinc-300 leading-relaxed flex gap-2"
                  >
                    <span className="text-zinc-500">•</span>
                    <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                  </li>
                ))}
              </ul>
            )
          case 'table':
            return (
              <div key={idx} className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-900/80">
                    <tr>
                      {block.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left font-medium text-zinc-300 border-b border-zinc-800">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i} className="border-b border-zinc-800/50 last:border-0">
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 text-zinc-400">
                            <span dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'paragraph':
            return (
              <p
                key={idx}
                className="text-zinc-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatInline(block.text) }}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
