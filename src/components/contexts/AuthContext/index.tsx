import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContextProps, AuthContextProviderProps, UserProps } from './interface';
import { DEFAULT_USER } from './constant';
import { useRouter } from 'next/router';

const AuthContext = createContext<AuthContextProps>({
    user: DEFAULT_USER,
    isLoading: true,
    isAuthenticated: false,
    registrationSuccessMessage: null,
    login: async (username: string, password: string) => { },
    logout: () => { },
    getDashboard: () => { },
    register: async (username: string, email: string, password: string) => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<UserProps>({
        user_id: 0,
        username: '',
        email: '',
        balance: 0,
        income: 0,
        expenses: 0,
        last_transaction_amount: 0,
        last_transaction_type: '',
    });
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState<string | null>(null);

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
                console.log(userData);
                router.replace('/');
            } else {
                throw new Error('Failed to authenticate');
            }
        } catch (error) {
            throw new Error('Failed to authenticate');
        } finally {
            setLoading(false);
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
          setLoading(true);
          const response = await axios.post(
            'http://127.0.0.1:8000/api/register/',
            { username, email, password },
            { headers: { 'Content-Type': 'application/json' } }
          );
    
          if (response.status === 201) {
            const userData = response.data as UserProps;
            setUser(userData);
            setRegistrationSuccessMessage('Registration successful. You can now log in.');
            console.log(userData);
          } else {
            throw new Error('Failed to register');
          }
        } catch (error) {
          console.error('Error during registration:', error);
        } finally {
          setLoading(false);
        }
      };

    const logout = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/api/logout/');

            if (response.status === 200) {
                setUser(DEFAULT_USER);
                setIsAuthenticated(false);
                router.replace('/LoginPage');
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDashboard = async () => {
        try {
            const response = await axios.get('');

            if (response.status === 200) {

            } else {
                console.error('Failed to fetch dashboard data');
            }
        } catch (error) {
            console.error('Error during fetching dashboard data:', error);
        }
    };

    const contextValue: AuthContextProps = {
        user,
        isAuthenticated,
        isLoading: loading,
        login,
        registrationSuccessMessage,
        logout,
        getDashboard,
        register,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
