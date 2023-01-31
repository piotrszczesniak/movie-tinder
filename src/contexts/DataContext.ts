import { createContext } from 'react';

const DataContext = createContext({
  recommendations: [{ id: '', title: '', imageURL: '', summary: '', rating: 0 }],
  putData: (id: string) => {},
});

export default DataContext;
