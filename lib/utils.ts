import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateBudgetRanges(baseCost: number) {
    const roundToNearest = (num: number, nearest: number) => Math.ceil(num / nearest) * nearest;
    const baseAmount = roundToNearest(baseCost, 1000);

    return [
        { value: `${baseAmount}-${baseAmount * 1.5}`, label: `N$${baseAmount.toLocaleString()} - N$${(baseAmount * 1.5).toLocaleString()}` },
        { value: `${baseAmount * 1.5}-${baseAmount * 2}`, label: `N$${(baseAmount * 1.5).toLocaleString()} - N$${(baseAmount * 2).toLocaleString()}` },
        { value: `${baseAmount * 2}+`, label: `N$${(baseAmount * 2).toLocaleString()}+` }
    ];
}

export function formatCurrency(amount: number) {
    return `N$${amount.toLocaleString()}`;
} 