'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to base currency (NAD)
};

export const currencies: Currency[] = [
  { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.055 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.051 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 1.01 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.044 }
];

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertAmount: (amount: number) => number;
  formatAmount: (amount: number) => string;
  availableCurrencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(currencies[0]);

  useEffect(() => {
    // Load saved currency from localStorage on initial render
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const parsedCurrency = JSON.parse(savedCurrency);
      setCurrentCurrency(parsedCurrency);
    }
  }, []);

  const setCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem('selectedCurrency', JSON.stringify(currency));
  };

  const convertAmount = (amount: number): number => {
    // Convert from NAD to selected currency
    return parseFloat((amount * currentCurrency.rate).toFixed(2));
  };

  const formatAmount = (amount: number): string => {
    const convertedAmount = convertAmount(amount);
    return `${currentCurrency.symbol}${convertedAmount.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrency,
        convertAmount,
        formatAmount,
        availableCurrencies: currencies
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};