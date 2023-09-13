export const shortAddress = (address?: string, length = 4) => {
  if (!address) return "";
  return `${address.slice(0, 2 + length)}...${address.slice(-length)}`;
};

//8 decimals by default on Aptos
export const toDisplayString = (number: number | string, digits = 2, decimalsCount = 8) => {
  const num = Number(number) / Math.pow(10, decimalsCount);
  return num.toLocaleString("en", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
};

export const unknwonErrorToString = (error: any) => {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
};
