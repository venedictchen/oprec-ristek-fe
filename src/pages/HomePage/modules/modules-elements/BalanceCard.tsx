import React from 'react';

const BalanceCard: React.FC = () => {
    const totalBalance = 2855;

    return (
        <div className="bg-[#FFFFFF] p-5 md:p-10 rounded-3xl shadow-lg text-center">
            <h1 className="font-bold text-lg md:text-xl">Total Balance</h1>
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 mt-3 md:mt-5"> 
                <button className="bg-[#4C49ED] px-3 py-2 md:px-4 md:py-4 text-[#FFFFFF] rounded-3xl font-medium" style={{ width: '100%', maxWidth: '150px' }}>Top Up</button>
                <button className="bg-white px-3 py-2 md:px-4 md:py-4 border border-[#4C49ED] text-[#4C49ED] rounded-3xl font-medium mt-2 md:mt-0" style={{ width: '100%', maxWidth: '150px' }}>Withdraw</button>
            </div>
            <h1 className="text-2xl md:text-3xl mt-3 md:mt-5">{totalBalance}</h1>
        </div>
    );
};

export default BalanceCard;
