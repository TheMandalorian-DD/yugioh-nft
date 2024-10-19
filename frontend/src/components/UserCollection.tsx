// UserCollection.tsx
import React, { useEffect, useState } from 'react'
import Card from './Card';
import '../css/UserCollection.css';
import axios from 'axios'

interface UserCollectionProps {
  collectionName: string;
  collectionAddress: string;
}

interface CardItem {
  collectionId: number;
  cardId: number;
  realID: string;
  name: string;
  img: string;
  rarity: string;
  redeem: boolean;
}

const UserCollection: React.FC<UserCollectionProps> = ({ collectionName, collectionAddress }) => {

  const [cardData, setCardData] = useState<CardItem[] | null>(null);

  useEffect(() => {
    getCards()
  }, []);

  const getCards = () => {
    axios
      .get(`http://localhost:3000/get-cards-by-address?address=${collectionAddress}`)
      .then((response) => {
        setCardData(response.data.ownedCards);
        console.log("cards : " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <div className="collection-container">
      <h2>{collectionName}</h2>
      <div className="card-grid">
        {cardData ? (
          cardData.length > 0 ? (
            cardData.map((card) => (
              <Card key={card.cardId} card={card} />
            ))
          ) : (
            <div className="no-cards">No cards available.</div> // Message si cardData est vide
          )
        ) : (
          <div className="loading">Loading cards...</div> // Message pendant le chargement
        )}
      </div>
    </div>
  );
};

export default UserCollection;