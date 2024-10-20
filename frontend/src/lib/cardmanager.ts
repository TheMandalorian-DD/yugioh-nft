import { ethers } from 'ethers'
import * as ethereum from './ethereum'
import { contracts } from '@/contracts.json'
import type { CardManager } from '$/CardManager'
export type { CardManager } from '$/CardManager'

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
  const { address, abi } = contracts.CardManager
  const contract = new ethers.Contract(address, abi, provider)
  const deployed = await contract.deployed()
  if (!deployed) return null
  const contract_ = signer ? contract.connect(signer) : contract
  return contract_ as any as CardManager
}

export const myShip = () => contracts.CardManager.address
