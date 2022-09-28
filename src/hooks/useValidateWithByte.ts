export default function validateWithByte(str: string) {
  let byte = 0;
  for (let i = 0; i < str.length; ++i) {
    str.charCodeAt(i) > 127 ? (byte += 2) : byte++;
  }
  return byte >= 2 && byte <= 10;
}
