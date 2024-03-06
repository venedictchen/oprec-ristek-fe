import React, { useRef } from "react";
import { ModalInputProps } from "../interface";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useAuth } from "@/components/contexts";
const ModalInput: React.FC<ModalInputProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const itemTypeRef = useRef<HTMLSelectElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);

    const categories = [
        'Food',
        'Transportation',
        'Living',
        'Communications',
        'Clothes',
        'Health',
        'Toiletry',
        'Gifts',
        'Entertainments',
        'Other'
    ];


    const handleCancel = () => {
        onClose();
    };
    const handleSubmit = async () => {
        const titleValue = titleRef.current?.value || "";
        const descriptionValue = descriptionRef.current?.value || "";
        const amountValue = amountRef.current?.value || "";
        const itemTypeValue = itemTypeRef.current?.value || "";
        const categoryValue = categoryRef.current?.value || 0;

        const formData = {
            title: titleValue,
            description: descriptionValue,
            amount: amountValue,
            itemType: itemTypeValue,
            category: categoryValue,
            user: user.user_id
        };

        try {
            console.log(formData);
            const response = await axios.post(`http://127.0.0.1:8000/add-item/`, formData, {
                withCredentials: true,
            });

            console.log("Response from server:", response.data);

            onClose();
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    return (
        isOpen && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg md:text-2xl font-semibold my-4">Create New Transaction</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <MdOutlineCancel size={24} />
        </button>

        <label className="block mb-2">Title:</label>
        <input
          type="text"
          ref={titleRef}
          className="w-full md:w-full border border-gray-300 p-2 rounded mb-4"
        />

                <label className="block mb-2">Description:</label>
                <input
                    type="text"
                    ref={descriptionRef}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                />

                <label className="block mb-2">Amount:</label>
                <input
                    type="number"
                    ref={amountRef}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                />


                <label className="block mb-2">Item Type:</label>
                <select ref={itemTypeRef} className="w-full border border-gray-300 p-2 rounded mb-4">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="deposit">Deposit</option>
                </select>

                <label className="block mb-2">Category:</label>
                <select ref={categoryRef} className="w-full border border-gray-300 p-2 rounded mb-4">
                    {categories.map((category, index) => (
                        <option key={index} value={index + 1}>{category}</option>
                    ))}
                </select>

                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <button
            onClick={handleCancel}
            className="w-full md:w-auto bg-gray-500 text-white py-2 px-4 rounded mb-2 md:mb-0 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto bg-[#4C49ED] text-white py-2 px-4 rounded hover:bg-[#4C49ED]"
          >
            Submit
          </button>
        </div>
      </div>
        )
    );
};

export default ModalInput;
