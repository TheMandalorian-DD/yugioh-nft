import { ethers } from 'ethers'
import * as ethereum from './ethereum'
import { contracts } from '@/contracts.json'
import type { Market } from '$/Market'
export type { Market } from '$/Market'

export const correctChain = () => {
  return 1337
}

export const init = async (details: ethereum.Details) => {
  const { provider, signer } = details
  const network = await provider.getNetwork()
  if (correctChain() !== network.chainId) {
    console.error('Please switch to HardHat')
    return null
  }
  const { address, abi } = contracts.Market
  const contract = new ethers.Contract(address, abi, provider)
  const deployed = await contract.deployed()
  if (!deployed) return null
  const contract_ = signer ? contract.connect(signer) : contract
  return contract_ as any as Market
}

export const myShip = () => contracts.Market.address
