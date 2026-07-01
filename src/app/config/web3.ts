import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { optimism } from '@reown/appkit/networks';

export const projectId = 'bfd72940b679060519658cd93a321a9c';

export const networks = [optimism] as const;

export const wagmiAdapter = new WagmiAdapter({
  networks: [optimism],
  projectId,
  ssr: false,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

createAppKit({
  adapters: [wagmiAdapter],
  networks: [optimism],
  projectId,
  metadata: {
    name: 'ALANA Calculator',
    description: 'Submit recurring quests for ALANA token rewards.',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://alana.local',
    icons: [],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: 'light',
});

export const NFT_CONTRACTS = {
  guardian: '0x1093a86C1dcB9F8346ce7657C766802326598D8d',
  specialist: '0xa6eeABe3f6999C08fEf8f0d44D7AaaB2D28042CD',
  apprentice: '0x89216a198344d198eA26325C400F8417b6dc9D8C',
} as const;

// Unlock Protocol PublicLock — getHasValidKey returns true only for non-expired keys.
export const unlockKeyAbi = [
  {
    inputs: [{ name: '_user', type: 'address' }],
    name: 'getHasValidKey',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
