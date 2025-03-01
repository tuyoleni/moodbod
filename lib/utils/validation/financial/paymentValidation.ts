import { PaymentMethod } from '@/lib/types';

export const validatePaymentMethod = (method: PaymentMethod): boolean => {
    return Object.values(PaymentMethod).includes(method);
};

export const validateAmount = (amount: number): boolean => {
    return amount >= 0 && Number.isInteger(amount);
};