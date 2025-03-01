export const validateDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
};

export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
    return validateDate(startDate) && 
           validateDate(endDate) && 
           startDate <= endDate;
};