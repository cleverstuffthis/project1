"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type UserRole = "user" | "admin";

export type UserAccount = {
  username: string;
  role: UserRole;
};

type AuthContextValue = {
  user: UserAccount | null;
  register: (username: string, password: string) => void;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_KEY = "summit-ride-user";
const USERS_KEY = "summit-ride-users";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(USER_KEY) : null;
    if (stored) {
      try {
        setUser(JSON.parse(stored) as UserAccount);
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(USER_KEY);
      }
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      register: (username, password) => {
        if (typeof window === "undefined") {
          return;
        }
        const stored = window.localStorage.getItem(USERS_KEY);
        const users = stored ? (JSON.parse(stored) as Record<string, { password: string }>) : {};
        users[username] = { password };
        window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
        setUser({ username, role: "user" });
      },
      login: (username, password, role) => {
        if (typeof window === "undefined") {
          return false;
        }
        if (username === "admin" && password === "admin") {
          setUser({ username, role: "admin" });
          return true;
        }
        const stored = window.localStorage.getItem(USERS_KEY);
        const users = stored ? (JSON.parse(stored) as Record<string, { password: string }>) : {};
        if (users[username]?.password === password) {
          setUser({ username, role });
          return true;
        }
        return false;
      },
      logout: () => {
        setUser(null);
      }
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
