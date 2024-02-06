export function formatToInternational(numberToFormat: number) {
  const formattedNumber = new Intl.NumberFormat("en-US").format(numberToFormat);
  return formattedNumber;
}

export function toTitleCase(str: string) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}
