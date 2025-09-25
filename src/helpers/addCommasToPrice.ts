export default function addCommasToString(input: string): string {
  const reversed: string = input.split("").reverse().join("");
  const formatted: string = reversed.match(/.{1,3}/g)?.join(",") || "";
  return formatted.split("").reverse().join("");
}
