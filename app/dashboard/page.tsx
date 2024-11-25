'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Menu from '@/components/Menu'
import Order from '@/components/Order'
import { getCurrentUser } from '@/lib/auth'
import { User } from '@/types'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState<'menu' | 'order'>('menu')
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push('/login')
      }
    }
    fetchUser()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-lg font-semibold text-purple-600">炖小新点餐系统</span>
              </div>
              <div className="ml-6 flex space-x-8">
                <button
                  onClick={() => setCurrentPage('menu')}
                  className={`${
                    currentPage === 'menu'
                      ? 'border-purple-500 text-purple-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  菜单
                </button>
                {user.role === 'wife' && (
                  <button
                    onClick={() => setCurrentPage('order')}
                    className={`${
                      currentPage === 'order'
                        ? 'border-purple-500 text-purple-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    点菜
                  </button>
                )}
              </div>
            </div>
            <div className="ml-6 flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-4">
                欢迎, {user.username} ({user.role === 'wife' ? '炖小新' : 'Excellent'})
              </span>
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentPage === 'menu' && <Menu user={user} />}
        {currentPage === 'order' && user.role === 'wife' && <Order />}
      </main>
    </div>
  )
}

