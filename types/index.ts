export interface User {
  username: string;
  role: 'wife' | 'husband';
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
}

export interface Order {
  id: number;
  menuItemIds: number[];
  dinnerTime: string;
  createdAt: string;
}

