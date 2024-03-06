import React, { useState, useEffect, useRef } from 'react';
import BalanceCard from './modules/modules-elements/BalanceCard';
import IncomeCard from './modules/modules-elements/IncomeCard';
import ExpenseCard from './modules/modules-elements/ExpenseCard';
import axios from 'axios';
import { useAuth } from '@/components/contexts';
import { UserProps } from './modules/interface';
import { Chart, LineController, BarController, BarElement, LinearScale, CategoryScale, PointElement, LineElement } from 'chart.js';

Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement, BarElement, BarController);

const HomePage: React.FC = (props) => {
    const { user } = useAuth();
    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserProps>(props && ({} as UserProps));
    const chartRef = useRef<HTMLCanvasElement | null>(null);

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
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsFetchLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (userData) {
            // Only create chart when userData is available
            const ctx = chartRef.current?.getContext('2d');
            if (ctx) {
                const existingChart = Chart.getChart(ctx);
                if (existingChart) {
                    existingChart.destroy();
                }
                const incomeData = userData.income || [];
                const expenseData = userData.expenses || [];

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Income', 'Expense'],
                        datasets: [
                            {
                                label: 'Amount',
                                data: [incomeData, expenseData],
                                backgroundColor: ['#4C49ED', '#4FD18B'],
                            },
                        ],
                    },
                });
            }
        }
    }, [userData]);

    return (
        <div className="container mx-auto p-8 md:p-16 text-left ">
            <div className="flex flex-col gap-1  md:space-x-6 overflow-hidden">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Dashboard</h1>
                <div className="flex flex-col xl:flex-row flex-grow gap-16">
                    <div className="mt-8 md:mt-10">
                    <BalanceCard
                        totalBalance={userData?.balance}
                        lastTransactionType={userData?.last_transaction_type}
                        lastTransactionAmount={userData?.last_transaction_amount}
                    />
                    </div>
                     <div className="flex flex-col w-11/12 md:w-full">
                    <h1 className="text-2xl font-bold mb-4">Monthly Overview</h1>
                    <div className="flex flex-row mt-4 gap-6 md:gap-24 flex-wrap">
                        <canvas id="myChart" ref={chartRef} height={300} width={500}></canvas>
                    </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row mt-8 md:mt-0 gap-8">
                    <IncomeCard income={userData?.income} />
                    <ExpenseCard expense={userData?.expenses} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
