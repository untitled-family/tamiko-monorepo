
export const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;
export const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME as string;

const BLOCK_OFFSET = 5000 // add 5 seconds to allow new block
export const TIMINGS = {
  TIME_TO_HATCH: 60000 + BLOCK_OFFSET,
  TIME_TO_BREED: 60000 + BLOCK_OFFSET,
  TIME_TO_DIE: 600000 + BLOCK_OFFSET,
  TIME_TO_GROW: 60000 + BLOCK_OFFSET,
  TIME_TO_EVOLVE: 60000 + BLOCK_OFFSET,
}
