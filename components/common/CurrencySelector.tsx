'use client';

import React from 'react';
import { useCurrency } from '@/lib/context/CurrencyContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CurrencySelector() {
  const { currentCurrency, setCurrency, availableCurrencies } = useCurrency();

  return (
    <div className="px-2 py-2 border-t">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-tight text-muted-foreground px-2">
          Currency
        </p>
        <Select
          value={currentCurrency.code}
          onValueChange={(value) => {
            const selected = availableCurrencies.find(curr => curr.code === value);
            if (selected) setCurrency(selected);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {availableCurrencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}