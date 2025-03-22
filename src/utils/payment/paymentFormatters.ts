
// Format credit card input (add spaces after every 4 digits)
export const formatCreditCardNumber = (input: string): string => {
  const digits = input.replace(/\D/g, '');
  const groups = [];
  
  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }
  
  return groups.join(' ');
};

// Format expiry date (MM/YY)
export const formatExpiryDate = (input: string): string => {
  const digits = input.replace(/\D/g, '');
  
  if (digits.length <= 2) {
    return digits;
  }
  
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
};
