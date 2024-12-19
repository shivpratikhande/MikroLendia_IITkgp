'use client'

import { Navbar } from './navbar'
import { useWalletLogin } from '@/lib/hooks/useWalletLogin'

export function NavbarWrapper() {
  const { connectWallet, disconnectWalletHandler } = useWalletLogin();

  return <Navbar connectWallet={connectWallet} disconnectWalletHandler={disconnectWalletHandler} />;
}
