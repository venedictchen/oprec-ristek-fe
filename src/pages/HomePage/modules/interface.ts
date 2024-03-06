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

export interface BalanceCardProps {
    totalBalance: number;
    lastTransactionType: string;
    lastTransactionAmount: number;
}

export interface ExpenseCardProps{
    expense: number;
}

export interface IncomeCardProps{
    income:number;
}