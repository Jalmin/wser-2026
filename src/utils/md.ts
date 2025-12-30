export type MdBlock =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'fence'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }

export function parseMdToBlocks(raw: string): MdBlock[] {
  const lines = raw.replaceAll('\r\n', '\n').split('\n')
  const blocks: MdBlock[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced block (``` ... ```)
    if (line.trim().startsWith('```')) {
      i++
      const buf: string[] = []
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      const text = buf.join('\n').trim()
      if (text) blocks.push({ type: 'fence', text })
      continue
    }

    // Headers
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.replace(/^#\s+/, '').trim() })
      i++
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '').trim() })
      i++
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '').trim() })
      i++
      continue
    }

    // Table detection
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
      const headers = line.split('|').map(h => h.trim()).filter(Boolean)
      i += 2 // skip header and separator
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|')) {
        const row = lines[i].split('|').map(c => c.trim()).filter(Boolean)
        if (row.length > 0) rows.push(row)
        i++
      }
      if (headers.length > 0) {
        blocks.push({ type: 'table', headers, rows })
      }
      continue
    }

    // List items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''))
        i++
      }
      blocks.push({ type: 'list', items })
      continue
    }

    // Empty lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    blocks.push({ type: 'paragraph', text: line.trim() })
    i++
  }

  return blocks
}

// Helper to format inline markdown (bold, italic, links)
export function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-zinc-800 px-1.5 py-0.5 rounded text-sm">$1</code>')
}
