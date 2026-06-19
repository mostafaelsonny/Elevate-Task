import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }
    
    const left = Math.max(2, currentPage - 1)
    const right = Math.min(totalPages - 1, currentPage + 1)

    pages.push(1)
    if (left > 2) pages.push('...')
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < totalPages - 1) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  const btnBase =
    'h-8 min-w-[2rem] px-2 flex items-center justify-center rounded text-sm transition-colors select-none'
  const activeBtn = 'bg-blue-600 text-white font-semibold'
  const normalBtn = 'text-gray-600 hover:bg-gray-100 cursor-pointer'
  const iconBtn = 'text-gray-500 hover:bg-gray-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      {/* First */}
      <button
        className={cn(btnBase, iconBtn)}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        <ChevronsLeft size={15} />
      </button>
      {/* Prev */}
      <button
        className={cn(btnBase, iconBtn)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={15} />
      </button>

      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className={cn(btnBase, 'text-gray-400 cursor-default')}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={cn(btnBase, currentPage === page ? activeBtn : normalBtn)}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        className={cn(btnBase, iconBtn)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={15} />
      </button>
      {/* Last */}
      <button
        className={cn(btnBase, iconBtn)}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        <ChevronsRight size={15} />
      </button>
    </div>
  )
}
