// src/context/GlobalContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface GlobalContextType {
  user: { username: string; id: string };
  setUser: React.Dispatch<React.SetStateAction<{ username: string; id: string }>>;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  btcWallet: string;
  setBtcWallet: (wallet: string) => void;
}

interface GlobalProviderProps {
    children: React.ReactNode;
  }


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children } : any) => {
  const [user, setUser] = useState({username: '', id: ''});
  const [walletAddress, setWalletAddress] = useState('');
  const [btcWallet, setBtcWallet] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        walletAddress,
        setWalletAddress,
        btcWallet,
        setBtcWallet,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};