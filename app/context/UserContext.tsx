"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the User interface
export interface User {
    id: number;
    email: string;
    nombre?: string;
    categoria?: string;
    // Allow additional properties from the database
    [key: string]: unknown;
}

// Define the context type
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    return JSON.parse(storedUser);
                } catch (error) {
                    console.error('Failed to parse stored user:', error);
                    localStorage.removeItem('user');
                }
            }
        }
        return null;
    });

    const login = (userData: User) => {
        setUser(userData);
        // Optionally store in localStorage for persistence
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(userData));
        }
    };

    const logout = () => {
        setUser(null);
        // Clear from localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
    };

    const isLoggedIn = user !== null;

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to use the UserContext
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
