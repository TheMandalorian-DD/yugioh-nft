import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom';
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import Header from '@/components/Header'
import MyCollections from '@/components/MyCollections'
import Marketplace from '@/components/Marketplace'
import AllCollections from './components/AllCollections';

type Canceler = () => void
const useAffect = (
  asyncEffect: () => Promise<Canceler | void>,
  dependencies: any[] = []
) => {
  const cancelerRef = useRef<Canceler | void>()
  useEffect(() => {
    asyncEffect()
      .then(canceler => (cancelerRef.current = canceler))
      .catch(error => console.warn('Uncatched error', error))
    return () => {
      if (cancelerRef.current) {
        cancelerRef.current()
        cancelerRef.current = undefined
      }
    }
  }, dependencies)
}

const useWallet = () => {
  const [details, setDetails] = useState<ethereum.Details>()
  const [contract, setContract] = useState<main.Main>()
  useAffect(async () => {
    const details_ = await ethereum.connect('metamask')
    if (!details_) return
    setDetails(details_)
    const contract_ = await main.init(details_)
    if (!contract_) return
    setContract(contract_)
  }, [])
  return useMemo(() => {
    if (!details || !contract) return
    return { details, contract }
  }, [details, contract])
}

export const App = () => {
  const wallet = useWallet();

  return (
    <Router>
      <Header wallet={wallet} />
      <Routes>
        <Route path="/" element={<AllCollections />} />
        {/* <Route path="/" element={<div>All Cards Collection</div>} /> */}
        <Route path="/marketplace" element={<Marketplace wallet={wallet} />} />
        <Route path="/my-collections" element={<MyCollections wallet={wallet}/>} />
        <Route path="/boosters" element={<div>My Booster Packs</div>} />
      </Routes>
    </Router>
  );
}
