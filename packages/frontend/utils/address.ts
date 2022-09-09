/**
 * Shorten an hex address to show 4 char on each sides: 0x00...0000
 * @param address Adress to be shorten
 * @returns Shorten address
 */
export const trimAddress = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
