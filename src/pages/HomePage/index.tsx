import React, { useState, useEffect } from 'react';
import BalanceCard from './modules/modules-elements/BalanceCard';
import IncomeCard from './modules/modules-elements/IncomeCard';
import axios from 'axios';
import ExpenseCard from './modules/modules-elements/ExpenseCard';
import { useAuth } from '@/components/contexts';
import { UserProps } from './modules/interface';
const HomePage: React.FC = (props) => {
    const { user } = useAuth();
    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserProps>(props && ({} as UserProps));
    const getData = async () => {
        try {
            setIsFetchLoading(true);
            console.log('fetching data');
            const response = await axios.get(`http://127.0.0.1:8000/user_dashboard/${user.user_id}/`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });
            console.log(response.data);
            setUserData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsFetchLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex w-full py-12 px-12">
            <div className="flex flex-col">
                <div className="flex flex-row gap-24 mb-24 h-[250px]">
                    <BalanceCard 
                    totalBalance={userData?.balance} 
                    lastTransactionType={userData?.last_transaction_type}
                    lastTransactionAmount={userData?.last_transaction_amount}
                    />
                 
                </div>
                <div className="flex flex-row gap-12">
                    <IncomeCard income={userData?.income}/>
                    <ExpenseCard expense={userData?.expenses}  />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
