import { useState } from 'react';

const usePutData = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const putData = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
      });
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error);
    }
  };

  return { data, error, putData };
};

export { usePutData };
