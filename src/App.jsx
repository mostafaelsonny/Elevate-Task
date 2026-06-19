import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from '@/components/layout/Header'
import PostList from '@/pages/PostList'
import PostDetail from '@/pages/PostDetail'
import CreatePost from '@/pages/CreatePost'
import bgImage from '@/assets/bg.jpg'

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed',
        }}
      >
        <Header />

        <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-4">
          <Routes>
            <Route path="/"           element={<PostList />} />
            <Route path="/posts/:id"  element={<PostDetail />} />
            <Route path="/create"     element={<CreatePost />} />
          </Routes>
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              borderRadius: '10px',
              fontSize: '14px',
              padding: '12px 16px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}
