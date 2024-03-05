import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContextProps, AuthContextProviderProps, UserProps } from './interface';
import { DEFAULT_USER } from './constant';
import { useRouter } from 'next/router';

const AuthContext = createContext<AuthContextProps>({
    user: DEFAULT_USER,
    isLoading: true,
    isAuthenticated: false,
    login: async (username: string, password: string) => {},
    logout: () => {},
    getDashboard: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<UserProps>({
        id: '',
        username: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login/',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.status === 200) {
                const userData = response.data as UserProps;
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try{
            setLoading(true);
            const response = await axios.post(
                'http://127.0.0.1:8000/api/logout/',
                
            );
            if (response.status === 200) {
                setUser({
                    id: '',
                    username: '',
                    email: '',
                });
                setIsAuthenticated(false);
                router.replace('/LoginPage');
            } else {
                console.error('Failed to logout');
            }
        }catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDashboard = async () => {
        try {
            const response = await axios.get('');

            if (response.status === 200) {
                // Handle success response
            } else {
                console.error('Failed to fetch dashboard data');
            }
        } catch (error) {
            console.error('Error during fetching dashboard data:', error);
        }
    };

    const contextValue: AuthContextProps = {
        user:   user,
        isAuthenticated: isAuthenticated,
        isLoading: loading,
        login:login,
        logout:logout,
        getDashboard:getDashboard,
    };


    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
