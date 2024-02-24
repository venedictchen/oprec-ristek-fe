import React from 'react';
import BalanceCard from './modules/modules-elements/BalanceCard';
const HomePage: React.FC = () => {
    return (
        <div className="flex w-full py-12 justify-center">
           <div className="grid grid-cols-2 gap-10 overflow-hidden">
            <div className="col-span-1">
                <BalanceCard/>
            </div>
            <div className="col-span-1">
                {/* <BalanceCard/> */}
                
            </div>
            </div>
        </div>
    );
};

export default HomePage;
