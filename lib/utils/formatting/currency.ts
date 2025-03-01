export function formatCurrency(amount: number) {
    return `N$${amount.toLocaleString()}`;
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