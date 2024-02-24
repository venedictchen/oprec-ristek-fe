import { createContext, useContext, useState } from 'react';
import { SideBarProviderProps } from './interface';

interface SidebarContextProps {
  selectedOption: string;
  setOption: (option: string) => void;
}

const SidebarContext = createContext({
    selectedOption: '',
    setOption: (option: string) => { },
} as SidebarContextProps);

export const SidebarProvider: React.FC<SideBarProviderProps> = ({ children }) => {
  const [selectedOption, setOption] = useState('dashboard');
  return (
    <SidebarContext.Provider value={{ selectedOption, setOption }}>
      {children}
    </SidebarContext.Provider>
  );
};


export const useSidebarContext = () => useContext(SidebarContext);

