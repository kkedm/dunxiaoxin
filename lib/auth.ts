import { openDB } from 'idb'
import { User } from '@/types'

const dbPromise = openDB('DunXiaoxinOrderSystem', 1, {
  upgrade(db) {
    db.createObjectStore('users', { keyPath: 'username' })
  },
})

export async function initializeUsers() {
  const db = await dbPromise
  const tx = db.transaction('users', 'readwrite')
  const store = tx.objectStore('users')

  await store.put({ username: 'excellent', password: '123456', role: 'husband' })
  await store.put({ username: 'dunxiaoxin', password: '123456', role: 'wife' })

  await tx.done
}

export async function login(username: string, password: string): Promise<User | null> {
  const db = await dbPromise
  const user = await db.get('users', username)

  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))
    return userWithoutPassword
  }

  return null
}

export async function getCurrentUser(): Promise<User | null> {
  const userJson = localStorage.getItem('user')
  return userJson ? JSON.parse(userJson) : null
}

