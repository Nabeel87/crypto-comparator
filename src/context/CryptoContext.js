import React, { createContext, useReducer, useEffect } from 'react';
import { fetchTopCoins } from '../api/api';

const initialState = {
  coins: [],
  loading: true,
  error: null,
};

const CryptoContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, coins: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const CryptoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTopCoins();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };

    loadData();
  }, []);

  return (
    <CryptoContext.Provider value={state}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;