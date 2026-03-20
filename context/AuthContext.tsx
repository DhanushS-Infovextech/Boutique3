'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/lib/types';
import { DEFAULT_USERS } from '@/lib/data';
import { uid } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, pw: string) => User | null;
  demoLogin: (role: 'admin' | 'user') => User | null;
  register: (name: string, email: string, phone: string, pw: string) => { user?: User; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  changePassword: (oldPw: string, newPw: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(DEFAULT_USERS);

  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem('jb_users');
      if (savedUsers) setUsers(JSON.parse(savedUsers));
      const savedUser = localStorage.getItem('jb_cu');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {}
  }, []);

  const save = useCallback((u: User | null, allUsers: User[]) => {
    localStorage.setItem('jb_cu', JSON.stringify(u));
    localStorage.setItem('jb_users', JSON.stringify(allUsers));
  }, []);

  const login = (email: string, pw: string): User | null => {
    const u = users.find(x => x.email === email && x.pw === pw);
    if (u) { setUser(u); save(u, users); }
    return u || null;
  };

  const demoLogin = (role: 'admin' | 'user'): User | null => {
    const u = users.find(x => x.role === role);
    if (u) { setUser(u); save(u, users); }
    return u || null;
  };

  const register = (name: string, email: string, phone: string, pw: string) => {
    if (users.find(u => u.email === email)) return { error: 'Email already registered.' };
    const u: User = { id: uid(), name, email, phone, pw, role: 'user', joined: new Date().toISOString().slice(0, 10) };
    const newUsers = [...users, u];
    setUsers(newUsers);
    setUser(u);
    save(u, newUsers);
    return { user: u };
  };

  const logout = () => { setUser(null); save(null, users); };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    const newUsers = users.map(u => u.id === updated.id ? updated : u);
    setUsers(newUsers);
    save(updated, newUsers);
  };

  const changePassword = (oldPw: string, newPw: string): boolean => {
    if (!user || user.pw !== oldPw) return false;
    const updated = { ...user, pw: newPw };
    setUser(updated);
    const newUsers = users.map(u => u.id === updated.id ? updated : u);
    setUsers(newUsers);
    save(updated, newUsers);
    return true;
  };

  return <AuthContext.Provider value={{ user, users, login, demoLogin, register, logout, updateProfile, changePassword }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
