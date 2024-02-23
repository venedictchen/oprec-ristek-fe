import React from 'react';
import BalanceCard from './modules/modules-elements/BalanceCard';
const HomePage: React.FC = () => {
    return (
        <div className="flex bg-red-400 w-full py-12 px-20">
           <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
                <BalanceCard/>
            </div>
            <div className="col-span-1">
                {/* Content for the second column */}
            </div>
            </div>
        </div>
    );
};

export default HomePage;
