import { createContext, useContext, useState, ReactNode } from 'react';

interface NSFWContextType {
  isNSFW: boolean;
  toggleNSFW: () => void;
}

const NSFWContext = createContext<NSFWContextType | undefined>(undefined);

export function NSFWProvider({ children }: { children: ReactNode }) {
  const [isNSFW, setIsNSFW] = useState(false);

  const toggleNSFW = () => {
    setIsNSFW(prev => !prev);
  };

  return (
    <NSFWContext.Provider value={{ isNSFW, toggleNSFW }}>
      {children}
    </NSFWContext.Provider>
  );
}

export function useNSFW() {
  const context = useContext(NSFWContext);
  if (context === undefined) {
    throw new Error('useNSFW must be used within a NSFWProvider');
  }
  return context;
}
