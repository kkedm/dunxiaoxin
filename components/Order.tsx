'use client'

import React, { useState, useEffect } from 'react'
import { MenuItem } from '@/types'
import { getMenuItems } from '@/lib/menuItems'
import { placeOrder } from '@/lib/orders'
import toast from 'react-hot-toast'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'

const Order: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [dinnerTime, setDinnerTime] = useState<string | null>('18:00')
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() =>
{
    loadMenuItems()
  }, [])

  const loadMenuItems = async () => {
    const items = await getMenuItems()
    setMenuItems(items)
  }

  const handleItemToggle = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedItems.length === 0 || !dinnerTime) {
      toast.error('请选择菜品和用餐时间')
      return
    }
    try {
      await placeOrder(selectedItems, dinnerTime)
      setOrderPlaced(true)
      toast.success('订单已提交')
    } catch (error) {
      toast.error('订单提交失败，请重试')
    }
  }

  if (orderPlaced) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">订单已提交</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>您的晚餐将在 {dinnerTime} 准备好。</p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setOrderPlaced(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              再次点菜
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">选择菜品</h3>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            {menuItems.map((item) => (
              <div key={item.id} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`item-${item.id}`}
                    name={`item-${item.id}`}
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemToggle(item.id)}
                    className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`item-${item.id}`} className="font-medium text-gray-700">
                    {item.name}
                  </label>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 sm:mt-5 sm:pt-10">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">预计用餐时间</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">请选择您希望的用餐时间。</p>
          </div>
          <div className="mt-6 sm:mt-5">
            <TimePicker
              onChange={setDinnerTime}
              value={dinnerTime}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            提交订单
          </button>
        </div>
      </div>
    </form>
  )
}

export default Order

