import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, PenSquare, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useUsers } from '@/hooks/useUsers'
import { createPost } from '@/api/posts'

const schema = z.object({
  title: z.string().min(1, 'Post title is required'),
  body: z.string().min(1, 'Post body is required'),
  userId: z.string().min(1, 'Please select an author for this post'),
})

export default function CreatePost() {
  const { users, loading: usersLoading } = useUsers()
  const [serverError, setServerError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: '', body: '', userId: '' },
  })

  const onSubmit = async (data) => {
    setServerError(null)
    setSubmitting(true)
    try {
      await createPost({
        title: data.title,
        body: data.body,
        userId: Number(data.userId),
      })
      toast.success('A new post has been successfully created!', {
        duration: 4000,
      })
      reset()
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Internal Server Error'
      setServerError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <PenSquare size={20} className="text-gray-800" />
          <h1 className="text-lg font-semibold text-gray-900">
            Create a New Post
          </h1>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Posts
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        id="create-post-form"
        className="p-6"
      >
        {/* Inner bordered card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5 max-w-xl shadow-sm">
          {/* Title */}
          <div className="mb-5">
            <label
              htmlFor="post-title"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Title
            </label>
            <input
              id="post-title"
              type="text"
              placeholder="Enter post title"
              {...register('title')}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-100 border text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition ${
                errors.title
                  ? 'border-red-300 focus:border-red-400 bg-red-50'
                  : 'border-transparent focus:border-gray-300 focus:bg-white'
              }`}
            />
            {errors.title && (
              <p
                className="flex items-center gap-1.5 mt-1.5 text-sm text-red-500"
                role="alert"
                id="title-error"
              >
                <AlertCircle size={14} />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Body */}
          <div className="mb-5">
            <label
              htmlFor="post-body"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Body
            </label>
            <textarea
              id="post-body"
              placeholder="Enter post body"
              rows={5}
              {...register('body')}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-100 border text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition resize-none ${
                errors.body
                  ? 'border-red-300 focus:border-red-400 bg-red-50'
                  : 'border-transparent focus:border-gray-300 focus:bg-white'
              }`}
            />
            {errors.body && (
              <p
                className="flex items-center gap-1.5 mt-1.5 text-sm text-red-500"
                role="alert"
                id="body-error"
              >
                <AlertCircle size={14} />
                {errors.body.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="post-author"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Author
            </label>
            <div className="relative">
              <select
                id="post-author"
                {...register('userId')}
                disabled={usersLoading}
                className={`w-full appearance-none px-4 py-2.5 pr-10 rounded-lg bg-gray-100 border text-sm focus:outline-none transition cursor-pointer ${
                  errors.userId
                    ? 'border-red-300 text-gray-600 bg-red-50'
                    : 'border-transparent text-gray-500 focus:border-gray-300 focus:bg-white'
                }`}
              >
                <option value="">Select Author</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            {errors.userId && (
              <p
                className="flex items-center gap-1.5 mt-1.5 text-sm text-red-500"
                role="alert"
                id="author-error"
              >
                <AlertCircle size={14} />
                {errors.userId.message}
              </p>
            )}
          </div>
        </div>

        {/* Server error banner */}
        {serverError && (
          <div
            className="flex items-center justify-center gap-2 max-w-xl mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-300 text-red-500 text-sm"
            role="alert"
            id="server-error-banner"
          >
            <AlertCircle size={15} />
            <span>{serverError}</span>
          </div>
        )}

        {/* Submit button */}
        <div className="max-w-xl">
          <button
            id="submit-post"
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-700 active:scale-[0.99] text-white text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? 'Creating…' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  )
}
