import { memo } from 'react'

interface SectionHeaderProps {
  kicker: string
  title: string
  className?: string
}

export const SectionHeader = memo(function SectionHeader({
  kicker,
  title,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <p className="kicker">{kicker}</p>
      <h2 className="headline-lg">{title}</h2>
      <div className="w-12 h-1 bg-linear-to-r from-orange-500 to-orange-600 rounded mt-3" />
    </div>
  )
})
