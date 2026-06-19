import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, Calendar } from 'lucide-react'
import { fetchPostById, fetchUserById } from '@/api/posts'

// Generate a deterministic-looking date from post id
function getPostDate(id) {
  const base = new Date(2025, 0, 1) // Jan 1 2025
  base.setDate(base.getDate() + (id * 7) % 365)
  return base.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchPostById(id)
      .then(async (postData) => {
        setPost(postData)
        const userData = await fetchUserById(postData.userId)
        setAuthor(userData)
      })
      .catch(() => setError('Post not found.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3 text-white/70">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
          <span className="text-sm">Loading post…</span>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-white text-sm">{error || 'Post not found.'}</p>
        <Link
          to="/"
          className="text-sm text-white/80 underline hover:text-white transition"
        >
          ← Back to Posts
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-2xl shadow-sm">
      {/* Hero section — dark blue gradient over mountain */}
      <div
        className="relative px-6 pt-6 pb-8"
        style={{
          background:
            'linear-gradient(160deg, rgba(18,34,65,0.88) 0%, rgba(30,55,100,0.80) 60%, rgba(180,210,240,0.30) 100%)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Back button */}
        <Link
          to="/"
          id="back-to-posts"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-5 bg-white/90 hover:bg-white text-gray-700 text-xs font-medium rounded-full shadow transition"
        >
          <ArrowLeft size={13} />
          Back to Posts
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white leading-snug mb-4 capitalize">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-5 text-white/75 text-sm">
          <span className="flex items-center gap-1.5">
            <User size={14} />
            {author ? author.name : `User #${post.userId}`}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {getPostDate(post.id)}
          </span>
        </div>
      </div>

      {/* Body card */}
      <div className="bg-white/95 px-6 py-6 min-h-[260px]">
        <p
          className="text-gray-700 text-sm leading-relaxed whitespace-pre-line"
          id="post-body-content"
        >
          {post.body}
        </p>
      </div>
    </div>
  )
}
