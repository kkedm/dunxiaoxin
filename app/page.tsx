import Link from 'next/link'
import { initializeUsers } from '@/lib/auth'

export default function Home() {
  // 初始化用户
  initializeUsers()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">欢迎来到炖小新点餐系统</h1>
        <p className="text-xl text-white mb-8">为您的爱情晚餐提供便捷的点菜体验</p>
        <Link href="/login" className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-pink-100 transition duration-300">
          开始使用
        </Link>
      </div>
    </div>
  )
}

