import { openDB } from 'idb'
import { Order } from '@/types'

const dbPromise = openDB('DunXiaoxinOrderSystem', 1, {
  upgrade(db) {
    db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true })
  },
})

export async function placeOrder(menuItemIds: number[], dinnerTime: string): Promise<Order> {
  const db = await dbPromise
  const order: Omit<Order, 'id'> = {
    menuItemIds,
    dinnerTime,
    createdAt: new Date().toISOString(),
  }
  const id = await db.add('orders', order)
  return { id, ...order }
}

export async function getOrders(): Promise<Order[]> {
  const db = await dbPromise
  return db.getAll('orders')
}

