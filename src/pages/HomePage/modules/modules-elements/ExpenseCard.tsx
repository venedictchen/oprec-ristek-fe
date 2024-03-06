import React, { useEffect, useState } from 'react';
import { ExpenseCardProps } from '../interface';

const ExpenseCard: React.FC <ExpenseCardProps> = ({
    expense
}) => {
    const totalExpense = expense;
    const [animatedExpense, setAnimatedExpense] = useState<number>(0);

    const formatExpense = (balance:number) => {
        const formattedValue = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");    
    
        return formattedValue;
    };
    
    const formattedExpense = formatExpense(animatedExpense);

    useEffect(() => {
        const animationDuration = 800;
        const startTime = Date.now();

        const updateExpense = () => {
            const currentTime = Date.now();
            const progress = Math.min(1, (currentTime - startTime) / animationDuration);
            const newAnimatedExpense = Math.floor(progress * totalExpense);

            setAnimatedExpense(newAnimatedExpense);

            if (progress < 1) {
                requestAnimationFrame(updateExpense);
            }
        };

        updateExpense();
    }, [totalExpense]);
    return (
        <div className="flex bg-[#FFFFFF] w-max rounded-2xl shadow-lg">
            <div className="flex flex-col p-4 pr-24 pb-10 mb-4">
                <span className="text-[#A1A0BD] text-base font-semibold">Total Expense</span>
                <div className="flex items-center mt-2">
                    <span className="text-[#000000] text-3xl font-bold w-40 overflow-clip">
                        {formattedExpense}
                    </span>
                </div>
            </div>
        </div>
    )
};

export default ExpenseCard;