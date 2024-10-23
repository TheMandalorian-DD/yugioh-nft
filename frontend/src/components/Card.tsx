// Card.tsx
import React from 'react';
import '../css/Card.css';

interface CardProps {
  card: {
    collectionId: number;
    cardId: number;
    realID: string;
    name: string;
    img: string;
    rarity: string;
    onSell: boolean;
    owner: string;
  };
  onClickSell: any;
  onClickBuy: any;
  user: string;
}

const Card: React.FC<CardProps> = ({ card, onClickSell, onClickBuy, user}) => {
  return (
    <div className="card">
      <img src={card.img} alt={card.name} className="card-image" />
      <div className="card-details">
        <h3>{card.name}</h3>
        <p>Rarity: <span className={`rarity ${card.rarity.toLowerCase()}`}>{card.rarity}</span></p>
        {card.onSell ? (
          <button className="redeem-button disabled">Already on sale</button>
        ) : (
          <button onClick={onClickSell} className="redeem-button">Sell</button>
        )}
        {card.owner != user ? (
          <button onClick={onClickBuy} className="redeem-button">Buy</button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Card;
