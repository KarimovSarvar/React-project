import { useState, useEffect } from 'react';

type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function useLocalStorage<T>(key: string, initialValue: T): ReturnType<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.log(err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
