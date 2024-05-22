// src/hooks/useGlobalContext.ts
import { useContext } from "react";
import { GlobalContext } from '../context/globalContext';
import { IGlobalContextType } from '../interfaces/IGlobalContextType';

export const useGlobalContext = (): IGlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
