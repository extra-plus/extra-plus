export const formatCurrency = (amount: number, currency: string = 'THB') => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount / 100);
};
