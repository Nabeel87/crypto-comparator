import React, { createContext, useReducer, useEffect } from 'react';
import { fetchTopCoins } from '../api/api';

const initialState = {
  coins: [],
  loading: true,
  error: null,
  currency: 'usd', // ✅ default currency
};

const CryptoContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, coins: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload, loading: true }; // loading true for new fetch
    default:
      return state;
  }
};

export const CryptoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ✅ fetch coins whenever currency changes
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTopCoins(state.currency); // 👈 pass currency
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };

    loadData();
  }, [state.currency]); // 👈 fetch when currency changes

  const setCurrency = (newCurrency) => {
    dispatch({ type: 'SET_CURRENCY', payload: newCurrency });
  };

  return (
    <CryptoContext.Provider value={{ ...state, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
