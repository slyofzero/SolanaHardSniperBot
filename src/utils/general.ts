export function formatToInternational(numberToFormat: number) {
  const formattedNumber = new Intl.NumberFormat("en-US").format(numberToFormat);
  return formattedNumber;
}
