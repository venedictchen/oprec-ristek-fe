export interface UserProps{
    user_id: number;
    username: string;
    email: string;
    balance: number;
    income: number;
    expenses: number;
    last_transaction_amount: number;
    last_transaction_type: string;
}

export interface AuthContextProps {
    user: UserProps;
    isLoading: boolean;
    isAuthenticated: boolean;
    registrationSuccessMessage: string | null; 
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    getDashboard: () => void;
    register: (username: string, email: string, password: string) => Promise<void>;
  }
  
export interface AuthContextProviderProps{
    children: React.ReactNode;
}