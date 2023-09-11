export const shortAddress = (address?: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

//8 decimals by default on Aptos
export const toDisplayString = (number: number | string, digits = 2, decimalsCount = 8) => {
  const num = Number(number) / Math.pow(10, decimalsCount);
  return num.toLocaleString("en", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
};
