export const formatNumber = (num: number | string) =>
  Number(num)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const formatWithLeadingZeros = (
  number: number | string,
  length: number
) => {
  return number?.toString().padStart(length, "0");
};

export const formatNumberSinDecimales = (num: number | string) =>
  Number(num)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
