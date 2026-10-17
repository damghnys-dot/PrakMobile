import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PaketRental } from '../types/rental';

export interface RentalContextType {
  selectedPaket: PaketRental | null;
  setSelectedPaket: (paket: PaketRental | null) => void;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export interface RentalProviderProps {
  children: ReactNode;
}

export const RentalProvider: React.FC<RentalProviderProps> = ({ children }) => {
  const [selectedPaket, setSelectedPaket] = useState<PaketRental | null>(null);

  return (
    <RentalContext.Provider value={{ selectedPaket, setSelectedPaket }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = (): RentalContextType => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};

export default RentalContext;
