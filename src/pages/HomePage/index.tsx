import React from 'react';
import BalanceCard from './modules/modules-elements/BalanceCard';
import IncomeCard from './modules/modules-elements/IncomeCard';
import SavesCard from './modules/modules-elements/SavesCard';
import ExpenseCard from './modules/modules-elements/ExpenseCard';
const HomePage: React.FC = () => {
    return (
        <div className="flex w-full py-12 justify-center">
           <div className="flex flex-col">
                <div className="flex flex-row gap-10 mb-24">
                <BalanceCard/>
                <BalanceCard/>

                </div>
                <div className="flex flex-row gap-24">
                <IncomeCard/>
                <SavesCard/>
                <ExpenseCard/>
                
                
                </div>
            </div>
        </div>
    );
};

export default HomePage;
