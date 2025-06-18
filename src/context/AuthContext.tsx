import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../types';
import apiClient, { setCsrfToken } from '../Api';


const initialAuthState: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: async () => {
        throw new Error('Login function not implemented');
    },
    logout: async () => {
        throw new Error('Logout function not implemented');
    },
    loading: true
};

const AuthContext = createContext<AuthContextType>(initialAuthState);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<AuthContextType['user']>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const reponse = await apiClient.get('/check-auth');
                if (reponse.data.authenticated) {
                    setIsAuthenticated(true);
                    setUser(reponse.data.user);
                    setCsrfToken(reponse.data.csrf_token);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }

            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                setUser(null);
            }

            setLoading(false);

        };

        checkAuth();

    }, []);


    const login = async (username: string, password: string) => {
        try {

            const reponse = await apiClient.post('/login', { username, password });
            if (reponse.status === 200) {
                setIsAuthenticated(true);
                setUser(reponse.data);
                // localStorage.setItem("csrf_token", reponse.data.csrf_token);
                setCsrfToken(reponse.data.csrf_token);
                console.log('Login successful:', reponse.data);
                return { success: true }
            }

            return { success: false, error: 'Login failed. Please check your credentials.' };

        }
        catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'An error occurred during login. Please try again later.' };
        }
    }

    const logout = async () => {
        try {
            const reponse = await apiClient.post('/logout');
            if (reponse.status == 200) {
                //delete csrf from local storage
                localStorage.removeItem("csrf_token");
                setCsrfToken("");
                setIsAuthenticated(false);
                setUser(null);

                return { success: true };
            }

            return { success: false, error: 'Logout failed. Please try again.' }
        }
        catch (error) {

            console.error('Logout error:', error);
            return { success: false, error: 'An error occurred during logout. Please try again later.' };
        }
    }

    const value = {
        isAuthenticated,
        user,
        loading,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;