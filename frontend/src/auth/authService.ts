export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}


export interface LoginData {
  email: string;
  password: string;
}

const mockUsers: User[] = []; // temporary "database"

import api from "../config/axios";

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export async function register(data: RegisterData) {
  const res = await api.post('/users/register', data); 
  console.log(data);
  return res.data;
}
export async function login(data: LoginData) {
  const res = await api.post('/users/login', data);
  localStorage.setItem("user", JSON.stringify(res));
  return res.data; // { token, userId }
}
  export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  export function getCurrentUser(): User | null {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  
  // Get JWT token
  export function getToken(): string | null {
    const user = getCurrentUser();
    return user?.token || null;
  }
  