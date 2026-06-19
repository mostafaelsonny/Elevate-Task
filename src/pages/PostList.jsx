import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, FileText, Plus } from 'lucide-react'
import { usePosts } from '@/hooks/usePosts'
import { useUsers } from '@/hooks/useUsers'
import Pagination from '@/components/Pagination'

const POSTS_PER_PAGE = 10

export default function PostList() {
  const { posts, loading, error } = usePosts()
  const { users } = useUsers()
  const [search, setSearch] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesAuthor =
        selectedAuthor === 'all' || post.userId === Number(selectedAuthor)
      return matchesSearch && matchesAuthor
    })
  }, [posts, search, selectedAuthor])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return filtered.slice(start, start + POSTS_PER_PAGE)
  }, [filtered, currentPage])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleAuthor = (e) => {
    setSelectedAuthor(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-gray-800" />
          <h1 className="text-lg font-semibold text-gray-900">Post List</h1>
        </div>
        <Link
          to="/create"
          id="create-post-link"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <Plus size={14} />
          Create a new post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-100">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            id="search-posts"
            type="text"
            placeholder="Search for a post..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition"
          />
        </div>

        {/* Author filter */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
            Author:
          </span>
          <div className="relative">
            <select
              id="filter-author"
              value={selectedAuthor}
              onChange={handleAuthor}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none text-sm text-gray-700 transition cursor-pointer"
            >
              <option value="all">All</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-7 h-7 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm">Loading posts…</span>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-center py-20">
          <p className="text-red-500 text-sm">
            Failed to load posts. Please try again.
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          {paginated.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
              No posts found.
            </div>
          ) : (
            <ul id="posts-list">
              {paginated.map((post, idx) => (
                <li
                  key={post.id}
                  className={`px-6 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors ${
                    idx < paginated.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <Link to={`/posts/${post.id}`} className="block w-full">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {filtered.length > POSTS_PER_PAGE && (
            <div className="border-t border-gray-100">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
