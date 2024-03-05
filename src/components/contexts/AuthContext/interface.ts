export interface UserProps{
    id: string;
    username: string;
    email: string;
}

export interface AuthContextProps{
    user: UserProps;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    getDashboard: () => void;
}

export interface AuthContextProviderProps{
    children: React.ReactNode;
}