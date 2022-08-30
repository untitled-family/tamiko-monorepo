const chains: { [name: string]: number } = {
  development: 31337,
  preview: 5,
  production: 1
}

export const NETWORK_ID = chains[process.env.NODE_ENV as string];
export const NETWORK_NAME = 'localhost' as string;
