import '@walletconnect/react-native-compat'
import { WagmiProvider } from 'wagmi'
import { mainnet, polygon, arbitrum } from '@wagmi/core/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from '@reown/appkit-wagmi-react-native'
import type { ReactNode } from 'react'

const projectId = '317c4f9b7494b5cb179562ac07526dce'

const metadata = {
  name: 'Playground',
  description: 'My RN Playground',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'com.adophilus.playground://',
    universal: 'playground.adophilus.tech',
  },
}

const chains = [mainnet, polygon, arbitrum] as const

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet,
  enableAnalytics: true,
})

export function WalletConnectProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
      <AppKit />
    </WagmiProvider>
  )
}
