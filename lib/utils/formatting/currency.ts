import { useCurrency } from '@/lib/context/CurrencyContext';

// This is a client component function that uses the currency context
export function useFormattedCurrency() {
  const { formatAmount, convertAmount } = useCurrency();
  
  return {
    formatCurrency: (amount: number) => formatAmount(amount),
    convertCurrency: (amount: number) => convertAmount(amount)
  };
}

// This is a server-side compatible function that doesn't use the context
export function formatCurrency(amount: number, currencySymbol = 'N$') {
  return `${currencySymbol}${amount.toLocaleString()}`;
}

export function generateBudgetRanges(baseCost: number) {
  const roundToNearest = (num: number, nearest: number) => Math.ceil(num / nearest) * nearest;
  const baseAmount = roundToNearest(baseCost, 1000);

  return [
    { value: `${baseAmount}-${baseAmount * 1.5}`, label: formatCurrency(baseAmount) + ' - ' + formatCurrency(baseAmount * 1.5) },
    { value: `${baseAmount * 1.5}-${baseAmount * 2}`, label: formatCurrency(baseAmount * 1.5) + ' - ' + formatCurrency(baseAmount * 2) },
    { value: `${baseAmount * 2}+`, label: formatCurrency(baseAmount * 2) + '+' }
  ];
}