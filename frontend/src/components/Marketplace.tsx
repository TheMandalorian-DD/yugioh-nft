import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/Card'
import '../css/UserCollection.css';

interface MarketplaceProps {
  wallet: any;
}

interface CardItem {
  id: number;
  seller: string;
  collectionId: number;
  tokenId: number;
  price: number;
  cardId: number;
  realId: string;
  name: string;
  img: string;
  rarity: string;
  onSell: boolean;
}

const Marketplace: React.FC<MarketplaceProps> = ({  wallet }) => {

  const [cardData, setCardData] = useState<CardItem[] | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    if (wallet?.details.account) {
      getCards();
      setWalletAddress(wallet.details.account);
    }
  }, [wallet]);

  const getCards = () => {
    axios
      .get(`http://localhost:3000/get-marketplace}`)
      .then((response) => {
        setCardData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <div className="collection-container">
      <h2>Marketplace</h2>
      <div className="card-grid">
        {cardData ? (
          cardData.length > 0 ? (
            cardData.map((list) => (
              <Card key={list.cardId} card={ {
                collectionId: list.collectionId,
                cardId: list.cardId,
                realID: list.realId,
                name: list.name,
                img: list.img,
                rarity: list.rarity,
                onSell: list.onSell
              }} onClickSell={() => {}} />
            ))
          ) : (
            <div className="no-cards">No cards available.</div>
          )
        ) : (
          <div className="loading">Loading cards...</div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;