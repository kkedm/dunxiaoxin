import { openDB } from 'idb'
import { MenuItem } from '@/types'

const dbPromise = openDB('DunXiaoxinOrderSystem', 1, {
  upgrade(db) {
    db.createObjectStore('menuItems', { keyPath: 'id', autoIncrement: true })
  },
})

export async function getMenuItems(): Promise<MenuItem[]> {
  const db = await dbPromise
  return db.getAll('menuItems')
}

export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const db = await dbPromise
  const id = await db.add('menuItems', item)
  return { id, ...item }
}

export async function deleteMenuItem(id: number): Promise<void> {
  const db = await dbPromise
  await db.delete('menuItems', id)
}

