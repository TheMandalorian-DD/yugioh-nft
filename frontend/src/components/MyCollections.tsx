// MyCollections.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Collection from './Collection';

interface CollectionProps {
  wallet: any
}

interface CollectionItem {
  collectionId: number;
  name: string;
  collectionAddress: string;
  cardCount: number;
}

const MyCollections: React.FC<CollectionProps> = ({wallet}) => {
  const [collectionData, setCollectionData] = useState<CollectionItem[] | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    if (wallet?.details.account) {
      getCollections();
      setWalletAddress(wallet.details.account);
    }
  }, [wallet]);

  const getCollections = () => {
    // Ensure wallet and wallet.details.account are defined
    axios
      .get(`http://localhost:3000/get-all-collections`)
      .then((response) => {
        setCollectionData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <div>
      {collectionData === null ? (
        <div className="loading">Loading...</div>
      ) : (
        collectionData.map((collection) => (
          <Collection
            key={collection.collectionId}
            collectionId={collection.collectionId}
            collectionName={collection.name}
            wallet={wallet}
          />
        ))
      )}
    </div>
  );
};

export default MyCollections;
