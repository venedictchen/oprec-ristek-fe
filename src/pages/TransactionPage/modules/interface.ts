export interface TransactionProps{
    id: number;
    title: string;
    description: string;
    amount:number;
    date: string;
    itemType: string;
    category:number;
    user: number;
}


export interface ModalInputProps{
    isOpen: boolean;
     onClose: () => void;
}