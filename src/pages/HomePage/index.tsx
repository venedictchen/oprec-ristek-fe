import React, { useState, useEffect, useRef } from 'react';
import BalanceCard from './modules/modules-elements/BalanceCard';
import IncomeCard from './modules/modules-elements/IncomeCard';
import axios from 'axios';
import ExpenseCard from './modules/modules-elements/ExpenseCard';
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
                    existingChart.destroy(); // Destroy the existing Chart instance
                }
                const incomeData = userData.income || [];
                const expenseData = userData.expenses || [];


                new Chart(ctx, {
                    type: 'bar',  // Use 'bar' type for a bar chart
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
        <div className="flex w-full py-12 px-12">
            <div className="flex flex-col">
                <div className="flex flex-row gap-24 mb-24 h-[250px]">
                    <div className="mt-16">
                    <BalanceCard
                        totalBalance={userData?.balance}
                        lastTransactionType={userData?.last_transaction_type}
                        lastTransactionAmount={userData?.last_transaction_amount}
                    />

                    </div>
                    <div className="flex flex-col w-full">
                        <h1 className="text-2xl font-bold mb-4">Monthly Overview</h1>
                        <div className="flex flex-row w-full">
                            <canvas id="myChart" ref={chartRef} width={600} height={300}></canvas>
                        </div>

                    </div>
                </div>
                <div className="flex flex-row gap-24 mt-14">
                    <IncomeCard income={userData?.income} />
                    <ExpenseCard expense={userData?.expenses} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
