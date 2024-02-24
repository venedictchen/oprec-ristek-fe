import React, { useEffect, useState } from 'react';

const IncomeCard: React.FC = () => {
    const totalIncome = 200000;
    const [animatedIncome, setAnimatedIncome] = useState<number>(0);

    const formatIncome = (balance:number) => {
        const formattedValue = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");    
    
        return formattedValue;
    };
    
    const formattedIncome = formatIncome(animatedIncome);

    useEffect(() => {
        const animationDuration = 2000;
        const startTime = Date.now();

        const updateIncome = () => {
            const currentTime = Date.now();
            const progress = Math.min(1, (currentTime - startTime) / animationDuration);
            const newAnimatedIncome = Math.floor(progress * totalIncome);

            setAnimatedIncome(newAnimatedIncome);

            if (progress < 1) {
                requestAnimationFrame(updateIncome);
            }
        };

        updateIncome();
    }, [totalIncome]);
    return (
        <div className="flex bg-[#FFFFFF] w-max rounded-2xl shadow-lg">
            <div className="flex flex-col p-4 pr-24 pb-10 mb-4">
                <span className="text-[#A1A0BD] text-base font-semibold">Total Income</span>
                <div className="flex items-center mt-2">
                    <span className="text-[#000000] text-3xl font-bold w-40 overflow-clip">
                        {formattedIncome}
                    </span>
                </div>
            </div>
           
        </div>
    )
};

export default IncomeCard;