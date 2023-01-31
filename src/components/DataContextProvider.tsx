import React from 'react';
import DataContext from '../contexts/DataContext';
import recommendations from '../data/recommendations.json';
import { usePutData } from '../hooks/usePutData';

type DataContextProviderProps = {
  children: React.ReactNode;
};

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const { putData } = usePutData();

  const dataValue = { recommendations, putData };

  return <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>;
};

export { DataContextProvider };
