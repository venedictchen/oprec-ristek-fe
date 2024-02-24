export interface SidebarContextProps {
    selectedOption: string;
    setOption: (option: string) => void;
  }
  

export interface SideBarProviderProps{
    children: React.ReactNode;
}