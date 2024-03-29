import { useAuth, useSidebarContext } from '@/components/contexts';
import React, { useEffect, useState } from 'react';
import { BalanceCardProps } from '../interface';

const BalanceCard: React.FC<BalanceCardProps> = ({
    totalBalance,
    lastTransactionType,
    lastTransactionAmount,
}) => {
    const [animatedBalance, setAnimatedBalance] = useState<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const { setOption } = useSidebarContext();

    const formatBalance = (balance: number) => {
        const formattedValue = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formattedValue;
    };

    const formattedBalance = formatBalance(animatedBalance);

    const handleSeeMore = () => {
        setOption("transactions");
    };

    useEffect(() => {
        const animationDuration = 800;
        const startTime = Date.now();

        const updateBalance = () => {
            const currentTime = Date.now();
            const progress = Math.min(1, (currentTime - startTime) / animationDuration);
            const newAnimatedBalance = Math.floor(progress * totalBalance);

            setAnimatedBalance(newAnimatedBalance);

            if (progress < 1) {
                requestAnimationFrame(updateBalance);
            }
        };

        updateBalance();
    }, [totalBalance]);

    return (
        <div
            className={`flex flex-col bg-[#FFFFFF] w-full md:w-full md:flex-row rounded-2xl shadow-lg card-container ${isHovered ? 'paused' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div className="flex flex-col w-full p-4 md:p-6 mt-2 md:mt-4 mb-2 md:mb-4 ">
                <span className="text-[#000000] text-lg md:text-xl font-bold">Total Balance</span>
                <div className="flex justify-start mt-1 md:mt-2">
                    <span className="text-lg md:text-xl font-bold mr-1" style={{ color: lastTransactionType === 'income' ? '#4FD18B' : '#E60000' }}>
                        {lastTransactionType === 'income' ? '+' : '-'}
                    </span>
                    <span className="text-lg md:text-xl w-24 md:w-40 overflow-clip" style={{ color: lastTransactionType === 'income' ? '#4FD18B' : '#E60000' }}>
                        {lastTransactionAmount}
                    </span>
                </div>
                <span className="text-[#A1A0BD] font-semibold mb-2 md:mb-4">Last Transaction</span>
                <div className="flex gap-2 items-center justify-start md:justify-start">
                    <button onClick={handleSeeMore} className="bg-[#4C49ED] px-4 py-1 md:px-6 md:py-2 font-semibold text-[#FFFFFF] rounded-2xl text-sm md:text-base">
                        See More
                    </button>
                </div>
            </div>
            <div className="flex items-center flex-col justify-center w-full md:w-1/2 bg-[#4C49ED]  text-center p-4 md:p-8" style={{ borderRadius: '20px 20px 20px 20px' }}>
                <span className="block text-xl md:text-3xl font-bold text-white w-36 md:w-48 overflow-clip">
                    {formattedBalance}
                </span>
                <span className="block text-[#A1A0BD] font-semibold text-xs md:text-base">Wallets Amount</span>
            </div>
        </div>
    );
};

export default BalanceCard;
