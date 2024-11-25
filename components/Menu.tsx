'use client'

import React, { useState, useEffect } from 'react'
import { User, MenuItem } from '@/types'
import { getMenuItems, addMenuItem, deleteMenuItem } from '@/lib/menuItems'
import toast from 'react-hot-toast'

interface MenuProps {
  user: User
}

const Menu: React.FC<MenuProps> = ({ user }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemDescription, setNewItemDescription] = useState('')

  useEffect(() => {
    loadMenuItems()
  }, [])

  const loadMenuItems = async () => {
    const items = await getMenuItems()
    setMenuItems(items)
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newItemName && newItemDescription) {
      const newItem = await addMenuItem({ name: newItemName, description: newItemDescription })
      setMenuItems([...menuItems, newItem])
      setNewItemName('')
      setNewItemDescription('')
      toast.success('菜品添加成功！')
    }
  }

  const handleDeleteItem = async (id: number) => {
    await deleteMenuItem(id)
    setMenuItems(menuItems.filter(item => item.id !== id))
    toast.success('菜品删除成功！')
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">菜单</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">当前可选菜品列表</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {menuItems.map((item) => (
          <li key={item.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-purple-600">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              {user.role === 'husband' && (
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="ml-2 px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full hover:bg-red-200"
                >
                  删除
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {user.role === 'husband' && (
        <div className="px-4 py-5 sm:px-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">添加新菜品</h4>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label htmlFor="newItemName" className="block text-sm font-medium text-gray-700">
                菜品名称
              </label>
              <input
                type="text"
                id="newItemName"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="newItemDescription" className="block text-sm font-medium text-gray-700">
                菜品描述
              </label>
              <textarea
                id="newItemDescription"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              添加菜品
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Menu

