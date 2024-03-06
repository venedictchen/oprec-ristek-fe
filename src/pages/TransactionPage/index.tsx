import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/contexts';
import axios from 'axios';
import { TransactionProps } from './modules/interface';
import ModalInput from './modules/modules-elements/ModalInput';
const TransactionPage: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<TransactionProps[]>([]);
  const [filteredData, setFilteredData] = useState<TransactionProps[]>([]);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [itemTypeFilter, setItemTypeFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;

  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const maxVisiblePages = 5;
  const getVisiblePages = (currentPage: number, totalPages: number, maxVisiblePages: number): number[] => {
    const half = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - half, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getCategoryString = (categoryNumber: number): string => {
    switch (categoryNumber) {
      case 1:
        return 'Food';
      case 2:
        return 'Transportation';
      case 3:
        return 'Living';
      case 4:
        return 'Communications';
      case 5:
        return 'Clothes';
      case 6:
        return 'Health';
      case 7:
        return 'Toiletry';
      case 8:
        return 'Gifts';
      case 9:
        return 'Entertainments';
      case 10:
        return 'Other';
      default:
        return 'Unknown';
    }
  };

  const handleCreateNewTransaction = () => {
    setShowModal(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsModalOpen(false);
    getData();
  };

  const getData = async () => {
    try {
      setIsFetchLoading(true);
      console.log('fetching data');
      const response = await axios.get(`http://127.0.0.1:8000/list_items/${user.user_id}/`, {
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
  useEffect(() => {
    filterAndSearchData();
    filterAndSearchDataType();
  }, [userData, categoryFilter, searchTerm, currentPage, itemTypeFilter]);

  const filterAndSearchData = () => {
    let filteredTransactions = userData;

    // Apply category filter if selected
    if (categoryFilter !== null) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.category === categoryFilter
      );
    }

    // Apply itemType filter if selected
    if (itemTypeFilter !== null) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.itemType === itemTypeFilter
      );
    }

    // Apply search filter if search term exists
    if (searchTerm !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredTransactions = filteredTransactions.filter(
        (transaction) =>
          transaction.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          transaction.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredData(filteredTransactions);
  };

  const filterAndSearchDataType = () => {
    let filteredTransactions = userData;

    // Apply itemType filter if selected
    if (itemTypeFilter !== null) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.itemType === itemTypeFilter
      );
    }

    // Apply category filter if selected
    if (categoryFilter !== null) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.category === categoryFilter
      );
    }

    // Apply search filter if search term exists
    if (searchTerm !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredTransactions = filteredTransactions.filter(
        (transaction) =>
          transaction.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          transaction.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredData(filteredTransactions);
  };

  const handleCategoryFilterChange = (category: number | null) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const handleTransactionTypeFilterChange = (type: string | null) => {
    setItemTypeFilter(type);
    setCurrentPage(1);
  };


  return (
    <div className="p-8 md:p-16 text-left mt-6 mx-auto container">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Transactions List</h1>

      <div className='flex flex-row '>
        <select
          className="p-2 sm:w-1/4 lg:w-1/6 border rounded-lg mr-2 focus:outline-none focus:ring focus:border-[#4C49ED] hover:border-[#4C49ED]"
          value={categoryFilter || ''}
          onChange={(e) => handleCategoryFilterChange(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">All Categories</option>
          <option value="1">Food</option>
          <option value="2">Transportation</option>
          <option value="3">Living</option>
          <option value="4">Communications</option>
          <option value="5">Clothes</option>
          <option value="6">Health</option>
          <option value="7">Toiletry</option>
          <option value="8">Gifts</option>
          <option value="9">Entertainments</option>
          <option value="10">Other</option>


        </select>
        <select
          className="p-2 sm:w-1/4 lg:w-1/6 border rounded-lg mr-2 focus:outline-none focus:ring focus:border-[#4C49ED] hover:border-[#4C49ED]"
          value={itemTypeFilter || ''}
          onChange={(e) => handleTransactionTypeFilterChange(e.target.value ? e.target.value : null)}
        >
          <option value="">All ItemType</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <input
        type="text"
        className="p-2 sm:w-1/2 lg:w-1/4 border rounded-lg mt-2"
        placeholder="Search by title or description"
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)}
      />

      <div className="max-w-full mt-4 overflow-x-auto">
        <div className="max-w-full">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">ItemType</th>
                <th className="py-2 px-4 border">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.toReversed().slice(indexOfFirstTransaction, indexOfLastTransaction).map((transaction) => (
                <tr key={transaction.id} className="transition-all hover:bg-gray-50">
                  <td className="py-2 px-4 border">{transaction.title}</td>
                  <td className="py-2 px-4 border">{transaction.description}</td>
                  <td className={`py-2 px-4 text-center border`}>
                    {transaction.amount}
                  </td>
                  <td className="py-2 px-4 border">{transaction.itemType}</td>
                  <td className="py-2 px-4 border">{getCategoryString(transaction.category)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center my-4">

        <div className="flex overflow-ellipsis mx-auto">
          {visiblePages.map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`mx-2 rounded-full p-2 px-4 ${currentPage === page ? 'bg-[#4C49ED] text-white' : 'bg-gray-300 hover:bg-[#4C49ED] hover:text-white'}`}
            >
              {page}
            </button>
          ))}
          {totalPages > maxVisiblePages && visiblePages[visiblePages.length - 1] !== totalPages && (
            <span className="mx-2">...</span>
          )}
        </div>

      </div>

      <div className='flex flex-col justify-center items-center my-4'>

        <div className="flex flex-row justify-center mt-8 mb-4">


          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`mx-2 p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-[#4C49ED] hover:text-white'}`}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`mx-2 p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-[#4C49ED] hover:text-white'}`}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </button>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-center items-center mt-2'>
          <button
            onClick={handleCreateNewTransaction}
            className="bg-[#4C49ED] hover:bg-[#A1A0BD] hover:text-[#4C49ED] m-2 text-white p-2 rounded "
          >
            Create New Transaction
          </button>
          {showModal && (
            <ModalInput isOpen={showModal} onClose={handleCloseModal} />
          )}
        </div>
      </div>




    </div>
  );
};

export default TransactionPage;
